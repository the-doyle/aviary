import { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function ResetPasswordForm() {
    const supabase = useSupabaseClient() 
    const [message, setMessage] = useState(null)

    const handleReset = async (e) => {
        e.preventDefault() 

        const {data: resetData, error: resetError } = await supabase.auth
            .resetPasswordForEmail(e.target.email.value)
        
        if (resetData) {
            setMessage("Check your inbox for a reset password link.")
        } else {
            setMessage(resetError)
        }
    }

    return (
        <form onSubmit={handleReset} method="POST" className="space-y-6">
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

            <div>
                <button
                    type="submit"
                    className="group flex w-full justify-center rounded-md border border-skin-brand bg-skin-brand-light py-2 px-4 text-sm font-medium text-skin-brand-hover shadow-sm hover:bg-skin-brand-light-hover focus:outline-none"
                >
                    Reset password
                    <span className='ml-2 group-hover:ml-3 group-hover:-mr-1'>&rarr;</span>
                </button>
            </div>
            <div className='text-sm text-skin-brand'>
                {message}
            </div>
        </form>
    )
}