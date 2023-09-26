'use client'

import { Separator } from "./ui/separator"
import Image from 'next/image'
import x from "app/images/chapter_icon.png"
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "react-query";
const supabase = createClientComponentClient();

interface TaskProps {
    created_at: Date;
    name: string;
    description: string;
    task_number: number;
    chapter_id: number;
    project_id: number;
    status: boolean;
    follow_up: string;
    priority: number;
  }

async function getTasks(chapter_id: number) {

    const { data: tasks, error } = await supabase
        .from('tasks')
        .select("*")
        .eq('chapter_id', chapter_id)

    if (error) {
        console.error('Error fetching projects:', error.message);
    }
    return tasks || [];
}

export default function Task({ name, description, task_number, project_id}: TaskProps) {

    const {
        isLoading: isLoadingChapters,
        error: errorChapters,
        data: dataChapters
      } = useQuery("chapters_" + name, () => getTasks(project_id));

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    if(isLoadingChapters){
        return (
            <div>
                
            </div>
        )
    }

    if (dataChapters ) {
        return (
            <div className={`w-72 h-64 rounded-lg bg-[#D8DDE8] p-3 mt-5 mb-5  ${isHovered ? 'shadow-lg' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                    <h1 className="min-h-10 text-2xl mb-4">{name}</h1>
                    <div className="justify-center items-center flex" >
                        <div className="bg-[#E9E9E9] p-3 rounded-lg shadow-lg  w-full">
                            <div className="text-xs flex">
                                <div className="flex-1 my-auto">{dataChapters.length} Chapters</div>
                                <div className="flex-1 text-right">
                                    <Image
                                        src={x}
                                        alt="Picture of the author"
                                        width={40}
                                        height={40}
                                        className="float-right"
                                        // blurDataURL="data:..." automatically provided
                                        // placeholder="blur" // Optional blur-up while loading
                                        />
                                </div>
                            </div>                  
                            
                        </div>
                    </div>
                    <div className="mt-10 text-xs min-h-[32px]">
                        {description}
                    </div>
                    <Separator className="border-t-2 border-[#838383] my-4"/>
                    <div className="text-xs flex">
                        <div className="flex-1">{task_number} Tasks</div>
                        <div className="flex-1 text-right">Right Div</div>
                    </div>
                </div>
        )
    }

    return (
        <div>
            
        </div>
    )
}
