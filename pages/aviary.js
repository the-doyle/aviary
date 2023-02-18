import PostAuthNav from "./postauth/PostAuthNav";
import PreAuthFooter from "./preauth/PreAuthFooter";
import Bird from "./aviary/Bird";
import PageInfo from "./general/PageInfo";
import Achievements from "./achievements/Achievements";
import Tour from "./tour/Tour";
import Aviary from "./aviary/Aviary";

import { TourProvider } from '@reactour/tour'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

const steps = [
    {
        selector: '#aviary',
        content: "This is your Aviary!",
    },
    {
        selector: '#aviary',
        content: "If you haven't already found the achievements 🪶 button, it's next to the tutorial button.",
    },
    {
        selector: '#aviary',
        content: "As you track accounts, set goals, etc... you'll earn feathers. You can use feathers to unlock birds here!",
    },
    {
        selector: '#birds',
        content: "If you have enough feathers, go ahead and unlock your first bird! Otherwise, come back once you've completed more achievements.",
    },
    {
        selector: '#birds',
        content: "After unlocking a bird, click on it to view a fun fact about that bird.",
    },
    {
        selector: '#aviary',
        content: "Several exciting features are still under development for Aviary, but that's it for now! ",
    },
]

export default function AviaryPage() {
    const supabase = useSupabaseClient() 
    const user = useUser() 
    const disableBody = (target) => disableBodyScroll(target)
    const enableBody = (target) => enableBodyScroll(target)

    const [birds, setBirds] = useState([])
    const [userData, setUserData] = useState(null)

    const getBirds = async () => {
        const {data: birdsData, error: birdsError} = await supabase
            .from('birds')
            .select('*')
            .order('cost', {ascending: true})

        setBirds(birdsData)
    }

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
        if (supabase && user) {
            getBirds() 
            getUserData() 
        } 
    }, [supabase, user])

    return (
        <>
        <div className="min-h-full">
            <PostAuthNav current_tab='Aviary' />

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
                            <Tour tourEnabled={true} /> 
                            <Achievements user={userData} refreshUser={getUserData} /> 
                        </div>

                        <Aviary userData={userData} birds={birds} refreshUser={getUserData} /> 
                    </main>
                </div> 
            </TourProvider>

            <PreAuthFooter /> 
        </div>
        </> 
    ) 
}
