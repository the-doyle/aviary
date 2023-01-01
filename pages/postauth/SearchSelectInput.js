import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchSelectInput(props) {
    const [query, setQuery] = useState('')
    const [selectedAccount, setSelectedAccount] = useState(props.selected ? props.selected : null)

    const filteredAccounts =
        props.assets 
            ? query === ''
                ? props.assets
                : props.assets.filter((asset) => {
                    return asset.name.toLowerCase().includes(query.toLowerCase())
                })
            : null

    return props.assets ? (
        <Combobox as="div" value={selectedAccount} onChange={setSelectedAccount}>
            <div className="relative mt-1">
                <Combobox.Input
                    className="w-full rounded-md border border-slate-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600 sm:text-sm"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(account) => account?.name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredAccounts.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredAccounts.map((account) => (
                    <Combobox.Option
                        key={account.id}
                        value={account}
                        className={({ active }) =>
                        classNames(
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                            active ? 'bg-slate-600 text-white' : 'text-gray-900'
                        )
                        }
                    >
                        {({ active, selected }) => (
                        <>
                            <span className={classNames('block truncate', selected && 'font-semibold')}>{account.name}</span>

                            {selected && (
                            <span
                                className={classNames(
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                active ? 'text-white' : 'text-slate-600'
                                )}
                            >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            )}
                        </>
                        )}
                    </Combobox.Option>
                    ))}
                </Combobox.Options>
                )}
            </div>
        </Combobox>
    ) : null
}
