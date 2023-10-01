'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Label } from "../ui/label";
const supabase = createClientComponentClient();

interface DescAreaProps {
    description: string
  }


export default function DescriptionArea({description}: DescAreaProps) {
    return (
        <div className="h-full w-4/5">
            {description}
        </div>
    )
}
