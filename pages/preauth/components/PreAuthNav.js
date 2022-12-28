import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import birdPic from '../../../public/bird.png'
import Link from 'next/link'

const navigation = [
	{ name: 'Features', href: '#' },
	{ name: 'Pricing', href: '#' },
	{ name: 'About', href: '#' },
]

export default function PreAuthNav() {
	return (
        <Popover>
            <nav
                className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 pt-8"
                aria-label="Global"
            >
                <div className="flex flex-1 items-center">
                    <div className="flex w-full items-center justify-between md:w-auto">
                        <Link href="/" className='flex items-center mr-5'>
                            <span className="sr-only">Aviary Finance</span>
                            <Image src={birdPic} className="h-8 w-auto sm:h-10" /> 
                            <h1 className='text-lg text-stone-500 font-bold'>
                                Aviary
                                <span className='text-stone-400 font-medium'>Finance</span>
                            </h1>
                        </Link>
                        <div className="-mr-2 flex items-center md:hidden">
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                    </div>
                    <div className="hidden md:ml-10 md:block md:space-x-10 md:justify-center">
                        {navigation.map((item) => (
                            <Link 
                            key={item.name} 
                            href={item.href} 
                            className="font-medium text-slate-600 hover:text-slate-900"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="hidden text-right md:block">
                    <Link
                    href="#"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Sign in
                    </Link>
                </div>
            </nav>

            <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel
                focus
                className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
                >
                    <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                        <div className="flex items-center justify-between px-5 pt-4">
                            <div className='flex'>
                                <Image src={birdPic} className="h-8 w-auto" /> 
                                <h1 className='text-lg text-stone-500 font-bold'>
                                    Aviary
                                    <span className='text-stone-400 font-medium'>Finance</span>
                                </h1>
                            </div>
                            <div className="-mr-2">
                                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                                <span className="sr-only">Close main menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Link
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <Link
                            href="#"
                            className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-slate-600 hover:bg-gray-100"
                            >
                            Sign in 
                        </Link>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
	)
}
