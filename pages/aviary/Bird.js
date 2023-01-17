import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function Bird(props) {
    const supabase = useSupabaseClient() 

    const getHrefForName = (name) => {
        const {data: hrefData, error: hrefError} = supabase 
            .storage
            .from('birds')
            .getPublicUrl(`${name}.png`)

        return hrefData ? hrefData.publicUrl : hrefError
    }

    if (props.bird) {
        return (
            <div className={`flex flex-col h-full px-1 py-2 rounded-lg shadow group min-h-max text-transparent ${props.unlocked ? 'hover:bg-slate-50 hover:cursor-pointer' : 'hover:cursor-not-allowed'}`}>
                <Image 
                    height="300" 
                    width="300" 
                    src={getHrefForName(props.bird.name)}
                    className={`${!props.unlocked ? 'opacity-15 grayscale' : null} my-auto`} 
                    alt=""
                />   
                <h1 
                    className={`mt-4 text-sm lg:text-md text-center font-medium bg-clip-text bg-gradient-to-r
                        ${props.unlocked 
                            ? props.bird.rarity === 'Common' 
                                ? 'from-slate-600 to-slate-400'
                                : props.bird.rarity === 'Rare' 
                                    ? 'from-cyan-600 to-cyan-400'
                                    : props.bird.rarity === 'Exotic' 
                                        ? 'from-green-600 to-lime-400'
                                        : 'from-fuchsia-400 to-teal-400'
                            : 'from-gray-300 to-gray-300 font-light'}`}>
                    {props.unlocked ? props.bird.name : "Undiscovered"}
                </h1>
            </div>
        ) 
    } 

    return (
        <div className='flex flex-col place-center'>
            <p>Loading...</p>
        </div>
    )
}