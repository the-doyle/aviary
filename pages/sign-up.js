import Link from 'next/link'
import SignUpForm from './forms/SignUpForm'
import PreAuthFooter from './preauth/PreAuthFooter'

export default function SignUp() {

    return (
        <>
            <div className="flex min-h-screen">

                <div className="relative flex flex-1 flex-col py-12 px-4 sm:px-6 md:pt-28 lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                            className="h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
                            alt="Your Company"
                            />
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">Sign up for Aviary</h2>
                            {/* <h2 className='mt-1 text-base font-medium text-slate-500'>$30 / year</h2> */}
                        </div>

                        <div className="mt-8">
                            <div className="my-6">
                                <SignUpForm />
                                <div className="relative mt-5">
                                    <div className="relative flex justify-start">
                                        <span className="bg-white text-sm text-slate-500">Already have an account? </span>
                                        <Link
                                            href='/sign-in'
                                            className='pl-1 text-sm font-medium text-green-600 hover:text-green-700'
                                            
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
