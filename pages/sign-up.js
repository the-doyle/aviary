import Link from 'next/link'
import BackgroundBirds from './general/BackgroundBirds'
import SignUpForm from './forms/SignUpForm'
import LinkButtonDark from './general/LinkButtonDark'

export default function SignUp() {
    return (
        <>
            <div className="flex min-h-full">

                <BackgroundBirds /> 

                <div className="relative z-10 flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                            className="h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
                            alt="Your Company"
                            />
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign up for Aviary</h2>
                        </div>

                        <div className="text-sm mt-3">
                            <span>Already have an account? </span>
                            <Link href="/" className="font-medium text-green-600 hover:text-green-500">
                                Sign in
                            </Link>
                        </div>

                        <div className="mt-8">
                            <div className="my-6">
                                <SignUpForm />
                            </div>
                            <LinkButtonDark href='/data' link text='Data' />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
