import { useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import GoalProgressBar from "./GoalProgressBar";
import NewGoal from './NewGoal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import DeleteGoal from './DeleteGoal';
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

const calculateProgress = (goal) =>  {
    let progress = 0
    if (goal.class === 'asset') {
        if (goal.balance === goal.target_balance) {
            progress = 100
        } else {
            progress = (goal.balance / goal.target_balance) * 100
        }
    } else {
        if (goal.balance > goal.initial_balance) {
            progress = 0
        } else if (goal.balance < goal.target_balance) {
            progress = 100 
        } else {
            progress = (goal.initial_balance - goal.balance) / (goal.initial_balance - goal.target_balance) * 100
        }
    }
    
    return progress > 100 ? 100 : progress < 10 ? 10 : progress
}
//#endregion

export default function UpcomingGoals(props) {
    const supabase = useSupabaseClient() 
    const [open, setOpen] = useState(false)

    const refreshGoals = props.refreshGoals ? props.refreshGoals : null 
    
    const handleOpen = () => {
        setOpen(!open)
    }

    const deleteGoal = async (id) => {
        const {data: deleteGoalData, error: deleteGoalError} = await supabase 
            .from('goals')
            .delete()
            .eq('id', id)
            .select() 

        return deleteGoalData
    }

    return props.goals && props.accounts && props.year ? (
        <div className='lg:col-span-7 xl:col-span-8'>

            <div className='mb-10'>
                <NewGoal open={open} handleOpen={handleOpen} accounts={props.accounts} refreshGoals={refreshGoals} /> 

                <div className='flex justify-between mb-2'>
                    <h1 className="inline-flex items-center text-2xl font-semibold text-slate-800 mb-5">{props.year} goals</h1>
                    <button
                            type="button"
                            className="flex place-items-center text-sm font-medium text-slate-600 hover:text-slate-800 focus:outline-none"
                            onClick={handleOpen}
                        >
                            New goal
                            <PlusCircleIcon className='h-5 w-5 ml-2' />
                    </button>
                </div>

                {props.goals && props.goals.length > 0 ? 
                    props.goals
                    .map((goal) => (
                        <div 
                            key={goal.id} 
                            className='relative flex space-x-6 xl:static px-2 py-4 bg-white border-t border-slate-200'
                        >
                            <div className="flex-auto">
                                {goal.class === 'asset' 
                                    ? <h3 className="pr-10 font-medium text-sky-500 xl:pr-0 text-lg">
                                        {goal.goal_name}
                                        {goal.balance >= goal.target_balance ? <span className='pl-2'>🎉</span> : null}
                                    </h3>
                                    : <h3 className="pr-10 font-medium text-violet-500 xl:pr-0 text-lg">
                                        {goal.goal_name}
                                        {goal.balance <= goal.target_balance ? <span className='pl-2'>🎉</span> : null}
                                    </h3>
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
                                            {formatAsCurrency.format(goal.balance)}
                                            <span className='px-1 md:px-2 font-serif font-bold text-black'>&rarr;</span>
                                            {formatAsCurrency.format(goal.target_balance)}
                                        </dd>
                                    </div>
                                    <GoalProgressBar progress={calculateProgress(goal)} goal={goal} class={goal.class} />
                                </dl>
                            </div>
                            <div className='flex-col'>
                                <EditGoal accounts={props.accounts} goal={goal} refreshGoals={refreshGoals} /> 
                                <DeleteGoal deleteAccount={deleteGoal} account={goal} refreshGoals={refreshGoals} />
                            </div>
                        </div>
                    )) 
                    : <div className='flex flex-col gap-5 place-content-center place-items-center h-40 sm:h-80 text-gray-400 rounded-lg bg-slate-100'>
                        <h1 className='text-base'>You don&apos;t have any {props.year} goals yet </h1>
                    </div>
                }          
            </div>
        </div>
    ) : null 
}
