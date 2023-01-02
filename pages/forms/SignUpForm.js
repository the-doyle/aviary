import { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from 'next/router'

export default function SignUpForm() {
    const supabase = useSupabaseClient() 
    const router = useRouter() 
    const [message, setMessage] = useState(null)

    const handleSignUp = async (e) => {
        e.preventDefault() 

        const {data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: e.target.email.value,
            password: e.target.password.value,
        })
        
        if (signUpData) {
            const {data: insertUserData, error: insertUserError } = await supabase
                .from('user')
                .insert({ id: signUpData.user.id, first_name: e.target.first_name.value })

            console.log(insertUserData, insertUserError)

            router.push('/payment')
        } else {
            setMessage(signUpError.message)
        }
    }

    return (
        <form onSubmit={handleSignUp} method="POST" className="space-y-6">
            <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    First name
                </label>
                <div className="mt-1">
                    <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Continue to payment
                    <span className='ml-2 group-hover:ml-3 group-hover:-mr-1'>&rarr;</span>
                </button>
            </div>
            <div className='text-sm text-red-500'>
                {message}
            </div>
        </form>
    )
}