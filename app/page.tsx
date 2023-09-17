'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react';

export default function Home() {

  const supabase = createClientComponentClient();
    const [user, setUser] = useState<{} | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data.user){
                setUser(data.user)
                console.log(data.user)
            }else{
                setUser(null)
            }
        
        };

        fetchUser();
    }, [supabase.auth]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <div>
            Content
        </div>
        ) : (
        <div>
          Logged out
          </div>  
          )}
    </main>
  )
}
