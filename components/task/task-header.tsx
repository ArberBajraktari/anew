'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useQuery, useQueryClient } from 'react-query';
import { Textarea } from "@chakra-ui/react";
const supabase = createClientComponentClient();

interface TaskHeaderProps {
    task_id: number;
    name: string,
    description: string
  }


async function updateDescription(description: string, task_id: number) {
    const { data, error } = await supabase
    .from('tasks')
    .update({ description: description })
    .eq('id', task_id)
    .select()

    if(data){
        //done
    }else{
        //error updating pop up
    }
    
}

async function updateName(name: string, task_id: number) {
    const { data, error } = await supabase
    .from('tasks')
    .update({ name: name })
    .eq('id', task_id)
    .select()

    if(data){
        //done
    }else{
        //error updating pop up
    }
    
}

export default function TaskHeader({ task_id, name, description}: TaskHeaderProps) {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(description);

    const [isEditingName, setIsEditingName] = useState(false);
    const [editedTextName, setEditedTextName] = useState(name);

    const handleTextClick = () => {
        setIsEditing(true);
    };

    const handleTextNameClick = () => {
        setIsEditingName(true);
    };

    const handleBlur = () => {
    setIsEditing(false);
    };

    const handleBlurName = () => {
        setIsEditingName(false);
    };

    const handleInputChange = (e: any) => {
        setEditedText(e.target.value);
    };

    const handleInputNameChange = (e: any) => {
        setEditedTextName(e.target.value);
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            setEditedText(e.target.value)
            updateDescription(e.target.value, task_id)
            queryClient.invalidateQueries("task");
        }
    };

    const handleKeyPressName = (e: any) => {
        if (e.key === 'Enter') {
            setIsEditingName(false);
            setEditedTextName(e.target.value)
            updateName(e.target.value, task_id)
            queryClient.invalidateQueries("task");
        }
    };

    return (
        <div>
            <div className="h-10 w-full pt-4 pl-8 pr-40">
                {isEditingName ? (
                        <Textarea
                        className="w-full h-full pt-4 pl-8 pr-40"
                        value={editedTextName}
                        onChange={handleInputNameChange}
                        onBlur={handleBlurName}
                        onKeyPress={handleKeyPressName}
                        autoFocus // Autofocus the textarea when in edit mode
                        />
                    ) : (
                        <p onClick={handleTextNameClick} className="text-2xl ml-12">{name}</p>
                    )}
            </div>
            
            <div className="flex flex-col justify-end h-40 max-h-40 w-full text-sm p-4 pl-20 pr-40">
                {isEditing ? (
                    <Textarea
                    className="w-full h-full"
                    value={editedText}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    autoFocus // Autofocus the textarea when in edit mode
                    />
                ) : (
                    <p onClick={handleTextClick} className="overflow-y-auto hover:underline">{description}</p>
                )}
            </div>
        </div>
    )
}
