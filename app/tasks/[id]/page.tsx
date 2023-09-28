'use client'
import { Separator } from '@/components/ui/separator';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePathname } from 'next/navigation';
import { useQuery } from 'react-query';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from '@/components/ui/label';
import TaskHeader from '@/components/task/task-header';
const supabase = createClientComponentClient();


async function getTask(id: number) {
  
  const {
      data: { user },
  } = await supabase.auth.getUser()
  if(user){
      const { data, error } = await supabase.from('tasks').select("*").eq('user_id', user.id).eq('id',id)


      console.log(user.id, id)
      if (error) {
          console.error('Error fetching projects:', error.message);
      }
      return data || null;
  }else{
      return null;
  }
}


export default function TaskPage() {
  const parts = usePathname().split('/'); // Split the URL by '/' characters
  const temp = parts[parts.length - 1];
  const id = parseInt(temp, 10);

  const {
    isLoading,
    error,
    data
  } = useQuery("task", () => getTask(id));

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
      <div className="h-full">
        <div className="grid grid-rows-8 gap-4 h-full">
          <div className='row-span-2 mt-8 ml-8 mb-4 mr-8'>
           <TaskHeader name={data[0].name} description={data[0].description}/>
          </div>
          <div className='row-span-6 '>
            <Separator />
            <div className="grid grid-cols-8 gap-4 h-full">
              <div className='col-span-5 m-8'>
                <Label className="text-xl">Sub-tasks</Label>
                <div className='m-2'>
                + Add
                </div>
              </div>
              <div className='col-span-3'>
                {/* <Separator orientation="vertical" /> */}
                <div className="grid grid-rows-6 gap-1 h-full m-8">
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
