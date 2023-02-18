import PostAuthNav from "./postauth/PostAuthNav"
import PreAuthFooter from "./preauth/PreAuthFooter"
import Goals from './goals/Goals'
import Achievements from "./achievements/Achievements";
import Tour from "./tour/Tour";

import { TourProvider } from '@reactour/tour'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

const steps = [
    {
        selector: '#goals_main',
        content: "Aviary helps you set concrete goals to grow your assets and pay down liabilities.",
    },
    {
        selector: '#goals_main',
        content: "In Aviary, goals are always associated with a specific asset or liability account. If you have set financial goals in the past, this may be different from what you are used to.",
    },
    {
        selector: '#goals_main',
        content: "In order to effectively set and track goals, each goal you set must be linked to an account. You'll also give each goal a name, target balance, and target date.",
    },
    {
        selector: '#upcoming_goals_nav',
        content: "Let's add your first goal. After clicking 'New goal', fill in the details. Then come back to finish the tutorial.",
    },
    {
        selector: '#upcoming_goals_nav',
        content: "After adding goals, you can easily view all of them, or toggle to the selected year.",
    },
    {
        selector: '#calendar',
        content: "The calendar view allows you to toggle between years, and see a visual overview of complete and incomplete goals for the selected year.",
    },
    {
        selector: '#goals_main',
        content: "That's it for the goals page! Go ahead and add more goals, or continue to the progressp page tutorial.",
    },
]

export default function GoalsPage() {

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


    return (
        <>
            <PostAuthNav current_tab='Goals' />
            
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

                        <Goals user={userData} refreshUser={getUserData}/>
                    </main>
                </div>
            </TourProvider>

            <PreAuthFooter /> 
        </>
    )
}
