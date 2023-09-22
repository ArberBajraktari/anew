'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react';
import ReactQueryProvider from './providers/reactQuery';

export default function Home() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<null | {}>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
        setIsLoading(false); // Set loading to false when the user data is retrieved
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    fetchUser();
  }, [supabase.auth]);

  if (isLoading) {
    // Display a loading indicator while fetching user data
    return (
        <div>
            <div className='grid grid-cols-3 gap-6 p-5 space-y-6'>
              Loading...
            </div>
        </div>
    );
  }
  if(user){
    return (
      <div>
          <ReactQueryProvider>
            
          </ReactQueryProvider> 
      </div>
    )
  }
  return (
    <div>
        You are not signed in.
    </div>
  )
}
