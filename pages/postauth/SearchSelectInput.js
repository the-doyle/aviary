import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchSelectInput(props) {
    const [query, setQuery] = useState('')
    const [selectedItem, setSelectedItem] = useState(props.selected ? props.selected : null)

    const handleChange = props.handleChange ? props.handleChange : null

    const setItem = (e) => {
        const value = e
        setSelectedItem(e)
        handleChange(e, props.name, props.id)
    }
    
    const filteredItems =
        props.items 
            ? query === ''
                ? props.items
                : props.items.filter((item) => {
                    return item.toLowerCase().includes(query.toLowerCase())
                })
            : null

    return props.items && props.handleChange && props.name ? (
        <Combobox as="div" value={selectedItem} onChange={(e) => setItem(e)} disabled={props.disabled} >
            <div className="relative mt-1 pl-2">
                <Combobox.Input
                    className={`
                        w-full rounded-md border border-skin-secondary-button-border bg-skin-inverted py-2 px-3 focus:border-skin-light focus:outline-none focus:ring-1 focus:ring-skin-light text-sm truncate
                        disabled:bg-skin-secondary disabled:text-skin-muted
                    `}
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(item) => item}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className={`h-5 w-5 ${props.disabled ? 'bg-skin-secondary text-skin-muted' : 'bg-skin-inverted text-skin-light'}`} aria-hidden="true" />
                </Combobox.Button>

                {filteredItems.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-skin-secondary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
                    {filteredItems.map((item) => (
                    <Combobox.Option
                        key={item}
                        value={item}
                        className={({ active }) =>
                        classNames(
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                            active ? 'bg-skin-light text-skin-inverted' : 'text-skin-base'
                        )
                        }
                    >
                        {({ active, selected }) => (
                        <>
                            <span className={classNames('block truncate', selected && 'font-semibold')}>{item}</span>

                            {selected && (
                            <span
                                className={classNames(
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                active ? 'text-skin-inverted' : 'text-skin-light'
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
