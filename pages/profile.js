import PostAuthNav from "./postauth/PostAuthNav";

import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import Link from "next/link";


export default function Profile() {
    const user = useUser() 
    const supabase = useSupabaseClient() 
    const [userData, setUserData] = useState(null)

    const getUserData = async () => {
        const {data: userData, error: userError} = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .limit(1)
            .single()
        
        setUserData(userData)
    }

    useEffect(() => {
        if (user && supabase) {
            getUserData() 
        }
    }, [user, supabase])

    return (
        <div className="overflow-hidden bg-white">
            <PostAuthNav current_tab='Profile' />

            <div className="relative py-10 min-h-screen">
                <main>
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-20">
                        <div className='bg-skin-secondary-hover rounded-lg p-5'>
                            <h3 className="text-lg font-medium leading-6 text-skin-base">Settings</h3>
                            <div className="mt-5 border-t border-skin-secondary-button-border">
                                <dl className="divide-y divide-slate-200">
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                        <dt className="text-sm font-medium text-skin-light">First name</dt>
                                        <dd className="mt-1 flex text-sm text-skin-base sm:col-span-2 sm:mt-0 font-medium">
                                            <span className="flex-grow">Ben</span>
                                            <span className="ml-4 flex-shrink-0">
                                                <button
                                                    type="button"
                                                    className="rounded-md font-medium text-skin-brand hover:text-skin-brand-hover focus:outline-none"
                                                    >
                                                    Update
                                                </button>
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                        <dt className="text-sm font-medium text-skin-light">Password</dt>
                                        <dd className="mt-1 flex text-sm text-skin-base sm:col-span-2 sm:mt-0 font-medium">
                                            <span className="flex-grow"></span>
                                            <span className="ml-4 flex-shrink-0">
                                                <Link
                                                    href='/reset-password'
                                                    type="button"
                                                    className="rounded-md font-medium text-skin-brand hover:text-skin-brand-hover focus:outline-none"
                                                    >
                                                    Reset password
                                                </Link>
                                            </span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
