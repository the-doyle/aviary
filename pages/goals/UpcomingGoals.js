import { Fragment, useState } from 'react'
import { PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import GoalProgressBar from "./GoalProgressBar";
import NewGoal from './NewGoal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import DeleteButton from '../postauth/DeleteButton';
import EditGoal from './EditGoal';

//#region helper functions
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

const calculateProgress = (goal, accounts) =>  {
    const account = accounts.find(x => x.id === goal.account_id)

    if (account.class === 'asset') {
        const progress = (account.balance / goal.target_balance) * 100
        return progress > 100 ? 100 : progress.toFixed(0)
    } else {
        if (account.balance > account.initial_balance) {
            return 0
        } else if (account.balance < goal.target_balance) {
            return 100 
        }
        const progress = (account.initial_balance - account.balance) / (account.initial_balance - goal.target_balance) * 100
        return progress.toFixed(0) 
    }
}

const getAccountForGoal = (goal, accounts) =>  {
    return formatAsCurrency.format(accounts.find(x => x.id === goal.account_id).balance)
}

const getClassForGoal = (goal, accounts) =>  {
    return accounts.find(x => x.id === goal.account_id).class
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
//#endregion

export default function UpcomingGoals(props) {
    const supabase = useSupabaseClient() 
    const [open, setOpen] = useState(false) 
    
    const handleOpen = () => {
        setOpen(!open)
    }

    const deleteGoal = async (id) => {
        const {data: deleteGoalData, error: deleteGoalError} = await supabase 
            .from('goals')
            .delete()
            .eq('id', id)
    }

    return props.goals && props.accounts ? (
        <div className='lg:col-span-7 xl:col-span-8'>

            <NewGoal open={open} handleOpen={handleOpen} accounts={props.accounts} /> 

            <div className='flex justify-between mb-2'>
                <h1 className="inline-flex items-center text-xl font-semibold text-slate-800 mb-5">Upcoming goals</h1>
                <button
                        type="button"
                        className="flex place-items-center text-sm font-medium text-slate-600 hover:text-slate-800 focus:outline-none"
                        onClick={handleOpen}
                    >
                        New goal
                        <PlusCircleIcon className='h-5 w-5 ml-2' />
                </button>
            </div>

            {props.goals
                .map((goal) => (
                    <div key={goal.id} className="relative flex space-x-6 xl:static p-2 bg-white border border-dashed border-slate-300 rounded-lg mb-3 hover:border-slate-800">
                        <div className="flex-auto">
                            {getClassForGoal(goal, props.accounts) === 'asset' 
                                ? <h3 className="pr-10 font-medium text-sky-500 xl:pr-0 text-base">{goal.name}</h3>
                                : <h3 className="pr-10 font-medium text-violet-500 xl:pr-0 text-base">{goal.name}</h3>
                            }
                            <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row xl:justify-between xl:place-items-center text-sm">
                                <div className="xl:w-1/3 flex space-x-3">
                                    <dd>
                                        <time dateTime={goal.target_date}>
                                            {formatDateAsString(goal.target_date)}
                                        </time>
                                    </dd>
                                </div>
                                <div className="xl:w-1/3 mt-2 flex xl:mt-0">                                    
                                    <dd>
                                        {getAccountForGoal(goal, props.accounts)}
                                        <span className='px-1 md:px-2 font-serif font-bold text-black'>&rarr;</span>
                                        {formatAsCurrency.format(goal.target_balance)}
                                    </dd>
                                </div>
                                <GoalProgressBar progress={calculateProgress(goal, props.accounts)} goal={goal} class={getClassForGoal(goal, props.accounts)} />
                            </dl>
                        </div>
                        <div className='flex-col'>
                            <EditGoal accounts={props.accounts} goal={goal} /> 
                            <DeleteButton deleteAccount={deleteGoal} account={goal} />
                        </div>
                    </div>
            ))}        
        </div>
    ) : null 
}
