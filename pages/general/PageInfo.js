import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function PageInfo(props) {

    const [open, setOpen] = useState(false)    

    return props.firstLine && props.title ? (
        <>
        
            <button
                type="button"
                className={`items-center ${props.noBorder ? 'text-skin-muted hover:text-skin-light' : 'rounded-md border border-skin-secondary-button-border text-skin-light bg-skin-secondary hover:bg-skin-secondary-hover '} px-3 py-2 text-sm font-medium focus:outline-none`}
                onClick={() => setOpen(true)}
            >
                <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>

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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-skin-inverted px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mt-3 sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-skin-base text-center">
                                            {props.title}
                                            </Dialog.Title>
                                            <div className="mt-4">

                                                <p className="text-sm mb-2 text-skin-light">
                                                    {props.firstLine}
                                                </p>

                                                {props.secondLine 
                                                    ?   <p className="text-sm text-skin-light">
                                                            {props.secondLine}

                                                            {props.externalHref 
                                                                ? <Link className='ml-1 text-sm text-skin-brand hover:text-skin-brand-hover' target='_blank' href={props.externalHref}>sanbenitopaper.com</Link> 
                                                                : null 
                                                            }
                                                            
                                                        </p>
                                                    :   null
                                                }

                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-skin-brand-button-border bg-skin-brand-light px-4 py-2 text-base font-medium text-skin-brand-hover shadow-sm hover:bg-skin-brand-light-hover focus:outline-none sm:text-sm"
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
        <button
            type="button"
            className="inline-flex items-center rounded-md border bg-gray-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-gray-100 focus:outline-none"
        >
            <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />
        </button>
    </div>
}
