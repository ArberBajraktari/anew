'use client'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { redirect } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

  
import { Input } from "@/components/ui/input"
  
  


export default function NavBar() {
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
        <div className="bg-gray-50/50 mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
                <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                        <Label className="my-auto">
                            <Link
                                href="/"
                                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                                >
                                Daily
                            </Link>
                        </Label>

                        <Label className="my-auto">
                            <Link
                                href="/projects"
                                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                            >
                                Projects
                            </Link>
                        </Label>

                        <Label className="my-auto">
                            <Link
                                href="/backlog"
                                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                            >
                                Backlog
                            </Link>
                        </Label>

                        <Label className="my-auto">
                            <Link
                                href="/timeline"
                                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                            >
                                Timeline
                            </Link>
                        </Label>
                    </div>
                </div>
                <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Create</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <Tabs defaultValue="project" className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="project">Project</TabsTrigger>
                                    <TabsTrigger value="chapter">Chapter</TabsTrigger>
                                    <TabsTrigger value="task">Task</TabsTrigger>
                                </TabsList>
                                <TabsContent value="project">Add project here</TabsContent>
                                <TabsContent value="chapter">Add chapter here</TabsContent>
                                <TabsContent value="task">Add task here</TabsContent>
                            </Tabs>
                        </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                    {user ? (
                        <div>
                            <Label className="my-auto">
                            <form action="/auth/sign-out" method="post">
                                <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                                    Logout
                                </button>
                                </form>
                            </Label>
                        </div>
                        ) : (
                        <div>
                            <div>
                                <Label className="my-auto">
                                    <Link
                                        href="/login"
                                        className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                                    >
                                        Sign in/Sign up
                                    </Link>
                                </Label>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>

        
    )
}





{/* <Label>
          <Link
              href="/daily"
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Daily
          </Link>
        </Label>

        <Label>
          <Link
              href="/timeline"
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Timeline
          </Link>
        </Label>
      </div>

      {/* Spacer for Center Alignment */}
    //   <div className="flex-grow"></div>
    //     <Button variant="outline" className='bg-blue-500 text-white'>Create</Button>
      {/* Spacer for Right Alignment */}
    //   <div className="flex-grow"></div>

      {/* Log In/Sign Up (Right) */}
//       <div className="flex items-center space-x-4">
//       <div>
//             <form
//               action="/auth/sign-out"
//               method="post"
//             >

// <Label>
//               <button formAction="/auth/sign-out">
//                   Log out
//             </button>
//             </Label>
//             </form>
//           </div>
//           </div></div></div></div> */}