'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react';

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
      <main className="flex flex-col items-center justify-between p-24">
        <div>Loading...</div>
      </main>
    );
  }

  if (user == null) {
    return (
      <main className="flex flex-col items-center justify-between p-24">
        <div>
          Not logged
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        Content
      </div>
    </main>
  );
}
