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
    status: boolean;
    name: string
  }


export default function CheckboxItem({ status, name}: CheckboxItemProps) {
    return (
        <div className="m-2">
            <Checkbox className="m-1" /> {name}
        </div>
    )
}
