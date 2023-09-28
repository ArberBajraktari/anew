'use client'

import { Separator } from "./ui/separator"
import Image from 'next/image'
import x from "app/images/chapter_icon.png"
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "react-query";
import Link from "next/link";
const supabase = createClientComponentClient();

interface TaskProps {
    created_at?: Date;
    name: string;
    description: string;
    task_number: number;
    task_id: number;
    project_id: number;
    chapter_id: number;
    status: boolean;
    follow_up?: string;
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

export default function Task({ name, description, task_number, project_id, priority, status, task_id, chapter_id}: TaskProps) {

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
            <div className="flex justify-center items-center">
                <Link href={`/tasks/${task_id}`}>
                    <div className={`w-3/4 h-10 rounded-lg p-3 mt-1 mb-2 bg-white ${isHovered ? "border-sky-400 border" : ""} items-center`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                        <div className="grid grid-cols-8 gap-4 my-auto mx-auto">
                        <div className="col-span-1">Task-{task_id}:</div>
                        <div className="col-span-5 text-left">{name}</div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1">01</div>
                        </div>
                    </div>
                </Link>
            </div>

        )
    }

    return (
        <div>
            
        </div>
    )
}
