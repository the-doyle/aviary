import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import AccountSelect from './AccountSelect'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const formatAsCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const getAccountBalanceForId = (id, accounts) =>  {
    return formatAsCurrency.format(accounts.find(x => x.id === id).balance)
}

export default function EditGoal(props) {
    const supabase = useSupabaseClient() 

    const [open, setOpen] = useState(false)
    const refreshGoals = props.refreshGoals ? props.refreshGoals : null 

    const [account, setAccount] = useState(props.goal ? props.goal.account_id : null)
    const handleAccount = (id) => {
        setAccount(id)
    }
    
    const [name, setName] = useState(props.goal ? props.goal.goal_name : null)
    const [date, setDate] = useState(props.goal ? props.goal.target_date : null) 
    const [balance, setBalance] = useState(props.goal ? props.goal.target_balance : null)

    const handleBalanceChange = (value) => {
        let strippedValue = 0
        if (value && value != '$') {
            strippedValue = value.replace("$", "")
            strippedValue = strippedValue.replaceAll(',', '')
        } else {
            strippedValue = 0
        }
        
        if (isNaN(strippedValue)) {
            setBalance(0)
        } else {
            setBalance(strippedValue)
        }
    }

    const saveGoal = async (e) => {
        e.preventDefault() 

        const data = {
            id: props.goal.id, 
            name: name,
            target_date: date,
            target_balance: balance,
            account_id: account
        }

        const {data: saveGoalData, error: saveGoalError} = await supabase
            .from('goals')
            .upsert(data)

        // console.log(saveGoalError)
        refreshGoals() 

        setOpen(false) 
    }

    return props.accounts && props.goal ? (
        <>
            <button 
                className="text-skin-muted hover:text-skin-light"
                onClick={() => setOpen(!open)}
            >
                <PencilSquareIcon className='h-5'/>
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setOpen(!open)}>
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-skin-inverted px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mt-3">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-skin-base text-center">
                                                {name ? name : "Goal name"}
                                            </Dialog.Title>
                                            <div className="mt-4">
                                                <div className='pb-4'>
                                                    <AccountSelect accounts={props.accounts} handleAccount={handleAccount} /> 
                                                </div>
                                                <div className='pb-4'>
                                                    <label htmlFor="text" className="block text-sm font-medium text-skin-light">
                                                        Goal name
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        className="block w-full rounded-md border-skin-muted shadow-sm focus:border-skin-brand focus:ring-skin-brand sm:text-sm"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='pb-4'>
                                                    <label htmlFor="text" className="block text-sm font-medium text-skin-light">
                                                        Target balance
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                        type="text"
                                                        name="target_balance"
                                                        id="target_balance"
                                                        className="block w-full rounded-md border-skin-muted shadow-sm focus:border-skin-brand focus:ring-skin-brand sm:text-sm"
                                                        value={formatAsCurrency.format(balance)}
                                                        onChange={(e) => handleBalanceChange(e.target.value)}
                                                        />
                                                        <p className='mt-1 text-xs text-slate-400'>Current balance: {getAccountBalanceForId(account, props.accounts)}</p>
                                                    </div>
                                                </div>
                                                <div className='pb-4'>
                                                    <label htmlFor="date" className="block text-sm font-medium text-skin-light">
                                                        Target date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="target_date"
                                                        id="target_date"   
                                                        className="block w-full border-0 border-b border-transparent focus:border-transparent focus:ring-0 text-sm text-skin-light focus:text-skin-base"
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                    /> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 flex items-right gap-5">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-skin-secondary-button-border bg-skin-secondary px-4 py-2 text-base font-medium text-skin-base shadow-sm hover:bg-skin-secondary-hover focus:outline-none sm:text-sm"
                                            onClick={() => setOpen(!open)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-skin-brand-button-border bg-skin-brand-light px-4 py-2 text-skin-brand-hover font-medium text-base shadow-sm hover:bg-skin-brand-light-hover focus:outline-none sm:text-sm"
                                            onClick={saveGoal}
                                        >
                                            Update goal
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
