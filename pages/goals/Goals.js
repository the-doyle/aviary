import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react";
import UpcomingGoals from './UpcomingGoals'
import Calendar from "./Calendar";

export default function Goals(props) {
    const supabase = useSupabaseClient() 

    //#region state variables
    const [accounts, setAccounts] = useState(null);
    const [goals, setGoals] = useState(null)
    const [allGoals, setAllGoals] = useState(null)
    const [yearlyGoals, setYearlyGoals] = useState(null)
    const [year, setYear] = useState(new Date().getFullYear())
    const [showEmptyState, setShowEmptyState] = useState(false)
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

    const getAllGoals = async () => {
        const {data: getAllGoalsData, error: gettAllGoalsError} = await supabase
            .rpc('all_goals_with_account_details', { 'u_id': props.user.id });

        setAllGoals(getAllGoalsData)
    }

    const getYearlyGoals = async () => {
        const {data: getYearlyGoalsData, error: getYearlyGoalsError} = await supabase
            .rpc('yearly_goal_counts', { 'u_id': props.user.id });

        setYearlyGoals(getYearlyGoalsData)
        setShowEmptyState(true)
    }

    const refreshGoals = async () => {
        getGoals() 
        getAllGoals() 
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
            getGoals()
            getAllGoals()
            getYearlyGoals() 
        }

    }, [accounts, year])

    return accounts && accounts.length > 0 ? (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
            <>
                <UpcomingGoals year={year} goals={goals} allGoals={allGoals} accounts={accounts} refreshGoals={refreshGoals} /> 
                <Calendar year={year} changeYear={changeYear} goals={goals} accounts={accounts} yearlyGoals={yearlyGoals}/> 
            </>
        </div>
    ) :  
        <div className={`
            transition-all duration-1000 col-span-12 flex flex-col gap-2 text-lg text-skin-muted font-medium mt-10 md:mt-20 place-items-center justify-center h-40 sm:h-60 lg:h-80 rounded-lg bg-skin-secondary-hover
            ${showEmptyState ? 'opacity-100' : 'opacity-0'}
       `}>
            <h1 className='text-center'>Goals in Aviary are tied directly to assets or liabilities.</h1>
            <h1 className='text-center'>After adding your first account, come back to create your first goal! </h1>
        </div>
} 
       
