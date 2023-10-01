'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useQuery, useQueryClient } from 'react-query';
import { Textarea } from "@chakra-ui/react";
import CheckboxItem from "./checkbox-item";
import { Button } from "../ui/button";
const supabase = createClientComponentClient();

interface SubTaskProps {
    task_id: number;
    status: string;
    day_diff: number;
    sub_tasks: SubTaskProps2[];
  }

interface SubTaskProps2{
    id: number;
    name: string;
    status: boolean;
    sub_order: number;
}




export default function SubTask({task_id, status, sub_tasks}:SubTaskProps) {
    const [subTasks, setSubTasks] = useState(sub_tasks)

    function orderSub(sub: SubTaskProps2[]){
        const filteredAndSortedElements = sub
        .filter((element) => element.sub_order >= 0)
        .sort((a, b) => a.sub_order - b.sub_order);
        return filteredAndSortedElements
    }

    function addSubTask(){
        addSubTaskDB(task_id, findOrder(subTasks) + 1)
        const newElement = { id: 0, name: 'New sub task', status: false, sub_order: findOrder(subTasks) + 1};
        const updatedSubTasks = [...subTasks, newElement];
        setSubTasks(updatedSubTasks);
        
    }
    function findOrder(data: Array<SubTaskProps2>){
        if (data.length === 0) {
          return 0; // Handle the case when the array is empty
        }
      
        return data.reduce((maxValue, currentItem) => {
          // Compare the "value" property of each object to find the maximum value
          return currentItem.sub_order > maxValue ? currentItem.sub_order : maxValue;
        }, data[0].sub_order); // Initialize with the value of the first item
      };

    async function addSubTaskDB(task_id: number, order_id: number) {
        const { data, error } = await supabase
        .from('sub_tasks')
        .insert([
        { name: 'New sub-task', status: false, task_id: task_id, sub_order: order_id},
        ])
        .select()

    
        if(data){
            return data
        }else{
            //error updating pop up
        }
        
    }

    console.log(sub_tasks)
    return (
        <div className={`w-full  rounded-md ${status === "green" ? "bg-green-50" : status === "red" ? "bg-red-50" : status === "blue" ? "bg-sky-50" : "bg-sky-50" }`}>
            <div className="m-4">
                <Label className="font-bold pl-4">Subtasks</Label>
            </div>
            <div className={`h-40 ${status === "green" ? "bg-green-100" : status === "red" ? "bg-red-100" : status === "blue" ? "bg-sky-100" : "bg-sky-100" }`}>
                <div className="m-4">
                    {orderSub(subTasks).map((sub_task) => (
                        <CheckboxItem key={sub_task.id} status={sub_task.status} name={sub_task.name} id={task_id}/> 
                    ))}
                    <Button onClick={addSubTask}>Add</Button>
                </div>
            </div>
        </div>
    )
}
