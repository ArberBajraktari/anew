'use client'

import { Separator } from "./ui/separator"
import Image from 'next/image'
import x from "app/images/chapter_icon.png"
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"


export default function ProjectSkeleton() {

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
                        <Skeleton className="w-1/2 h-10 rounded-lg mb-4" />
                        <div className="justify-center items-center flex" >
                            <Skeleton className="w-full h-[50px] rounded-lg" />
                        </div>
                        <div className="mt-10 text-xs">
                            <Skeleton className="w-full h-[16px] rounded-lg mb-1" />
                            <Skeleton className="w-1/2 h-[16px] rounded-lg" />
                        </div>
                        <Separator className="border-t-2 border-[#E9E9E9] my-4"/>
                        <div className="text-xs flex">
                            <div className="flex-1">
                                <Skeleton className="w-1/2 h-[16px] rounded-lg mb-1" />
                            </div>
                            <div className="flex-1 float-right">
                                <Skeleton className="w-1/2 h-[16px] rounded-lg mb-1 float-right" />
                            </div>
                        </div>
                    </div>
    )
}
