import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

export default async function ChapterLayout({
  children,
}: {
  children: React.ReactNode
}) {


    return (
        <div>
          {children}
        </div>
        
    )
}