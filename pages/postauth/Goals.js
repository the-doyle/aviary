import { useState } from "react";
import { ArrowPathIcon, PlusIcon, CheckBadgeIcon, FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@supabase/auth-helpers-react";
import GoalSearchSelectInput from "./GoalSearchSelectInput";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import LoadingTableBody from "./LoadingTableBody";
import EmptyTableBody from "./EmptyTableBody";
import DeleteButton from "./DeleteButton";
import GoalProgressBar from "./GoalProgressBar";

//#region helper functions
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function sumData(data) {
    let summedData = 0

    for (let i = 0; i < data.length; i++) {
        summedData += parseInt(data[i].target_balance)
    }

    return summedData
}

function getDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

function calculateProgress(goal, accounts) {
    const balance = accounts.find(x => x.id === goal.asset_id).balance
    const progress = (balance / goal.target_balance) * 100
    return progress > 100 ? 100 : progress.toFixed(0)
}

function calculateLiabilityProgress(goal, accounts) {
    const account = accounts.find(x => x.id === goal.liability_id)
    if (account.balance > account.initial_balance) {
        return 0
    } else if (account.balance < goal.target_balance) {
        return 100 
    }
    const progress = (account.initial_balance - account.balance) / (account.initial_balance - goal.target_balance) * 100
    return progress.toFixed(0)
}

//#endregion

export default function Goals() {
    const supabase = useSupabaseClient() 
    const user = useUser()

     //#region state variables
     const [assets, setAssets] = useState(null);
     const [assetGoals, setAssetGoals] = useState(null)

     const [liabilities, setLiabilities] = useState(null);
     const [liabilityGoals, setLiabilityGoals] = useState(null)
     //#endregion
    
    //#region asset_goal functions
    const getAssets = async () => {
        const {data: getAssetsData, error: getAssetsError} = await supabase
            .from('assets')
            .select('id, name, balance')
            .eq('user_id', user.id)

            setAssets(getAssetsData)
    }

    const getAssetById = (id) => {
        for (let i = 0; i < assets.length; i++) {
            if (assets[i].id === id) {
                return assets[i]
            }
        }
    }

    const getAssetGoals = async () => {
        const {data: getAssetGoalsData, error: getAssetGoalsError} = await supabase
            .from('asset_goals')
            .select('*')
            .in('asset_id', assets.map(a => a.id))
            .order('target_balance', { ascending: false })

        setAssetGoals(getAssetGoalsData)
    }

    const addAssetGoal = async () => {
        setAssetGoals([
            ...assetGoals,
            {
                id: uuidv4(), 
                asset_id: assets && assets.length > 0 ? assets[0].id : "", 
                name: "New asset goal", 
                target_date: getDate(),
                target_balance: assets && assets.length > 0 ? assets[0].balance * 2 : 0, 
            },
        ]);
    };

    const saveAssetGoals = async () => {
        setSaveAssetGoalsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full animate-spin'/>,
            text: 'Saving'
        })

        const { data: upsertAssetGoalsData, error: upsertAssetGoalsError } = await supabase
            .from('asset_goals')
            .upsert(assetGoals)

        setSaveAssetGoalsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <CheckBadgeIcon className='ml-1 h-4 rounded-full'/>,
            text: 'Done'
        })

        await timeout(2000);

        setSaveAssetGoalsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>,
            text: 'Save'
        })
    }
    
    const editAssetGoal = (e, id) => {
        const { name, value } = e.target
        const list = [...assetGoals]
        let strippedValue = value

        if (name == "target_balance") {
            if (value && value != '$') {
                strippedValue = value.replace("$", "")
                strippedValue = strippedValue.replaceAll(',', '')
            } else {
                strippedValue = 0
            }
        }

        for (let i=0; i<list.length; i++) {
            if (list[i].id == id) {
                list[i][name] = strippedValue
                break
            }
        }
    
        setAssetGoals(list);
    };

    const editAssetGoalAccount = (value, name, id) => {

        const list = [...assetGoals]
        for (let i=0; i<list.length; i++) {
            if (list[i].id == id) {
                list[i][name] = value
                break
            }
        }
        setAssetGoals(list)
    };

    const deleteAssetGoal = async (id) => {
        const list = [...assetGoals];

        for (let i=0; i<list.length; i++) {
            if (list[i].id == id) {
                list.splice(i, 1);
                break
            }
        }

        setAssetGoals(list);

        const { data: deleteAssetGoalData, error: deleteAssetGoalError } = await supabase
            .from('asset_goals')
            .delete()
            .eq('id', id)
    };
    //#endregion
    
    //#region liability_goal functions
    const getLiabilities = async () => {
        const {data: getLiabilitiesData, error: getLiabilitiesError} = await supabase
            .rpc('get_liabilities_with_initial_balance', { 'user_id': user.id });

        setLiabilities(getLiabilitiesData)
    }

    const getLiabilityById = (id) => {
        for (let i = 0; i < liabilities.length; i++) {
            if (liabilities[i].id === id) {
                return liabilities[i]
            }
        }
    }

    const getLiabilityGoals = async () => {
        const {data: getLiabilityGoalsData, error: getLiabilityGoalsError} = await supabase
            .from('liability_goals')
            .select('*')
            .in('liability_id', liabilities.map(a => a.id))
            .order('target_balance', { ascending: false })

        setLiabilityGoals(getLiabilityGoalsData)
    }

    const addLiabilityGoal = async () => {
        setLiabilityGoals([
            ...liabilityGoals,
            {
                id: uuidv4(), 
                liability_id: liabilities && liabilities.length > 0 ? liabilities[0].id : "", 
                name: "New liability goal", 
                target_date: getDate(),
                target_balance: 0, 
                initial_balance: liabilities[0].balance
            },
        ]);
    };

    const saveLiabilityGoals = async () => {
        setSaveLiabilityGoalsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full animate-spin'/>,
            text: 'Saving'
        })

        const { data: upsertLiabilityGoalsData, error: upsertLiabilityGoalsError } = await supabase
            .from('liability_goals')
            .upsert(liabilityGoals)

        setSaveLiabilityGoalsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <CheckBadgeIcon className='ml-1 h-4 rounded-full'/>,
            text: 'Done'
        })

        await timeout(2000);

        setSaveLiabilityGoalsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>,
            text: 'Save'
        })
    }

    const editLiabilityGoal = (e, id) => {
        const { name, value } = e.target
        const list = [...liabilityGoals]
        let strippedValue = value

        if (name == "target_balance") {
            if (value && value != '$') {
                strippedValue = value.replace("$", "")
                strippedValue = strippedValue.replaceAll(',', '')
            } else {
                strippedValue = 0
            }
        }

        for (let i=0; i<list.length; i++) {
            if (list[i].id == id) {
                list[i][name] = strippedValue
                break
            }
        }

        setLiabilityGoals(list);
    };

    const editLiabilityGoalAccount = (value, name, id) => {

        const list = [...liabilityGoals]
        for (let i=0; i<list.length; i++) {
            if (list[i].id == id) {
                list[i][name] = value
                break
            }
        }
        setLiabilityGoals(list)
    };

    const deleteLiabilityGoal = async (id) => {
        const list = [...liabilityGoals];

        for (let i=0; i<list.length; i++) {
            if (list[i].id == id) {
                list.splice(i, 1);
                break
            }
        }

        setLiabilityGoals(list);

        const { data: deleteLiabilityGoalData, error: deleteLiabilityGoalError } = await supabase
            .from('liability_goals')
            .delete()
            .eq('id', id)
    };
    //#endregion

    //#region secondary state variables
    const [saveAssetGoalsButton, setSaveAssetGoalsButton] = useState({
        className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
        icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>,
        text: 'Save'
    })

    const [saveLiabilityGoalsButton, setSaveLiabilityGoalsButton] = useState({
        className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
        icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>,
        text: 'Save'
    })
    //#endregion

    useEffect(() => {
        if (user) {
            getAssets() 
            getLiabilities()
        }
    }, [user])

    useEffect(() => {
        if (assets) {
            getAssetGoals()
        }

        if (liabilities) {
            getLiabilityGoals()
        }
    }, [assets, liabilities])

    return (
        <>
            <div id='asset_goals' className='col-span-5 lg:col-span-3'>
                <h1 className="inline-flex items-center text-xl font-semibold text-slate-300">Asset goals</h1>
                <div className="mt-6 flex flex-col p-3 -mx-3 shadow rounded-lg">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full pb-2 align-middle px-4 md:px-6 lg:px-8">
                            <table className="min-w-full">
                                <thead className='border-b border-slate-300'>
                                    <tr className='text-sm text-slate-500'>
                                        <th scope="col" className="py-2 pr-1.5 text-left">
                                            <span className='inline-flex'>
                                                Name
                                            </span>
                                        </th>
                                        <th scope="col" className="py-2 text-left">
                                            <span className='inline-flex'>
                                                Account
                                            </span>
                                        </th>
                                        <th scope="col" className="py-2 pr-3 text-left">
                                            <span className='inline-flex'>
                                                Target date
                                            </span>
                                        </th>
                                        <th scope="col" className="py-2 pr-3 text-right">
                                            <span className='inline-flex'>
                                                Goal
                                            </span>
                                        </th>

                                        <th scope="col" className="py-2 pl-2">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-none">
                                {assetGoals && assetGoals.length > 0
                                    ? assetGoals
                                        .map((assetGoal) => (
                                            <tr key={assetGoal.id}>
                                                <td className="whitespace-nowrap py-3 text-sm text-slate-500">
                                                    <div className="relative mt-1 rounded-md">
                                                        <div className="mt-1 border-b border-slate-200 focus-within:border-slate-600">
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                id="name"   
                                                                className="block w-full border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                                value={assetGoal.name}
                                                                onChange={(e) => editAssetGoal(e, assetGoal.id)}
                                                            />  
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap py-2 text-sm text-slate-500">
                                                    <div className="relative mt-1 rounded-md">
                                                        <div className="mt-1 focus-within:border-slate-600">
                                                            <GoalSearchSelectInput 
                                                                handleChange={editAssetGoalAccount} 
                                                                items={assets} 
                                                                selected={getAssetById(assetGoal.asset_id)} 
                                                                id={assetGoal.id}
                                                                name='asset_id'
                                                            />  
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap pt-3 text-sm text-slate-500">
                                                    <div className="relative rounded-md">
                                                        <div className="">
                                                            <input
                                                                type="date"
                                                                name="target_date"
                                                                id="target_date"   
                                                                className="block w-full border-0 border-b border-transparent focus:border-transparent focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                                value={assetGoal.target_date}
                                                                onChange={(e) => editAssetGoal(e, assetGoal.id)}
                                                            />  
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap py-2 px-2 text-sm text-slate-500">
                                                    <div className="relative mt-1 rounded-md">
                                                        <div className="mt-1 border-b border-slate-200 focus-within:border-slate-600">
                                                            <input
                                                                type="text"
                                                                name="target_balance"
                                                                id="target_balance"
                                                                className="block w-full text-right border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                                value={assetGoal.target_balance ? formatter.format(assetGoal.target_balance) : formatter.format(0)}
                                                                onChange={(e) => editAssetGoal(e, assetGoal.id)}
                                                                min={0}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="relative whitespace-nowrap pt-1 pl-2 text-sm font-medium">
                                                    {assetGoal ? <DeleteButton deleteAccount={deleteAssetGoal} account={assetGoal} /> : null}
                                                </td>
                                            </tr>
                                )) : assetGoals 
                                    ? <EmptyTableBody message="No asset goals yet" icon={FaceFrownIcon} /> 
                                    : <LoadingTableBody /> 
                                }
                                </tbody>
                            </table>

                            {assetGoals && assetGoals.length > 0 
                                ? 
                                    <div className='flex justify-end text-sm text-slate-800 pr-12 mr-1 py-3'>
                                        <h1 className="font-medium">Total <span className='font-serif font-bold pl-1'>&rarr;</span></h1>
                                        <h1 className="pl-2 font-semibold">{formatter.format(sumData(assetGoals))}</h1>
                                    </div>
                                : null 
                            }

                            <div className="mt-4 text-right">
                                <button
                                type="button"
                                className={saveAssetGoalsButton.className}
                                onClick={saveAssetGoals}
                                >
                                    {saveAssetGoalsButton.text}
                                    {saveAssetGoalsButton.icon}
                                </button>
                                <button
                                type="button"
                                className="ml-2 group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none"
                                onClick={addAssetGoal}
                                >
                                    New
                                    <PlusIcon className='ml-1 h-4 rounded-full'/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id='asset_goals_breakdown' className='mt-6 lg:mt-20 col-span-5 lg:col-span-2 flex flex-col'>
                <div className='mt-1'>
                    {assetGoals && assets ?
                        assetGoals.map((goal) => (
                            <div key={goal.id} className='pb-1 mt-4 lg:mt-0'>
                                <GoalProgressBar progress={calculateProgress(goal, assets)} goal={goal} />
                            </div>
                        )) : null
                    }
                </div>
            </div>

            <div id='liability_goals' className='mt-16 col-span-5 lg:col-span-3'>
                <h1 className="inline-flex items-center text-xl font-semibold text-slate-300">Liability goals</h1>
                <div className="mt-6 flex flex-col p-3 -mx-3 shadow rounded-lg">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full pb-2 align-middle px-4 md:px-6 lg:px-8">
                            <table className="min-w-full">
                                <thead className='border-b border-slate-300'>
                                    <tr className='text-sm text-slate-500'>
                                        <th scope="col" className="py-2 pr-1.5 text-left">
                                            <span className=''>
                                                Name
                                            </span>
                                        </th>
                                        <th scope="col" className="py-2 text-left">
                                            <span className=''>
                                                Account
                                            </span>
                                        </th>
                                        <th scope="col" className="py-2 pr-3 text-left">
                                            <span className=''>
                                                Target date
                                            </span>
                                        </th>
                                        <th scope="col" className="py-2 pr-3 text-right">
                                            <span className=''>
                                                Goal
                                            </span>
                                        </th>

                                        <th scope="col" className="py-2 pl-2">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-none">
                                {liabilityGoals && liabilityGoals.length > 0
                                    ? liabilityGoals
                                        .map((liabilityGoal) => (
                                            <tr key={liabilityGoal.id}>
                                                <td className="whitespace-nowrap py-3 text-sm text-slate-500">
                                                    <div className="relative mt-1 rounded-md">
                                                        <div className="mt-1 border-b border-slate-200 focus-within:border-slate-600">
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                id="name"   
                                                                className="block w-full border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                                value={liabilityGoal.name}
                                                                onChange={(e) => editLiabilityGoal(e, liabilityGoal.id)}
                                                            />  
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap py-2 text-sm text-slate-500">
                                                    <div className="relative mt-1 rounded-md">
                                                        <div className="mt-1 focus-within:border-slate-600">
                                                            <GoalSearchSelectInput 
                                                                handleChange={editLiabilityGoalAccount} 
                                                                items={liabilities} 
                                                                selected={getLiabilityById(liabilityGoal.liability_id)} 
                                                                id={liabilityGoal.id}
                                                                name='liability_id'
                                                            />  
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap pt-3 text-sm text-slate-500">
                                                    <div className="relative rounded-md">
                                                        <div className="">
                                                            <input
                                                                type="date"
                                                                name="target_date"
                                                                id="target_date"   
                                                                className="block w-full border-0 border-b border-transparent focus:border-transparent focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                                value={liabilityGoal.target_date}
                                                                onChange={(e) => editLiabilityGoal(e, liabilityGoal.id)}
                                                            />  
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap py-2 px-2 text-sm text-slate-500">
                                                    <div className="relative mt-1 rounded-md">
                                                        <div className="mt-1 border-b border-slate-200 focus-within:border-slate-600">
                                                            <input
                                                                type="text"
                                                                name="target_balance"
                                                                id="target_balance"
                                                                className="block w-full text-right border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                                value={liabilityGoal.target_balance ? formatter.format(liabilityGoal.target_balance) : formatter.format(0)}
                                                                onChange={(e) => editLiabilityGoal(e, liabilityGoal.id)}
                                                                min={0}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="relative whitespace-nowrap pt-1 pl-2 text-sm font-medium">
                                                    {liabilityGoal ? <DeleteButton deleteAccount={deleteLiabilityGoal} account={liabilityGoal} /> : null}
                                                </td>
                                            </tr>
                                )) : liabilityGoals 
                                    ? <EmptyTableBody message="No liability goals yet" icon={FaceSmileIcon} /> 
                                    : <LoadingTableBody /> 
                                }
                                </tbody>
                            </table>

                            {liabilityGoals && liabilityGoals.length > 0 
                                ? 
                                    <div className='flex justify-end text-sm text-slate-800 pr-12 mr-1 py-3'>
                                        <h1 className="font-medium">Total <span className='font-serif font-bold pl-1'>&rarr;</span></h1>
                                        <h1 className="pl-2 font-semibold">{formatter.format(sumData(liabilityGoals))}</h1>
                                    </div>
                                : null 
                            }

                            <div className="mt-4 text-right">
                                <button
                                type="button"
                                className={saveLiabilityGoalsButton.className}
                                onClick={saveLiabilityGoals}
                                >
                                    {saveLiabilityGoalsButton.text}
                                    {saveLiabilityGoalsButton.icon}
                                </button>
                                <button
                                type="button"
                                className="ml-2 group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none"
                                onClick={addLiabilityGoal}
                                >
                                    New
                                    <PlusIcon className='ml-1 h-4 rounded-full'/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id='liability_goals_breakdown' className='mt-6 lg:mt-36 col-span-5 lg:col-span-2 flex flex-col'>
                <div className='mt-1'>
                    {liabilityGoals && liabilities ?
                        liabilityGoals.map((goal) => (
                            <div key={goal.id} className='pb-1 mt-4 lg:mt-0'>
                                <GoalProgressBar progress={calculateLiabilityProgress(goal, liabilities)} goal={goal} />
                            </div>
                        )) : null
                    }
                </div>
            </div>
        </>
    )
}