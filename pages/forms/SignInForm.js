import { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from 'next/router'

export default function SignInForm() {
    const supabase = useSupabaseClient() 
    const router = useRouter() 
    const [message, setMessage] = useState(null)

    const handleSignIn = async (e) => {
        e.preventDefault() 

        const {data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: e.target.email.value,
            password: e.target.password.value,
        })
        
        if (signInError) {
            setMessage(signInError.message)
        } else {
            router.push('/accounts')        }
    }

    return (
        <form onSubmit={handleSignIn} method="POST" className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-skin-light">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-skin-muted px-3 py-2 shadow-sm focus:border-skin-brand focus:outline-none focus:ring-skin-brand sm:text-sm"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-skin-base">
                    Password
                </label>
                <div className="mt-1">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-skin-muted px-3 pb-2 shadow-sm focus:border-skin-brand focus:outline-non focus:ring-skin-brand sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group flex w-full justify-center rounded-md border border-skin-brand bg-skin-brand-light py-2 px-4 text-sm font-medium text-skin-brand-hover shadow-sm hover:bg-skin-brand-light-hover focus:outline-none"
                >
                    Sign in
                    <span className='ml-2 group-hover:ml-3 group-hover:-mr-1'>&rarr;</span>
                </button>
            </div>
            <div className='text-sm text-red-500'>
                {message}
            </div>
        </form>
    )
}