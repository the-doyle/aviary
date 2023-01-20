import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function AviaryInfo(props) {
    const supabase = useSupabaseClient() 
    const user = useUser() 

    const [open, setOpen] = useState(false)    
    const [userData, setUserData] = useState(null)

    const getUserData = async () => {
        const {data: userData, error: userError} = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .limit(1)
            .single()
        
        setUserData(userData)
    }

    useEffect(() => {
        if (supabase && user) {
            getUserData() 
        }
    }, [supabase, user])

    return userData && props.firstLine && props.title ? (
        <>
            <div className='flex gap-3 justify-end'>
                <Link className='flex rounded-md border bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm' href='/aviary'>
                    <p>{userData.feathers}🪶</p>
                </Link>

                <button
                    type="button"
                    className="inline-flex items-center rounded-md border bg-gray-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-gray-100 focus:outline-none"
                    onClick={() => setOpen(true)}
                >
                    <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />
                    
                </button>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-center">
                                            {props.title}
                                            </Dialog.Title>
                                            <div className="mt-4">

                                                <p className="text-sm mb-2 text-gray-500">
                                                    {props.firstLine}
                                                </p>

                                                {props.secondLine 
                                                    ? <p className="text-sm text-gray-500">{props.secondLine}</p>
                                                    : null
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none sm:text-sm"
                                            onClick={() => setOpen(false)}
                                        >
                                            Got it!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        
        
        </>
    ) :
    <div className='flex gap-3 justify-end'>
        <Link className='flex rounded-md border bg-white px-3 py-2 text-sm font-medium text-white shadow-sm' href='/aviary'>
            <p>20🪶</p>
        </Link>

        <button
            type="button"
            className="inline-flex items-center rounded-md border bg-gray-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-gray-100 focus:outline-none"
        >
            <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />
        </button>
    </div>
}
