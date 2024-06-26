import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function Modal(props) {
    const handleOpen = props.handleOpen ? props.handleOpen : null 

    return props.message && props.buttonText && props.title && props.handleOpen && props.open ? (
        <>
            <Transition.Root show={props.open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => handleOpen(false)}>
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
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-skin-brand-light">
                                            <CheckIcon className="h-6 w-6 text-skin-brand-hover" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-skin-base text-center">
                                                {props.title}
                                            </Dialog.Title>
                                            <div className="mt-4">
                                                <p className="text-sm text-skin-light">
                                                    {props.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-skin-brand px-4 py-2 text-base font-medium text-skin-inverted shadow-sm hover:bg-skin-brand-hover focus:outline-none sm:text-sm"
                                            onClick={() => handleOpen(false)}
                                        >
                                            {props.buttonText}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    ) : null 
}
