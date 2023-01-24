import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import GoalProgressBar from "./GoalProgressBar";

const formatAsCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const formatDateAsString = (d) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(d) 
    return date.toLocaleDateString("en-US", options)
}

const calculateAssetProgress = (goal, accounts) =>  {
    const balance = accounts.find(x => x.id === goal.asset_id).balance
    const progress = (balance / goal.target_balance) * 100
    return progress > 100 ? 100 : progress.toFixed(0)
}

const getAssetForGoal = (goal, accounts) =>  {
    return formatAsCurrency.format(accounts.find(x => x.id === goal.asset_id).balance)
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function UpcomingGoals(props) {
    return props.assetGoals && props.assets && props.liabilityGoals && props.liabilities ? (
        <ol className="divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
        {props.assetGoals.map((goal) => (
            <li key={goal.id} className="relative flex space-x-6 xl:static p-2 bg-slate-50 border rounded-lg">
                <div className="flex-auto">
                    <h3 className="pr-10 font-medium text-gray-900 xl:pr-0 text-base">{goal.name}</h3>
                    <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row xl:justify-between xl:place-items-center">
                        <div className="xl:w-1/3 flex space-x-3">
                            <dd>
                                <time dateTime={goal.target_date}>
                                    {formatDateAsString(goal.target_date)}
                                </time>
                            </dd>
                        </div>
                        <div className="xl:w-1/3 mt-2 flex xl:mt-0">                                    
                            <dd>
                                {getAssetForGoal(goal, props.assets)}
                                <span className='px-1 md:px-2'>/</span>
                                {formatAsCurrency.format(goal.target_balance)}
                            </dd>
                        </div>
                        <GoalProgressBar progress={calculateAssetProgress(goal, props.assets)} goal={goal} />
                    </dl>
                </div>
                <Menu as="div" className="absolute top-1 right-0 xl:relative xl:top-auto xl:right-auto">
                    <div>
                    <Menu.Button className="flex items-center rounded-full pl-4 py-1 pr-1 text-gray-500 hover:text-gray-600 focus:outline-none">
                        <span className="sr-only">Open options</span>
                        <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                    </div>

                    <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                Edit
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
                                Cancel
                            </a>
                            )}
                        </Menu.Item>
                        </div>
                    </Menu.Items>
                    </Transition>
                </Menu>
            </li>
        ))}
        </ol>
    ) : null 
}
