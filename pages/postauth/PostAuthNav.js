import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = [
    { name: 'Data', href: '/data' },
    { name: 'Charts', href: '/charts' },
    { name: 'Aviary', href: '/aviary' },
    { name: 'Profile', href: '/profile' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PostAuthNav(props) {
    return props.current_tab ? (
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
            {({ open }) => (
                <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                        <img
                            className="block h-8 w-auto lg:hidden"
                            src="https://tailwindui.com/img/logos/mark.svg?color=slate&shade=600"
                            alt="Your Company"
                        />
                        <img
                            className="hidden h-8 w-auto lg:block"
                            src="https://tailwindui.com/img/logos/mark.svg?color=slate&shade=600"
                            alt="Your Company"
                        />
                        </div>
                        <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    props.current_tab == item.name
                                    ? 'border-slate-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                )}
                                aria-current={props.current_tab == item.name ? 'page' : undefined}
                                >
                                {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        
                        <Link 
                            href='/profile' 
                            className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-6 pb-5 border-b-2 text-sm font-medium'
                        >
                            Sign out
                        </Link>
                        
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                        </Disclosure.Button>
                    </div>
                    </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 pt-2 pb-3">
                    {navigation.map((item) => (
                        <Link href={item.href} passHref>
                            <Disclosure.Button
                            key={item.name}
                            as="a"
                            className={classNames(
                                props.current_tab == item.name
                                ? 'bg-slate-50 border-slate-500 text-slate-700'
                                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                            )}
                            aria-current={props.current_tab == item.name ? 'page' : undefined}
                            >
                            {item.name}
                            </Disclosure.Button>
                        </Link>
                    ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 pb-3">
                    
                    <div className="space-y-1">
                        <Link href='#' className='block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'>Sign out</Link>
                    </div>
                    </div>
                </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    ) : null
}