import Link from 'next/link'
import SignInForm from './forms/SignInForm'
import PreAuthFooter from './preauth/PreAuthFooter'

export default function SignIn() {
    return (
        <>
            <div className="flex min-h-screen">

                <div className="relative flex flex-1 flex-col py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                            className="h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
                            alt="Your Company"
                            />
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">Welcome back! Sign in to Aviary</h2>
                        </div>


                        <div className="mt-8">
                            <div className="my-6">
                                <SignInForm />
                                <div className="relative mt-5">
                                    <div className="relative flex justify-start">
                                        <span className="bg-white text-sm text-slate-500">Don&apos;t have an account? </span>
                                        <Link
                                            href='/sign-up'
                                            className='pl-1 text-sm font-medium text-green-600 hover:text-green-700'
                                            
                                        >
                                            Get started
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
