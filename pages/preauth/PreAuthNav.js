import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../general/Logo'

const navigation = [
	{ name: 'Features', href: '#features' },
	{ name: 'Pricing', href: '#pricing' },
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
                        <div className='flex'>
                            <Logo height="40" width="40" />
                            <Link href="/" className='flex items-center mr-5'>
                                <span className="sr-only">Aviary Finance</span>
                                <h1 className='text-xl text-skin-brand-hover font-bold'>
                                    Aviary
                                    <span className='text-skin-brand font-medium'>Finance</span>
                                </h1>
                            </Link>
                        </div>
                        <div className="-mr-2 flex items-center md:hidden">
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-skin-inverted p-2 text-light hover:bg-skin-secondary hover:text-skin-base focus:outline-none">
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                    </div>
                    <div className="hidden md:ml-10 md:block md:space-x-10 md:justify-center">
                        {navigation.map((item) => (
                            <a 
                            key={item.name} 
                            href={item.href} 
                            className="font-medium text-skin-light hover:text-skin-base"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="hidden text-right md:block z-50">
                    <Link
                    href="/sign-in"
                    className="inline-flex items-center rounded-md border border-skin-secondary-button-border bg-skin-secondary px-4 py-2 text-sm font-medium text-skin-base shadow-sm hover:bg-skin-secondary-hover focus:outline-none"
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
                    <div className="overflow-hidden rounded-lg bg-skin-inverted shadow-md ring-1 ring-black ring-opacity-5">
                        <div className="flex items-center justify-between px-5 pt-4">
                            <div className='flex'>
                                <Logo height="40" width="40" />
                                <h1 className='text-lg text-skin-brand-hover font-bold'>
                                    Aviary
                                    <span className='text-skin-brand font-medium'>Finance</span>
                                </h1>
                            </div>
                            <div className="-mr-2">
                                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-skin-inverted p-2 text-skin-light hover:text-skin-base focus:outline-none">
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
                                className="block rounded-md px-3 py-2 text-base font-medium text-skin-light hover:bg-skin-secondary-hover hover:text-skin-base"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <Link
                            href="/sign-in"
                            className="block w-full bg-skin-secondary px-5 py-3 text-center font-medium text-skin-light hover:bg-skin-secondary-hover"
                            >
                            Sign in 
                        </Link>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
	)
}
