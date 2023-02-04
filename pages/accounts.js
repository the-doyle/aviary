import PostAuthNav from "./postauth/PostAuthNav"
import Accounts from './postauth/Accounts'
import PreAuthFooter from './preauth/PreAuthFooter'
import PageInfo from './general/PageInfo'
import Achievements from "./achievements/Achievements";

import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AccountsPage() {

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
        } 
    }, [user, supabase])

    return (
        <>
            <PostAuthNav current_tab='Accounts' />

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

                    <div className='grid grid-cols-4 gap-5 lg:gap-10 grid-flow-row'>
                        <Accounts user={userData} refreshUser={getUserData} />
                    </div>
                </main>
            </div>

            <PreAuthFooter /> 
        </>
    )
}
