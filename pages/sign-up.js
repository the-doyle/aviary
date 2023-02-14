import Link from 'next/link'
import SignUpForm from './forms/SignUpForm'
import PreAuthFooter from './preauth/PreAuthFooter'
import Logo from './general/Logo'

export default function SignUp() {

    return (
        <>
            <div className="flex min-h-screen">

                <div className="relative flex flex-1 flex-col py-12 px-4 sm:px-6 md:pt-28 lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <Logo height="60" width="60" href='/' />
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-skin-brand">Sign up for Aviary</h2>
                            {/* <h2 className='mt-1 text-base font-medium text-slate-500'>$30 / year</h2> */}
                        </div>

                        <div className="mt-8">
                            <div className="my-6">
                                <SignUpForm />
                                <div className="relative mt-5">
                                    <div className="relative flex justify-start">
                                        <span className="bg-skin-inverted text-sm text-skin-light">Already have an account? </span>
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
