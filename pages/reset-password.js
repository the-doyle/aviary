import Link from 'next/link'
import PreAuthFooter from './preauth/PreAuthFooter'
import Logo from './general/Logo'
import ResetPasswordForm from './forms/ResetPasswordForm'

import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import RequestResetPasswordForm from './forms/RequestResetPasswordForm'

export default function ResetPassword() {

    const user = useUser();
	const router = useRouter() 
    const supabase = useSupabaseClient()
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == "PASSWORD_RECOVERY" || event == 'SIGNED_IN') {
                setEnabled(true)
            } 
        })
    }, [])

    const resetPassword = async () => {
        const { data, error } = await supabase.auth
            .resetPasswordForEmail('user@email.com')
    }

    return (
        <>
            <div className="flex min-h-screen">

                <div className="relative flex flex-1 flex-col py-12 px-4 sm:px-6 md:pt-28 lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <Logo height="60" width="60" href='/' />
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-skin-brand">Reset your password</h2>
                        </div>

                        <div className="mt-8">
                            <div className="my-6">
                                {enabled ? <ResetPasswordForm /> : <RequestResetPasswordForm /> }
                                <div className="relative mt-5">
                                    <div className="relative flex justify-start">
                                        <span className="bg-skin-inverted text-sm text-skin-light"></span>
                                        <Link
                                            href='/sign-in'
                                            className='pl-1 text-sm font-medium text-skin-brand hover:text-skin-brand-hover'
                                            
                                        >
                                            Sign in
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <PreAuthFooter />
        </>
    )
}
