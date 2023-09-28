'use client'

import { Separator } from "./ui/separator"
import Image from 'next/image'
import x from "app/images/chapter_icon.png"
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Checkbox } from "./ui/checkbox";
const supabase = createClientComponentClient();


export default function AcceptanceCriteria({onDelete}:{onDelete: any}) {

    const [isEditing, setIsEditing] = useState(false);
    const [labelText, setLabelText] = useState('Click to Edit');

    const handleLabelClick = () => {
    setIsEditing(true);
    };

    const handleInputChange = (e: any) => {
    setLabelText(e.target.value);
    };

    const handleInputBlur = () => {
    setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onDelete();
    };
    

    return (
        <div>
            <Checkbox className="mr-2"/>
            {isEditing ? (
               <div>
               <input
                 type="text"
                 value={labelText}
                 onChange={handleInputChange}
                 onBlur={handleInputBlur}
               />
               <button onClick={handleDeleteClick}>Delete</button>
             </div>
           ) : (
             <div>
               <label onClick={handleLabelClick}>{labelText}</label>
               <button onClick={handleDeleteClick}>Delete</button>
             </div>
            )}
        </div>
    )
}
