import Link from 'next/link'
import SignInForm from './forms/SignInForm'
import PreAuthFooter from './preauth/PreAuthFooter'
import Logo from './general/Logo'
import { useUser } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useRouter } from "next/router";

export default function SignIn() {

    const user = useUser();
	const router = useRouter() 

    return (
        <>
            <div className="flex min-h-screen">

                <div className="relative flex flex-1 flex-col py-12 px-4 sm:px-6 md:pt-28 lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <Logo height="60" width="60" href='/' />
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-skin-brand">Welcome back!</h2>
                        </div>

                        <div className="mt-8">
                            <div className="my-6">
                                <SignInForm />
                                <div className="relative mt-5">
                                    <div className="relative flex justify-between">
                                        <Link
                                            href='/sign-up'
                                            className='pl-1 text-sm font-medium text-skin-brand hover:text-skin-brand-hover'
                                            
                                        >
                                            Sign up
                                        </Link>
                                        <Link
                                            href='/reset-password'
                                            className='pl-1 text-sm font-medium text-skin-muted hover:text-skin-brand-hover'
                                            
                                        >
                                            Forgot your password?
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
