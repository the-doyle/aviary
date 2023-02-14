import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, CogIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Logo from '../general/Logo'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const pages = [
    { name: 'Accounts', href: '/accounts' },
    { name: 'Goals', href: '/goals' },
    { name: 'Progress', href: '/progress' },
    { name: 'Aviary', href: '/aviary' },
]

export default function PostAuthNav(props) {
    const supabase = useSupabaseClient() 

    const signOut = async () => {
        const {error: signOutError } = await supabase.auth.signOut()

        if (signOutError) {
            console.log(signOutError)
        } else {
            return true 
        }
    }

    return props.current_tab ? (
        <Disclosure as="nav" className="bg-skin-inverted shadow">
        {({ open }) => (
            <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            )}
                            </Disclosure.Button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Logo height="40" width="40" href='/accounts' /> 
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {pages.map((item) => (
                                    <Link
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        props.current_tab == item.name
                                        ? 'border-skin-light text-skin-base'
                                        : 'border-transparent text-skin-light hover:border-skin-light hover:text-skin-base',
                                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all'
                                    )}
                                    aria-current={props.current_tab == item.name ? 'page' : undefined}
                                    >
                                    {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="flex rounded-full bg-skin-inverted text-sm text-skin-muted hover:text-skin-light focus:outline-none">
                                    <span className="sr-only">Open user menu</span>
                                        <CogIcon className="h-6 w-6" aria-hidden="true" />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                            <Link
                                                href="/profile"
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                            >
                                                Settings
                                            </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                            <Link 
                                            href='/' 
                                            onClick={signOut}
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                            >
                                                Sign out
                                            </Link>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 pt-2 pb-4">
                        {pages.map((item) => (
                            <Link href={item.href} key={item.name} passHref>
                                <Disclosure.Button
                                as="a"
                                className={classNames(
                                    props.current_tab == item.name
                                    ? 'bg-skin-secondary border-skin-light text-skin-base'
                                    : 'border-transparent text-skin-light hover:bg-skin-secondary hover:border-skin-light hover:text-skin-base',
                                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                )}
                                aria-current={props.current_tab == item.name ? 'page' : undefined}
                                >
                                {item.name}
                                </Disclosure.Button>
                            </Link>
                        ))}
                    </div>
                </Disclosure.Panel>
            </>
        )}
        </Disclosure>
    ) : null 
}
