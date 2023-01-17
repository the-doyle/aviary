import PostAuthNav from "./postauth/PostAuthNav";
import PreAuthFooter from "./preauth/PreAuthFooter";
import Bird from "./aviary/Bird";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import AviaryInfo from "./aviary/AviaryInfo";

export default function Aviary() {
    const supabase = useSupabaseClient() 
    const user = useUser() 

    const [birds, setBirds] = useState([])
    const [userData, setUserData] = useState(null)

    const getBirds = async () => {
        const {data: birdsData, error: birdsError} = await supabase
            .from('birds')
            .select('*')
            .order('rarity_num', {ascending: true})

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

    return birds && birds.length > 0 && userData ? (
        <>
        <div className="min-h-full">
            <PostAuthNav current_tab='Aviary' />

            <div className="pt-20 pb-20 lg:pb-60 min-h-screen">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">                
                    <AviaryInfo />
                </div> 

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-20">
                    <div className='grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 
                                    gap-x-4 lg:gap-x-12 sm:gap-x-8
                                    gap-y-8 lg:gap-y-24 sm:gap-y-16'>
                        {birds && birds.length > 0 ? 
                            birds
                            .map((bird) => (
                                userData.unlocked_birds.includes(bird.id)
                                    ? <Bird unlocked key={bird.id} bird={bird}/> 
                                    : <Bird key={bird.id} bird={bird}/> 
                            )) : null 
                        }
                        <div className='sm:h-64' />
                    </div>
                </div>

            </div>

            <PreAuthFooter /> 
        </div>
        </>
    ) : null
}
