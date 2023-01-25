import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    CheckCircleIcon,
    circle
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

//#region helper functions
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const calculateProgress = (goal, accounts) =>  {
    const account = accounts.find(x => x.id === goal.account_id)

    if (account.class === 'asset') {
        const progress = (account.balance / goal.target_balance) * 100
        return {
            class: account.class,
            progress: progress > 100 ? 100 : progress.toFixed(0)
        }
    } else {
        if (account.balance > account.initial_balance) {
            return {
                class: account.class,
                progress: 0
            }
        } else if (account.balance < goal.target_balance) {
            return {
                class: account.class,
                progress: 100
            }
        }
        const progress = (account.initial_balance - account.balance) / (account.initial_balance - goal.target_balance) * 100
        return {
            class: account.class,
            progress: progress.toFixed(0)
        }
    }
}
//#endregion

const months = [
    {id: 0, name: 'Jan'},
    {id: 1, name: 'Feb'},
    {id: 2, name: 'Mar'},
    {id: 3, name: 'Apr'},
    {id: 4, name: 'May'},
    {id: 5, name: 'Jun'},
    {id: 6, name: 'Jul'},
    {id: 7, name: 'Aug'},
    {id: 8, name: 'Sep'},
    {id: 9, name: 'Oct'},
    {id: 10, name: 'Nov'},
    {id: 11, name: 'Dec'},
]


export default function Calendar(props) {
    const [year, setYear] = useState(2023)
    const today = new Date()

    const filterGoals = (month) => {
        return function(goal) {
            const date = new Date(goal.target_date)
            return date.getMonth() == month && date.getFullYear() == year
        }
    }

    return props.goals && props.accounts ? (
        <>
        <div className="mt-10 lg:mt-0 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9 transition-all">

            <div className='flex justify-end mb-5'>
                <Menu as="div" className="relative">
                    <Menu.Button
                        type="button"
                        className="flex items-center py-2 pl-3 pr-2 text-sm font-medium text-slate-600 hover:text-slate-800"
                        >
                        Year view
                        <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Year view
                                    </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Decade view
                                    </a>
                                    )}
                                </Menu.Item>
                           
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu> 
            </div>

            <div className='border border-dashed border-slate-300 rounded-lg p-2 mt-4'>
                
                <div className="flex items-center text-gray-900">
                    <button
                    type="button"
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    onClick={() => setYear(year - 1)}
                    >
                        <span className="sr-only">Previous year</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <div className="flex-auto font-semibold">{year}</div>
                    <button
                        type="button"
                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        onClick={() => setYear(year + 1)}
                    >
                        <span className="sr-only">Next year</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <div className="mt-6 flex text-xs leading-6 text-gray-500 text-left">
                    <div className='flex-col'>
                        {months.map((month) => (
                            <div key={month.id} className={month.id === today.getUTCMonth() && year == today.getFullYear() ? 'text-black font-semibold underline underline-offset-2' : null}>{month.name}</div>
                        ))}
                    </div>
                    <div className='mt-0.5'>
                        <div className='flex-col gap-1 items-start'>
                            {months.map((month) => (
                                <div key={month.id} className='flex mb-1 gap-2'>
                                    <CheckCircleIcon className='h-5 text-white' />
                                    {props.goals
                                        .filter(filterGoals(month.id))
                                        .sort((a, b) => (calculateProgress(a, props.accounts).progress < calculateProgress(b, props.accounts).progress) ? 1 : ((calculateProgress(b, props.accounts).progress < calculateProgress(a, props.accounts).progress) ? -1 : 0))
                                        .map((goal) => (
                                            calculateProgress(goal, props.accounts).progress < 100 
                                                ? <MinusCircleIcon key={goal.id} className={`mt-0.5 ml-0.5 h-4 text-white bg-white rounded-full border ${calculateProgress(goal, props.accounts).class === 'asset' ? 'border-sky-500' : 'border-violet-500'}`} />
                                                : <CheckCircleIcon key={goal.id} className={`h-5 text-slate-800 ${calculateProgress(goal, props.accounts).class === 'asset' ? 'text-sky-500' : 'text-violet-500'}`} />
                                            
                                        ))
                                    }
                                </div>
                            ))}
                            
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
        </>
    ) : null
}
