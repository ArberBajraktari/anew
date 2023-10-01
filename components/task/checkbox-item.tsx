'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useQuery, useQueryClient } from 'react-query';
import { Textarea } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox";
const supabase = createClientComponentClient();

interface CheckboxItemProps {
    id: number;
    status: boolean;
    name: string
  }


export default function CheckboxItem({ id, status, name}: CheckboxItemProps) {
    const [checkStatus, setCheckStatus] = useState<boolean>(status)

    function flipCheckbox(){
        changeSubTaskStatus(!checkStatus, id)
        setCheckStatus(!checkStatus)
    }

    async function changeSubTaskStatus(status: boolean, task_id: number) {
        console.log(status)
        const { data, error } = await supabase
        .from('sub_tasks')
        .update({ status: status })
        .eq('id', task_id)
        .select()

        if(data){
            const { data: check_task, error: error_check_task } = await supabase
            .from('sub_tasks')
            .select("*")
            .eq("task_id", task_id)
            if(check_task){
                console.log(check_task)
                const hasFalseStatus = check_task.some((element) => element.status === false);
                if (hasFalseStatus) {
                    console.log('At least one element has a status of false.');
                  } else {
                    console.log('No elements have a status of false.');
                  }
            }
        }else{
            //error updating pop up
        }
        
    }

    return (
        <div className="m-2">
            <Checkbox className="m-1" checked={checkStatus} onClick={flipCheckbox}/> {name}
        </div>
    )
}
