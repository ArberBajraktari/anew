'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Label } from "../ui/label";
const supabase = createClientComponentClient();

interface TaskHeaderProps {
    name: string,
    description: string
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

export default function TaskHeader({ name, description}: TaskHeaderProps) {
    return (
        <div className="h-full w-full">
            <div className="h-10 w-full">
                <Label className="text-2xl">{name}</Label>
            </div>
            
            <div className="h-10 w-full">
                <Label className="text-2xl">{description}</Label>
            </div>
        </div>
    )
}
