import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Logo from '../general/Logo'

const navigation = [
    { name: 'Accounts', href: '/accounts' },
    { name: 'Goals', href: '/goals' },
    { name: 'Progress', href: '/progress' },
    { name: 'Aviary', href: '/aviary' },
    // { name: 'Profile', href: '/profile' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

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
        <Disclosure as="nav" className="border-b border-skin-secondary-hover bg-skin-inverted">
            {({ open }) => (
                <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                            <Logo height="40" width="40" /> 
                        </div>
                        <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    props.current_tab == item.name
                                    ? 'border-skin-light text-skin-base'
                                    : 'border-transparent text-skin-light hover:border-skin-light hover:text-skin-base',
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
                            href='/' 
                            onClick={signOut}
                            className='border-transparent text-skin-light hover:border-skin-light hover:text-skin-base inline-flex items-center px-1 pt-6 pb-5 border-b-2 text-sm font-medium'
                        >
                            Sign out
                        </Link>
                        
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-skin-inverted p-2 text-skin-light hover:bg-skin-secondary hover:text-skin-light focus:outline-none">
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
                    <div className="border-t border-skin-secondary-hover pt-4 pb-3">
                    
                    <div className="space-y-1">
                        <Link href='/' onClick={signOut} className='block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-skin-light hover:bg-skin-secondary hover:border-skin-light hover:text-skin-base'>Sign out</Link>
                    </div>
                    </div>
                </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    ) : null
}