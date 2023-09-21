'use client'

import { Separator } from "./ui/separator"
import Image from 'next/image'
import x from "app/images/chapter_icon.png"
import { useState } from "react";

interface ProjectProps {
    name: string;
    description: string;
    chapter_number: number;
    task_number: number;
    // Add more props as needed
  }

export default function Project({ name, description, chapter_number, task_number }: ProjectProps) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    return (
                <div className={`w-72 h-64 rounded-lg bg-[#D8DDE8] p-3 mt-5 mb-5  ${isHovered ? 'shadow-lg' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                        <h1 className="min-h-10 text-2xl mb-4">{name}</h1>
                        <div className="justify-center items-center flex" >
                            <div className="bg-[#E9E9E9] p-3 rounded-lg shadow-lg  w-full">
                                <div className="text-xs flex">
                                    <div className="flex-1 my-auto">{chapter_number} Chapters</div>
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
