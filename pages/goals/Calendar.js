import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CheckCircleIcon,
} from '@heroicons/react/20/solid'
import { MinusCircleIcon } from '@heroicons/react/24/outline'

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
    const today = new Date()
    const changeYear = props.changeYear ? props.changeYear : null 

    const filterGoals = (month) => {
        return function(goal) {
            const date = new Date(goal.target_date)
            return date.getMonth() == month && date.getFullYear() == props.year
        }
    }

    return props.goals && props.accounts && props.changeYear && props.year && props.yearlyGoals ? (
        <>
        <div className="mt-10 lg:mt-0 lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9 transition-all">

            <div className='border border-dashed border-slate-300 rounded-lg p-2'>
                <div className="flex items-center text-gray-900">
                    <button
                    type="button"
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    onClick={() => changeYear(props.year - 1)}
                    >
                        <span className="sr-only">Previous year</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <div className="flex-auto font-semibold text-center">{props.year}</div>
                    <button
                        type="button"
                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        onClick={() => changeYear(props.year + 1)}
                    >
                        <span className="sr-only">Next year</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <div className="mt-6 flex text-xs leading-6 text-gray-500 text-left">
                    <div className='flex-col'>
                        {months.map((month) => (
                            <div key={month.id} className={month.id === today.getUTCMonth() && props.year == today.getFullYear() ? 'text-black font-semibold underline underline-offset-2' : null}>{month.name}</div>
                        ))}
                    </div>
                    <div className='mt-0.5'>
                        <div className='flex-col gap-1 items-start'>
                            {months.map((month) => (
                                <div key={month.id} className='flex mb-1 gap-2'>
                                    <CheckCircleIcon className='h-5 text-white' />
                                    {props.goals
                                        .filter(filterGoals(month.id))
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

            <div className='mt-5 grid grid-cols-2 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 gap-3'>
                {props.yearlyGoals.map((year) => (
                    <button 
                        key={year.year} 
                        className={`
                            relative flex w-full items-center gap-5 xl:static p-2 border
                            ${year.year === props.year ? 'border-slate-800 hover:border-slate-500' : 'border-dashed border-slate-300 hover:border-slate-500'}
                            rounded-lg mb-3`}
                        onClick={() => props.changeYear(year.year)}
                    >
                        <h1 className='text-slate-800 text-sm'>
                            {year.year} 
                        </h1>
                        <div className='flex overflow-hidden'>
                            {[...Array(year.num_goals)].map((e, i) => 
                                <svg key={i} className="mx-0.5 h-2 w-2 text-slate-400" fill="currentColor" viewBox="0 0 8 8">
                                    <circle cx={4} cy={4} r={3} />
                                </svg>
                            )}
                        </div>
                    </button>
                ))}
            </div>

        </div>
        </>
    ) : null
}
