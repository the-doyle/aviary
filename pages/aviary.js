import PostAuthNav from "./postauth/PostAuthNav";
import PreAuthFooter from "./preauth/PreAuthFooter";
import Bird from "./aviary/Bird";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import PageInfo from "./general/PageInfo";
import Achievements from "./achievements/Achievements";
import { useRouter } from 'next/router' 

export default function Aviary() {
    const supabase = useSupabaseClient() 
    const user = useUser() 
    const router = useRouter() 

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
        } else {
            router.push('/sign-in')
        }
    }, [supabase, user])

    return (
        <>
        <div className="min-h-full">
            <PostAuthNav current_tab='Aviary' />

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

                    <h1 className="inline-flex items-center text-2xl font-semibold text-slate-800 mb-5">Aviary</h1>

                    {  birds && birds.length > 0 && userData 
                        ?
                            <div className='grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-2'>
                                {birds && birds.length > 0 ? 
                                    birds
                                    .map((bird) => (
                                        userData.unlocked_birds.includes(bird.id)
                                            ? <Bird unlocked key={bird.id} bird={bird} user={userData} refreshUser={getUserData} /> 
                                            : <Bird key={bird.id} bird={bird} user={userData} refreshUser={getUserData} /> 
                                    )) : null 
                                }
                                <div className='md:h-72' />
                            </div>
                        : 
                            <div className='min-h-screen' />
                    }
                </main>
            </div>

            <PreAuthFooter /> 
        </div>
        </>
    )
}
