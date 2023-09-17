import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

export default async function TimelineLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user){
        redirect('/')
    }

    return (
        <div>
            {user ? (
              <div>
                {children}
                </div>
            ) : (
              <div>
                User is not logged
              </div>
            )}
        </div>
        
    )
}