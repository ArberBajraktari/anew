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
const supabase = createClientComponentClient();



async function getTasks() {
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if(user){
        const { data, error } = await supabase.from('tasks').select("*").eq('user_id', user.id);

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
            <div className="m-4">
                {dataProjects.map((project) => (
                 // eslint-disable-next-line react/jsx-key
                 <h1>- {project.name}-{project.priority}</h1>
              ))}
            </div>          
        );
      }
    
    return (
        <div>
        </div>
    )
}
