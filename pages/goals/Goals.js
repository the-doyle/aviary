import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import UpcomingGoals from './UpcomingGoals'
import Calendar from "./Calendar";

export default function Goals(props) {
    const supabase = useSupabaseClient() 

    //#region state variables
    const [accounts, setAccounts] = useState(null);
    const [goals, setGoals] = useState(null)
    const [yearlyGoals, setYearlyGoals] = useState(null)
    const [year, setYear] = useState(new Date().getFullYear())
    const refreshUser = props.refreshUser ? props.refreshUser : null 

    const changeYear = (newYear) => {
        setYear(newYear)
    } 
    //#endregion
    
    //#region goal functions
    const getAccounts = async () => {
        const {data: getAccountsData, error: getAccountsError} = await supabase
            .rpc('get_accounts_with_initial_balance', { 'a_id': props.user.id });

        setAccounts(getAccountsData)
    }

    const getGoals = async () => {
        const {data: getGoalsData, error: getGoalsError} = await supabase
            .rpc('goals_with_account_details', { 'u_id': props.user.id, 'year': year });

        setGoals(getGoalsData)
    }

    const getYearlyGoals = async () => {
        const {data: getYearlyGoalsData, error: getYearlyGoalsError} = await supabase
            .rpc('yearly_goal_counts', { 'u_id': props.user.id });

        setYearlyGoals(getYearlyGoalsData)
    }

    const refreshGoals = async () => {
        getGoals() 
        getYearlyGoals() 
        refreshUser() 
    }
    //#endregion

    useEffect(() => {
        if (props.user) {
            getAccounts() 
        }
    }, [props.user])

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
                    null
                } 
            </div>
        </div>
    )
}