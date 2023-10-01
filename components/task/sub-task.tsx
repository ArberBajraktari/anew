'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useQuery, useQueryClient } from 'react-query';
import { Textarea } from "@chakra-ui/react";
import CheckboxItem from "./checkbox-item";
const supabase = createClientComponentClient();

interface SubTaskProps {
    status: string;
    day_diff: number;
  }


export default function SubTask({status, day_diff}:SubTaskProps) {
    

    return (
        <div className={`w-full  rounded-md ${status === "green" ? "bg-green-50" : status === "red" ? "bg-red-50" : status === "blue" ? "bg-sky-50" : "bg-sky-50" }`}>
            <div className="m-4">
                <Label className="font-bold pl-4">Subtasks</Label>
            </div>
            <div className={`h-40 ${status === "green" ? "bg-green-100" : status === "red" ? "bg-red-100" : status === "blue" ? "bg-sky-100" : "bg-sky-100" }`}>
                <div className="m-4">
                    <CheckboxItem status={false} name={"hey"}/>
                </div>
            </div>
        </div>
    )
}
