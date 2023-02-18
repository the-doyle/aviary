import PostAuthNav from "./postauth/PostAuthNav"
import Accounts from './postauth/Accounts'
import PreAuthFooter from './preauth/PreAuthFooter'
import Achievements from "./achievements/Achievements";
import Tour from "./tour/Tour";

import { TourProvider } from '@reactour/tour'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

export default function AccountsPage() {
    const user = useUser() 
    const supabase = useSupabaseClient() 
    const [userData, setUserData] = useState(null)
    const disableBody = (target) => disableBodyScroll(target)
    const enableBody = (target) => enableBodyScroll(target)
    
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

    const steps = [
        {
            selector: '#intro',
            content: "Welcome to Aviary! This is the accounts page — let's take a look around. ",
        },
        {
            selector: '#assets',
            content: "Aviary provides a spreadsheet-like interface for entering in details about your assets and liabilities.",
        },
        {
            selector: '#editButton',
            content: "Before adding/editing assets or liabilities, click 'Edit' to unlock them.",
        },
        {
            selector: '#assets',
            content: "You'll need to step out of the tutorial briefly to add one or two assets/liablities. Come back after to finish the tour.",
        },
        {
            selector: '#editButton',
            content: "Each time you add or modify account data, make sure to save your updates here! Go ahead and save now.",
        },
        {
            selector: '#assetBreakdown',
            content: "As you add more accounts, these charts will update, grouping your accounts by category.",
        },
        {
            selector: '#assetBreakdown',
            content: "And that's it for the accounts page! Feel free to add more accounts, or head over to the goals page to continue your tutorial.",
        },
    ]

    return (
        <>
            <PostAuthNav current_tab='Accounts' />

            <TourProvider 
            afterOpen={disableBody} 
            beforeClose={enableBody}
            steps={steps} 
            scrollSmooth
            padding={{ 
                mask: [25, 15]
            }}
            styles={{
                popover: (base) => ({
                    ...base,
                    '--reactour-accent': '#1f2937',
                    borderRadius: 10,
                }),
                maskArea: (base) => ({ ...base, rx: 10 }),
                maskWrapper: (base) => ({ ...base, color: '#9ca3af' }),
                badge: (base) => ({ ...base, left: 'auto', right: '-0.8125em' }),
                // controls: (base) => ({ ...base, marginTop: 100 }),
                close: (base) => ({ ...base, right: 'auto', left: 8, top: 8 }),
              }}
            >
                <div className="pt-10 lg:pt-20 pb-20 lg:pb-60 min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <main>
                        <div className='flex gap-3 justify-end mb-10'>
                            <Tour /> 
                            <Achievements user={userData} refreshUser={getUserData} /> 
                        </div>

                        <div className='grid grid-cols-4 gap-5 lg:gap-10 grid-flow-row'>
                            <Accounts user={userData} refreshUser={getUserData} />
                        </div>
                    </main>
                </div>
                
            </TourProvider>

            <PreAuthFooter /> 
        </>
    )
}
