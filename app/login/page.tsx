import { Input } from "@/components/ui/input";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs"


export default function Login() {
    return (
        <div className="h-full">
            <div className="h-fit w-1/2 mx-auto mt-6">
                <form
                    className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground pt-6"
                    action="/auth/sign-in"
                    method="post"
                >
                    <label className="text-md" htmlFor="email">
                    Email:
                    </label>
                    <Input type="email" placeholder="example@gmail.com" name='email' />
                    <label className="text-md" htmlFor="email">
                    Password:
                    </label>
                    <Input type="password" placeholder="••••••••" name='password' />
                    
                    <button formAction="/auth/sign-in"
                    className="bg-green-700 rounded px-4 py-2 text-white mb-2">
                    Sign In
                    </button>
                    <button
                    formAction="/auth/sign-up"
                    className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
                    >
                    Sign Up
                    </button>
                </form>
            </div>
        </div>
    )}
