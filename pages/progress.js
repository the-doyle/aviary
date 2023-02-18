import PostAuthNav from "./postauth/PostAuthNav"
import PreAuthFooter from "./preauth/PreAuthFooter"
import PageInfo from './general/PageInfo'
import Achievements from "./achievements/Achievements";
import Progress from './progress/Progress'
import Tour from "./tour/Tour";

import { TourProvider } from '@reactour/tour'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

const steps = [
    {
        selector: '#summary',
        content: "Each time you update your account data, Aviary saves your historical progress here.",
    },
    {
        selector: '#nav',
        content: "Currently, you can toggle between viewing your net worth, assets, and liabilities. You can also choose between several timeframes (e.g. 1m, 3m, etc).",
    },
    {
        selector: '#history',
        content: "In the future, Aviary will include charts on this page for viewing individual asset and liability history. Stay tuned!",
    },
]

export default function ProgressPage() {

    const user = useUser() 
    const supabase = useSupabaseClient() 
    const [userData, setUserData] = useState(null)
    const disableBody = (target) => disableBodyScroll(target)
    const enableBody = (target) => enableBodyScroll(target)
    const [tourEnabled, setTourEnabled] = useState(false)

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
            <PostAuthNav current_tab='Progress' />

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
                            <Tour tourEnabled={tourEnabled} /> 
                            <Achievements user={userData} refreshUser={getUserData} /> 
                        </div>

                        <Progress user={userData} refreshUser={getUserData} setTourEnabled={setTourEnabled} />
                    </main>
                </div>
                
            </TourProvider>

            <PreAuthFooter /> 
        </>
    )
}
