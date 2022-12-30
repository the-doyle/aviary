import woodpecker from '../public/woodpecker.png'
import finch from '../public/finch.png'
import bird from '../public/bird.png'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {
    return (
        <>
            <div className="flex min-h-full">
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
                            <div className="mt-6">
                                <form action="#" method="POST" className="space-y-6">
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
                                            <span className='font-serif ml-2 group-hover:ml-3 group-hover:-mr-1'>&rarr;</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            
                <div className='opacity-30 mt-5 absolute z-0 grid grid-flow-row grid-rows-12 grid-cols-12'>

                    {Array.from({ length: 100 }, (_, i) => i % 5 == 0 ? <Image key={i} alt='bird' src={i % 15 == 0 ? finch : i % 10 == 0 ? woodpecker : bird} className="bg-transparent" /> : <p key={i}></p> )}
                    
                </div>

            </div>
        </>
    )
}
