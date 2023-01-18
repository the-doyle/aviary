import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

export default function Bird(props) {
    const supabase = useSupabaseClient() 
    const [flipped, setFlipped] = useState(true)

    const getHrefForName = (name) => {
        const {data: hrefData, error: hrefError} = supabase 
            .storage
            .from('birds')
            .getPublicUrl(`${name}.png`)

        return hrefData ? hrefData.publicUrl : hrefError
    }

    if (props.bird) {
        return (
            <div 
                onClick={() => props.unlocked ? setFlipped(!flipped) : null} 
                className={`relative group transition-all flex flex-col h-full px-6 border border-slate-100 group min-h-max text-transparent 
                            ${props.unlocked 
                                ? flipped 
                                    ? 'hover:bg-slate-50 hover:cursor-pointer' 
                                    : 'bg-slate-50 hover:bg-slate-100 hover:cursor-pointer'
                                : ''}
                            `}
            >
                <ArrowUturnLeftIcon className={`h-8 pt-4 place-self-end text-white ${props.unlocked ? flipped ? 'group-hover:text-slate-300' : null : null}`} />
                
                <Image alt="pic"  
                    height="300" 
                    width="300" 
                    src={getHrefForName(props.bird.name)}
                    className={`${!props.unlocked ? 'opacity-15 grayscale' : null} ${flipped ? null : 'opacity-5'} my-auto pt-4 transition-all`} 
                />   

                <p className={`${flipped ? 'hidden' : 'absolute w-full'} text-sm text-slate-800 my-auto place-self-center pt-4 px-6`}>{props.bird.description}</p>

                <h1 
                    className={`my-4 text-sm lg:text-md text-center font-medium bg-clip-text bg-gradient-to-r
                        ${props.unlocked 
                            ? props.bird.rarity === 'Common' 
                                ? 'from-slate-600 to-slate-400'
                                : props.bird.rarity === 'Rare' 
                                    ? 'from-cyan-600 to-cyan-400'
                                    : props.bird.rarity === 'Exotic' 
                                        ? 'from-green-600 to-lime-400'
                                        : 'from-fuchsia-400 to-teal-400'
                            : 'from-gray-300 to-gray-300 font-light'}
                            
                        ${flipped ? null : 'opacity-30'} `}
                >
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