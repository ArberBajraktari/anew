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
        const { data, error } = await supabase.from('tasks').select("*").eq('user_id', user.id).eq('deadline', formattedDate);

        if (error) {
            console.error('Error fetching projects:', error.message);
        }
        return data || [];
    }else{
        return [];
    }
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
                
                {dataProjects.map((project) => (
                    <Task key={project.id} name={project.name} description={project.description} task_number={project.task_number} project_id={project.project_id} task_id={project.id} status={project.status} follow_up={""} priority={project.priority} chapter_id={0}/>
                 
              ))}
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
