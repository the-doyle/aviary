import PostAuthNav from "./postauth/PostAuthNav"
import PreAuthFooter from "./preauth/PreAuthFooter"
import PageInfo from './general/PageInfo'
import Achievements from "./achievements/Achievements";
import Progress from './progress/Progress'

import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { FaceSmileIcon } from "@heroicons/react/24/outline";

export default function ProgressPage() {

    const user = useUser() 
    const supabase = useSupabaseClient() 
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
            <PostAuthNav current_tab='Progress' />

            <div className="pt-10 lg:pt-20 pb-20 lg:pb-60 min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <main>
                    <div className='flex gap-3 justify-end mb-10'>
                        <Achievements user={userData} refreshUser={getUserData} /> 
                        <PageInfo 
                            title='Measure your progress'
                            firstLine='Aviary saves your historical progress every time you update your accounts data, up to once per day.' 
                            // secondLine='Come back monthly to update your balances.'
                        />
                    </div>

                    <Progress user={userData} refreshUser={getUserData}/>
                </main>
            </div>

            <PreAuthFooter /> 
        </>
    )
}
