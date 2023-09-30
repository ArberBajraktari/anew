'use client'

import { Separator } from "./ui/separator"
import Image from 'next/image'
import x from "app/images/chapter_icon.png"
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "react-query";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
const supabase = createClientComponentClient();

interface TaskProps {
    created_at?: Date;
    name: string;
    description: string;
    task_number: number;
    task_id: number;
    project_id: number;
    chapter_id: number;
    chapter_name: string;
    status: boolean;
    follow_up: string;
    priority: number;
    late: boolean;
    days_late: number;
  }



function calculateDays(deadline: string){
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const jsDate1: any = new Date(formattedDate);
    const jsDate2: any = new Date(deadline);

    // Calculate the time difference in milliseconds
    const timeDifference = jsDate2 - jsDate1;

    // Calculate the number of days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}

export default function Task({ name, description, task_number, project_id, priority, status, task_id, chapter_id, late, days_late, follow_up, chapter_name}: TaskProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredFollowUp, setIsHoveredFollowUp] = useState(false);
    const [followUp, setFollowUp] = useState('');


    const {
        isLoading: isLoadingFollowUpTask,
        error: errorFollowUpTask,
        data: followUpTask,
      } = useQuery(["follow_up_task", follow_up], () => getFollowUp(follow_up));

    async function getFollowUp(task_id: any) {
        if(task_id === "0"){
            return [];
        }
        const { data: tasks, error } = await supabase
        .from('tasks')
        .select("*")
        .eq('id', task_id)
        

        if (error) {
            console.error('Error fetching projects:', error.message);
        }

        if (followUpTask && followUpTask[0] !== undefined) {
            const followDays = calculateDays(followUpTask[0].deadline);
            
            // Create a new array of tasks with the followDays property included
            const tasksWithFollowDays: any = followUpTask.map((task: any) => ({
              ...task,
              followDays: followDays.toString(), // Add followDays property
            }));
          
            return tasksWithFollowDays;
          }
          
          return tasks;
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleMouseEnterFollowUp = () => {
        setIsHoveredFollowUp(true);
    };

    const handleMouseLeaveFollowUp = () => {
        setIsHoveredFollowUp(false);
    };

    if(isLoadingFollowUpTask){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if(late === true){
        return (
            <Link href={`/tasks/${task_id}`} >
                <div className="flex flex-col items-center">
                    <div className="w-full h-5 text-red-400 text-right text-sm mt-1">
                        {days_late === 1 ? `${days_late} day late` : `${days_late} days late`}
                    </div>
                    <div className={`w-full h-10 rounded-lg mb-2 pl-1 my-auto mx-auto bg-red-50 ${isHovered ? "border-red-400 border" : "border-red-100 border"} items-center`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <div className="grid grid-cols-12 gap-2 my-auto mx-auto h-full">
                            <div className="col-span-1 flex justify-end items-center">
                                <div className="text-right">Task-{task_id}:</div>
                            </div>
                            <div className="col-span-8 text-left flex items-center">{name}</div>
                            <div className="col-span-1 flex items-center"></div>
                            <div className="col-span-2 flex items-center"><Badge variant={"outline"} className="border-sky-300 bg-sky-300 text-white">{chapter_name}</Badge></div>
                        </div>
                    </div>
                </div>
    
            </Link>
    
        )
    }else{
        if(status === true){
            return (
                <Link href={`/tasks/${task_id}`} >
                    <div className="flex justify-center items-center mt-4">
                        <div className={`w-full h-10 rounded-lg mb-2 pl-1 my-auto mx-auto  bg-green-100 ${isHovered ? "border-green-400 border" : "border-green-200 border"} items-center`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>
                            <div className="grid grid-cols-12 gap-2 my-auto mx-auto h-full">
                                <div className="col-span-1 flex justify-end items-center">
                                    <div className="text-right">Task-{task_id}:</div>
                                </div>
                                <div className="col-span-8 text-left flex items-center">{name}</div>
                                <div className="col-span-1 flex items-center"></div>
                                <div className="col-span-2 flex items-center"><Badge variant={"outline"} className="border-sky-300 bg-sky-300 text-white">{chapter_name}</Badge></div>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        }else{
            if(follow_up !== "0"){
                return(
                    <div className="flex-col items-center">
                        <div className="w-full h-5 text-sky-400 text-right text-sm mt-1">
                        {followUpTask.map((task: any) => (
                            task.followDays ? `in ${task.followDays} days` : `loading...`
                        ))} 
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="grid grid-cols-12 gap-4 my-auto mx-auto h-full w-full">
                                <div className="col-span-8 flex items-center">
                                    <Link href={`/tasks/${task_id}`} className="w-full" >
                                        <div className="flex justify-between items-center">
                                            <div className={`w-full h-10 rounded-lg mb-2 pl-1 my-auto mx-auto  bg-green-100 ${isHovered ? "border-green-400 border" : "border-green-200 border"} items-center`}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}>
                                                <div className="grid grid-cols-8 gap-2 my-auto mx-auto h-full">
                                                    <div className="col-span-1 flex justify-end items-center">
                                                        <div className="text-right">Task-{task_id}:</div>
                                                    </div>
                                                    <div className="col-span-5 text-left flex items-center">{name}</div>
                                                    <div className="col-span-2 flex items-center"><Badge variant={"outline"} className="border-sky-300 bg-sky-300 text-white">{chapter_name}</Badge></div>
                                                </div>
                                            </div>
                                        </div>
                                </Link>
                                </div>
                                <div className="col-span-1 flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-sky-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                                    </svg>
                                </svg>
                                </div>

                                <div className="col-span-3 flex items-center">
                                    <Link href={`/tasks/${follow_up}`} className="w-full ">
                                        <div className={`w-full h-10 rounded-lg mb-2 pl-1 my-auto mx-auto  bg-sky-100 ${isHoveredFollowUp ? "border-sky-400 border" : "border-sky-200 border"} flex items-center`}
                                            onMouseEnter={handleMouseEnterFollowUp}
                                            onMouseLeave={handleMouseLeaveFollowUp}>
                                            Task-{follow_up}
                                            {followUpTask.map((task: any) => (
                                                task.name ? `: ${task.name}` : `loading...`
                                            ))} 
                                        </div>
                                    </Link>
                                </div>
                                       
                            </div>
                        </div>
                    </div>
                )
            }
            return (
                <Link href={`/tasks/${task_id}`} >
                    <div className="flex justify-center items-center mt-4">
                        <div className={`w-full h-10 rounded-lg mb-2 pl-1 my-auto mx-auto  bg-sky-100 ${isHovered ? "border-sky-400 border" : "border-sky-200 border"} items-center`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>
                            <div className="grid grid-cols-12 gap-2 my-auto mx-auto h-full">
                                <div className="col-span-1 flex justify-end items-center">
                                    <div className="text-right">Task-{task_id}:</div>
                                </div>
                                <div className="col-span-8 text-left flex items-center">{name}</div>
                                <div className="col-span-1 flex items-center"></div>
                                <div className="col-span-2 flex items-center">
                                    <Badge variant={"outline"} className="border-sky-300 bg-sky-300 text-white">{chapter_name}</Badge></div>
                            </div>
                        </div>
                    
                    </div>
                </Link>
            )
        }
    }
    
}


