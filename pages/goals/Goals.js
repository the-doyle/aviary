import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@supabase/auth-helpers-react";
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

export default function Goals() {
    const supabase = useSupabaseClient() 
    const user = useUser()    

    //#region state variables
    const [accounts, setAccounts] = useState(null);
    const [goals, setGoals] = useState(null)
    const [yearlyGoals, setYearlyGoals] = useState(null)
    const [year, setYear] = useState(new Date().getFullYear())

    const changeYear = (newYear) => {
        setYear(newYear)
    } 
    //#endregion
    
    //#region goal functions
    const getAccounts = async () => {
        const {data: getAccountsData, error: getAccountsError} = await supabase
            .rpc('get_accounts_with_initial_balance', { 'a_id': user.id });

        setAccounts(getAccountsData)
    }

    const getGoals = async () => {
        const {data: getGoalsData, error: getGoalsError} = await supabase
            .rpc('goals_with_year', { 'u_id': user.id, 'year': year });

        setGoals(getGoalsData)
    }

    const getYearlyGoals = async () => {
        const {data: getYearlyGoalsData, error: getYearlyGoalsError} = await supabase
            .rpc('yearly_goal_counts', { 'u_id': user.id });

        setYearlyGoals(getYearlyGoalsData)
    }
    //#endregion

    useEffect(() => {
        if (user) {
            getAccounts() 
        }
    }, [user])

    useEffect(() => {
        if (accounts) {
            getGoals()
            getYearlyGoals() 
        }
    }, [accounts, goals, year])

    return (
        <div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                {accounts && accounts.length > 0 
                ? 
                    <>
                        <UpcomingGoals year={year} goals={goals} accounts={accounts} /> 
                        <Calendar year={year} changeYear={changeYear} goals={goals} accounts={accounts} yearlyGoals={yearlyGoals}/> 
                    </>
                : 
                    <div className='col-span-12 flex flex-col gap-5 place-content-center place-items-center h-40 sm:h-80 text-gray-400 rounded-lg bg-slate-100'>
                        <h1 className='text-base'>Add at least 1 account to get started with goals</h1>
                    </div>
                } 
            </div>
        </div>
    )
}