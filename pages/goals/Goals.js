import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import UpcomingGoals from './UpcomingGoals'
import Calendar from "./Calendar";

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
            .rpc('goals_with_account_details', { 'u_id': user.id, 'year': year });

        setGoals(getGoalsData)
    }

    const getYearlyGoals = async () => {
        const {data: getYearlyGoalsData, error: getYearlyGoalsError} = await supabase
            .rpc('yearly_goal_counts', { 'u_id': user.id });

        setYearlyGoals(getYearlyGoalsData)
    }

    const refreshGoals = async () => {
        getGoals() 
        getYearlyGoals() 
    }
    //#endregion

    useEffect(() => {
        if (user) {
            getAccounts() 
        }
    }, [user])

    useEffect(() => {
        if (accounts) {
            refreshGoals() 
        }
    }, [accounts, year])

    return (
        <div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                {accounts && accounts.length > 0 
                ? 
                    <>
                        <UpcomingGoals year={year} goals={goals} accounts={accounts} refreshGoals={refreshGoals} /> 
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