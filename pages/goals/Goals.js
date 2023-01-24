import { useState } from "react";
import { ArrowPathIcon, PlusIcon, CheckBadgeIcon, FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import UpcomingGoals from './UpcomingGoals'
import Calendar from "./Calendar";

//#region helper functions

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

export default function Goals2() {
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
        <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Upcoming goals</h2>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                <UpcomingGoals assetGoals={assetGoals} assets={assets} liabilityGoals={liabilityGoals} liabilities={liabilities} /> 
                <Calendar /> 
            </div>
        </div>
    )
}