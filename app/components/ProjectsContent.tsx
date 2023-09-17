'use client'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { redirect } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
const supabase = createClientComponentClient();


async function getProjects() {
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if(user){
        const { data, error } = await supabase.from('projects').select().eq('user_id', user.id);

        if (error) {
            console.error('Error fetching projects:', error.message);
        }
        return data || [];
    }else{
        return [];
    }
}

export default function ProjectsContent() {
    const {
        isLoading: isLoadingProjects,
        error: errorProjects,
        data: dataProjects
      } = useQuery("projects", getProjects);

      if(isLoadingProjects){
        return (
            <div>
                Projects are loading
            </div>
        )
      }
      
      if (dataProjects && dataProjects.length > 0) {
        return (
            <div className='h-full w-full flex space-x-8'>
              {dataProjects.map((project) => (
                  <div key={project.id}>{project.name}</div>
              ))}
            </div>
          
        );
      } else {
        return <div>No projects available.</div>;
      }
    
    return (
        <div>
        </div>
    )
}
