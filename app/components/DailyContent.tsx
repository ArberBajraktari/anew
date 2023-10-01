'use client'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { redirect } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import Project from "@/components/project"
import ReactQueryProvider from "../providers/reactQuery"
import ProjectSkeleton from "@/components/project_add_button"
import Task from "@/components/Task"
const supabase = createClientComponentClient();
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10);


async function getTasks() {
    
    console.log(formattedDate)
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if(user){
        const { data, error } = await supabase
        .from('tasks')
        .select('*, chapters(chapter_name)')
        .eq('user_id', user.id)
        .eq('deadline', formattedDate)

        if (error) {
            console.error('Error fetching tasks:', error.message);
        }
        if(data){
            const tasksToday = data.filter((task) => task.status === false && task.follow_up == null);
            const tasksFollowedUp = data.filter((task) => task.status === false && task.follow_up !== null);
            const tasksDone = data.filter((task) => task.status === true);
            const reorderedTasks = [...tasksToday, ...tasksFollowedUp, ...tasksDone];

            const { data: late_data, error: late_error } = await supabase.from('tasks').select("*, chapters(chapter_name)").eq('user_id', user.id).lt('deadline', formattedDate).eq('status', false).is('follow_up', null).order('deadline');
            
            if (late_error) {
                console.error('Error fetching late tasks:', late_error.message);
            }

            const combinedData = (late_data || []).concat(reorderedTasks || []);

            const modifiedData = combinedData.map((item) => {
                const late = item.deadline < formattedDate ? true : false;
                return { ...item, late };
            });     
            console.log(modifiedData)

            return modifiedData || [];
        }
        


        
    }else{
        return [];
    }
}

function calculateDaysDifference(today: any, before: any) {
    // Convert the date strings to JavaScript Date objects
    const jsDate1: any = new Date(today);
    const jsDate2: any = new Date(before);

    // Calculate the time difference in milliseconds
    const timeDifference = jsDate1 - jsDate2;

    // Calculate the number of days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}

export default function DailyContent() {
    const {
        isLoading: isLoadingProjects,
        error: errorProjects,
        data: dataProjects
      } = useQuery("tasks", getTasks);

      if(isLoadingProjects){
        return (
            <div>
                <div className='grid grid-cols-3 gap-6 p-5 space-y-6'>
                    <ProjectSkeleton />
                    <ProjectSkeleton />
                    <ProjectSkeleton />
                    <ProjectSkeleton />
                    <ProjectSkeleton />
                    <ProjectSkeleton />
                </div>
            </div>
        )
      }
      if (errorProjects) {
        console.error('Error fetching projects:', errorProjects);
        return (
            <div>
                There was an error fetching projects!
                Please try again later.
            </div>
        )
      }
      
      if (dataProjects && dataProjects.length > 0) {
        return (
            <div className="m-10">
                <div className="flex justify-center items-center">
                    <div className="w-3/4">
                        <h1 className="min-h-10 text-2xl mt-4 mb-4 text-[#6DA9E4]">Today: {formattedDate}</h1>
                    </div>
                </div>
                
                {dataProjects.map((project) => {
                    return (
                        <Task
                            key={project.id}
                            name={project.name}
                            description={project.description}
                            task_number={project.task_number}
                            project_id={project.project_id}
                            task_id={project.id}
                            status={project.status}
                            follow_up={project.follow_up === null ? "0" : project.follow_up}
                            priority={project.priority}
                            chapter_id={0}
                            chapter_name={project.chapters?.chapter_name}
                            late={project.late}
                            days_late={calculateDaysDifference(formattedDate, project.deadline)}
                        />
                        );
                    })}
            </div>          
        );
      }
    
      return (
        <div className="m-10">
            <div className="flex justify-center items-center">
                <div className="w-3/4">
                    <h1 className="min-h-10 text-2xl mt-4 mb-4 text-[#6DA9E4]">Today: {formattedDate}</h1>
                </div>
            </div>
                No tasks
        </div>          
    );

}
