import PostAuthNav from "./postauth/PostAuthNav";
import PreAuthFooter from "./preauth/PreAuthFooter";
import Bird from "./aviary/Bird";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import PageInfo from "./general/PageInfo";

export default function Aviary() {
    const supabase = useSupabaseClient() 
    const user = useUser() 

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
    }, [supabase, user, birds])

    return (
        <>
        <div className="min-h-full">
            <PostAuthNav current_tab='Aviary' />

            <div className="pt-10 lg:pt-20 pb-20 lg:pb-60 min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <main>
                    <PageInfo 
                        firstLine='Aviary has dozens of collectible birds, hand-drawn by San Benito Paper Co. ' 
                        secondLine='As you check in each month to update your net worth, set goals, and track your progress, you&apos;ll earn feathers. You can use feathers to unlock new birds for your collection! '
                        title='Grow your Aviary'
                    />

                    <h1 className="inline-flex items-center text-xl font-semibold text-slate-800 mb-5">Aviary</h1>

                    {  birds && birds.length > 0 && userData 
                        ?
                            <div className='grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-1'>
                                {birds && birds.length > 0 ? 
                                    birds
                                    .map((bird) => (
                                        userData.unlocked_birds.includes(bird.id)
                                            ? <Bird unlocked key={bird.id} bird={bird} user={userData}/> 
                                            : <Bird key={bird.id} bird={bird} user={userData}/> 
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
