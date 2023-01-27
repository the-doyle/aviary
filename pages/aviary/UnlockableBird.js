import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import FreeUnlockButton from "./FreeUnlockButton";

export default function Bird(props) {
    const supabase = useSupabaseClient() 
    const [flipped, setFlipped] = useState(true)
    const [unlocked, setUnlocked] = useState(props.unlocked ? true : false) 
    const setFeathers = props.setFeathers ? props.setFeathers : null 

    const getHrefForName = (name) => {
        const {data: hrefData, error: hrefError} = supabase 
            .storage
            .from('birds')
            .getPublicUrl(`${name}.png`)

        return hrefData ? hrefData.publicUrl : hrefError
    }

    const handleUnlock = () => {
        setFeathers(props.feathers - props.cost)
        setUnlocked(true) 
    }

    return props.birdName && props.cost && props.description && props.feathers && props.setFeathers ? (
        <div 
            onClick={() => unlocked ? setFlipped(!flipped) : null} 
            className={`relative group transition-all rounded-lg flex flex-col h-full px-6 group min-h-max text-transparent 
                        ${unlocked 
                            ? flipped 
                                ? 'border border-dashed border-slate-300 hover:border-slate-400 hover:cursor-pointer' 
                                : 'border border-dashed border-slate-500 hover:border-slate-800 hover:cursor-pointer'
                            : 'border border-dashed border-slate-300'}
                        `}
        >
            <ArrowUturnLeftIcon className={`h-8 pt-4 place-self-end ${unlocked ? flipped ? 'text-white group-hover:text-slate-300' : 'text-slate-50 group-hover:text-slate-100' : null}`} />
            
            <Image alt="pic"  
                height="300" 
                width="300" 
                src={getHrefForName(props.birdName)}
                className={`${!unlocked ? 'opacity-15 grayscale' : null} ${flipped ? null : 'opacity-5'} my-auto pt-4 transition-all`} 
            />   

            <p className={`${flipped ? 'hidden' : 'absolute w-full'} text-sm text-slate-800 my-auto place-self-center pt-4 px-6`}>{props.description}</p>

            <div
                className={`text-sm lg:text-md font-medium text-center
                    ${unlocked 
                        ? 'my-4 text-slate-600 font-medium'
                        : 'my-3 text-gray-300 font-light'
                    }
                        
                    ${flipped ? null : 'opacity-30'} `}
            >
                {unlocked 
                    ?   <h1>{props.birdName}</h1>
                    : 
                        props.cost <= props.feathers
                            ? <FreeUnlockButton cost={props.cost} unlockBird={() => handleUnlock()} affordable={true} />
                            : <FreeUnlockButton cost={props.cost} unlockBird={() => handleUnlock()} affordable={false} />
                }
            </div>
        </div>
    ) : 
    <div className='flex flex-col place-center'>
        <p>Loading...</p>
    </div>
} 