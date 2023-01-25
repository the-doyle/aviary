import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AccountSelect(props) {
    const [selected, setSelected] = useState(props.accounts[0])
    const handleAccount = props.handleAccount ? props.handleAccount : null 

    const setItem = (e) => {
        setSelected(e)
        handleAccount(e.id)
    }

    return (
        <Listbox value={selected} onChange={(e) => setItem(e)}>
        {({ open }) => (
            <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">Account</Listbox.Label>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>

                <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {props.accounts.map((account) => (
                    <Listbox.Option
                        key={account.id}
                        className={({ active }) =>
                        classNames(
                            active ? 'text-white bg-slate-600' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-8 pr-4'
                        )
                        }
                        value={account}
                    >
                        {({ selected, active }) => (
                        <>
                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate flex gap-3')}>
                                {account.name}
                                <span className={classNames(account.class === 'liability' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800', 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium')}>
                                    {account.class}
                                </span>
                                
                            </span>

                            {selected ? (
                            <span
                                className={classNames(
                                active ? 'text-white' : 'text-slate-600',
                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                )}
                            >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            ) : null}
                        </>
                        )}
                    </Listbox.Option>
                    ))}
                </Listbox.Options>
                </Transition>
            </div>
            </>
        )}
        </Listbox>
    )
}
