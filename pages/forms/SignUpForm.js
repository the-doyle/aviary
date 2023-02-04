import { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from 'next/router'
import Modal from "../general/Modal"

import { ArrowPathIcon, FaceSmileIcon } from "@heroicons/react/24/outline"


export default function SignUpForm() {
    const supabase = useSupabaseClient() 
    const router = useRouter() 

    const [open, setOpen] = useState(false)

    const [signUpButton, setSignUpButton] = useState({
        className: "group flex w-full justify-center rounded-md border border-skin-brand bg-skin-brand-light py-2 px-4 text-sm font-medium text-skin-brand-hover shadow-sm hover:bg-skin-brand-light-hover focus:outline-none",
        icon: <span className='ml-2 group-hover:ml-3 group-hover:-mr-1'>&rarr;</span>,
        text: 'Sign up'
    })

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleSignUp = async (e) => {
        e.preventDefault() 

        setSignUpButton({
            className: "group flex w-full justify-center rounded-md border border-skin-brand bg-skin-brand-light py-2 px-4 text-sm font-medium text-skin-brand-hover shadow-sm hover:bg-skin-brand-light-hover focus:outline-none",
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full animate-spin'/>,
            text: 'Signing up...'
        })

        const {data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: e.target.email.value,
            password: e.target.password.value,
        })
        
        if (signUpData) {

            const {data: insertUserData, error: insertUserError } = await supabase
                .from('users')
                .insert({ id: signUpData.user.id, first_name: e.target.first_name.value })

            setOpen(true)

            setSignUpButton({
                className: "group flex w-full justify-center rounded-md border border-skin-brand bg-skin-brand-light py-2 px-4 text-sm font-medium text-skin-brand-hover shadow-sm hover:bg-skin-brand-light-hover focus:outline-none",
                icon: <FaceSmileIcon className='ml-1 h-4 rounded-full' />,
                text: 'Sign up in progress'
            })

            // router.push('/payment')
        } else {
            setMessage(signUpError.message)

            setSignUpButton({
                className: "transition-all group flex w-full justify-center align-middle rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none",
                icon: <span className='ml-2 group-hover:ml-3 group-hover:-mr-1'>&rarr;</span>,
                text: 'Sign up'
            })
        }
    }

    return (
        <>
            <Modal 
                open={open}
                handleOpen={handleOpen}
                title="Confirm your email"
                message="Please check your inbox to confirm your email"
                buttonText="Got it!"
            /> 

            <form onSubmit={handleSignUp} method="POST" className="space-y-6">
                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-skin-base">
                        First name
                    </label>
                    <div className="mt-1">
                        <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        required
                        className="block w-full appearance-none rounded-md border border-skin-muted px-3 py-2 shadow-sm focus:border-skin-brand focus:outline-none focus:ring-skin-brand sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-skin-base">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-skin-muted px-3 pb-2 shadow-sm focus:border-skin-brand focus:outline-none focus:ring-skin-brand sm:text-sm"
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
                        className="block w-full appearance-none rounded-md border border-skin-muted px-3 pb-2 shadow-sm focus:border-skin-brand focus:outline-none focus:ring-skin-brand sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className={signUpButton.className}
                    >
                        {signUpButton.text}
                        {signUpButton.icon}
                    </button>
                </div>
            </form>
        </>
    )
}