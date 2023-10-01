'use client'
import { Separator } from '@/components/ui/separator';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePathname } from 'next/navigation';
import { useQuery } from 'react-query';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from '@/components/ui/label';
import SubTask from '@/components/task/sub-task';
import TaskHeader from '@/components/task/task-header';
import { useState } from 'react';
const supabase = createClientComponentClient();


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

export default function TaskPage() {
  const parts = usePathname().split('/'); // Split the URL by '/' characters
  const temp = parts[parts.length - 1];
  const id = parseInt(temp, 10);
  const [color, setColor] = useState('');

  async function getTask(id: number) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if(user){
        const { data, error } = await supabase.from('tasks').select("*, sub_tasks(id, name, status, sub_order)").eq('user_id', user.id).eq('id',id)
  
  
        console.log(user.id, id)
        if (error) {
            console.error('Error fetching projects:', error.message);
        }
        return data || null;
    }else{
        return null;
    }
  }

  const {
    isLoading,
    error,
    data
  } = useQuery("task_"+id.toString(), () => getTask(id));

  if(isLoading){
    return (
      <div>
        Loading Task
      </div>
    );
  }
  if(error){
    return (
      <div>
        Error loading Task
      </div>
    );
  }
  
  if(data){
    console.log(data)
    return (
      <div className="h-full flex flex-col">
        <TaskHeader name={data[0].name} description={data[0].description} task_id={data[0].id}/>
        <Separator />
        <div className="grid grid-cols-8 gap-4 flex-grow">
          <div className='col-span-5 m-8'>
            <SubTask 
              status={data[0].status === true
              ? "green" 
              : data[0].status === false  && calculateDays(data[0].deadline) === 0 && data[0].follow_up !== null ? "green" 
              : data[0].status === false  && calculateDays(data[0].deadline) === 0 && data[0].follow_up === null ? "blue" 
              : data[0].status === false  && calculateDays(data[0].deadline) > 0 && data[0].follow_up !== null ? "blue" 
              : data[0].status === false  && calculateDays(data[0].deadline) > 0 && data[0].follow_up === null ? "blue" 
              : data[0].status === false  && calculateDays(data[0].deadline) < 0 && data[0].follow_up === null ? "red" 
              : data[0].status === false  && calculateDays(data[0].deadline) < 0 && data[0].follow_up !== null ? "green" 
              : "blue"
          }

            day_diff={calculateDays(data[0].deadline)}
            sub_tasks={data[0].sub_tasks}
            task_id={data[0].id}
            />
          </div>
          <div className='col-span-3'>
            {/* <Separator orientation="vertical" /> */}
            <div className="grid grid-rows-6 gap-1 h-full">
              <div className='row-span-1'>
                Chapter
              </div>
              <div className='row-span-1'>
                Priority
              </div>
              <div className='row-span-1'>
                Deadline
              </div>
              <div className='row-span-1'>
                Follow up
              </div>
              <div className='row-span-1'>
                Notes
              </div>
              <div className='row-span-1'>
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      Error
    </div>
  );  
}
