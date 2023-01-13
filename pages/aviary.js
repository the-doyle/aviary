import PostAuthNav from "./postauth/PostAuthNav";
import PreAuthFooter from "./preauth/PreAuthFooter";
import Bird from "./aviary/Bird";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

const categories = [
    {name: 'Common', color: ' from-stone-600 to-stone-400'},
    {name: 'Rare', color: ' from-sky-600 to-sky-400'},
    {name: 'Exotic', color: ' from-lime-600 to-lime-400'},
    {name: 'Legendary', color: ' from-fuchsia-600 to-blue-400'},
]

export default function Aviary() {
    const supabase = useSupabaseClient() 
    const user = useUser() 

    const [birds, setBirds] = useState([])
    const [userData, setUserData] = useState(null)

    const getBirds = async () => {
        const {data: birdsData, error: birdsError} = await supabase
            .from('birds')
            .select('*')

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

                {categories
                    .map((category) => (
                        <div key={category.name} name={category.name} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 lg:pb-20">
                            <h1 className={`inline-flex items-center text-xl font-semibold 
                                            bg-gradient-to-r text-transparent bg-clip-text 
                                            ${category.color}`}
                            >
                                {category.name}
                            </h1>
                            <div className='mt-6
                                            grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 
                                            gap-x-4 lg:gap-x-12 sm:gap-x-8
                                            gap-y-8 lg:gap-y-24 sm:gap-y-16'>
                                {birds && birds.length > 0 ? 
                                    birds
                                    .filter(function (bird) {
                                        return bird.rarity === category.name
                                    })
                                    .map((bird) => (
                                        userData.unlocked_birds.includes(bird.id)
                                            ? <Bird unlocked key={bird.id} bird={bird}/> 
                                            : <Bird key={bird.id} bird={bird}/> 
                                    )) : null 
                                }
                            </div>
                        </div>
                    ))
                }

            </div>

            <PreAuthFooter /> 
        </div>
        </>
    ) : null
}
