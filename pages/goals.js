import PostAuthNav from "./postauth/PostAuthNav"
import PreAuthFooter from "./preauth/PreAuthFooter"
import Goals from './goals/Goals'
import PageInfo from './general/PageInfo'
import Achievements from "./achievements/Achievements";

import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";

export default function GoalsPage() {

    const user = useUser() 
    const supabase = useSupabaseClient() 
    const router = useRouter() 
    const [userData, setUserData] = useState(null)
    
    const getUserData = async () => {
        const {data: userData, error: userError} = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .limit(1)
            .single()
        
        setUserData(userData)
    }

    useEffect(() => {
        if (user && supabase) {
            getUserData() 
        } else {
            router.push('sign-in')
        }
    }, [user, supabase])


    return (
        <>
            <PostAuthNav current_tab='Goals' />

            <div className="pt-10 lg:pt-20 pb-20 lg:pb-60 min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <main>
                    <div className='flex gap-3 justify-end mb-10'>
                        <Achievements user={userData} refreshUser={getUserData} /> 
                        <PageInfo 
                            title='Check in every month'
                            firstLine='Aviary provides a simple interface for tracking your assets and liabilities.' 
                            secondLine='Come back monthly to update your balances.'
                        />
                    </div>

                    <Goals user={userData} refreshUser={getUserData}/>
                </main>
            </div>

            <PreAuthFooter /> 
        </>
    )
}
