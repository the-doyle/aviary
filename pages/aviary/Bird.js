import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import UnlockButton from "./UnlockButton";

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

    const unlockBird = async () => {
        let updatedBirds = props.user.unlocked_birds
        updatedBirds.push(props.bird.id)

        const updatedFeathers = props.user.feathers -= props.bird.cost

        const {data: unlockBirdData, error: unlockBirdError} = await supabase 
            .from('users')
            .update({ unlocked_birds: updatedBirds, feathers: updatedFeathers })
            .eq('id', props.user.id)
    }

    if (props.bird && props.user) {
        return (
            <div 
                onClick={() => props.unlocked ? setFlipped(!flipped) : null} 
                className={`relative group transition-all rounded-lg flex flex-col h-full px-6 group min-h-max text-transparent 
                            ${props.unlocked 
                                ? flipped 
                                    ? 'hover:bg-slate-50 hover:cursor-pointer' 
                                    : 'bg-slate-50 hover:bg-slate-100 hover:cursor-pointer'
                                : ''}
                            `}
            >
                <ArrowUturnLeftIcon className={`h-8 pt-4 place-self-end ${props.unlocked ? flipped ? 'text-white group-hover:text-slate-300' : 'text-slate-50 group-hover:text-slate-100' : null}`} />
                
                <Image alt="pic"  
                    height="300" 
                    width="300" 
                    src={getHrefForName(props.bird.name)}
                    className={`${!props.unlocked ? 'opacity-15 grayscale' : null} ${flipped ? null : 'opacity-5'} my-auto pt-4 transition-all`} 
                />   

                <p className={`${flipped ? 'hidden' : 'absolute w-full'} text-sm text-slate-800 my-auto place-self-center pt-4 px-6`}>{props.bird.description}</p>

                <div
                    className={`text-sm lg:text-md font-medium text-center
                        ${props.unlocked 
                            ? 'my-4 text-slate-600 font-medium'
                            : 'my-3 text-gray-300 font-light'
                        }
                            
                        ${flipped ? null : 'opacity-30'} `}
                >
                    {props.unlocked 
                        ?   <h1>{props.bird.name}</h1>
                        : 
                            props.bird.cost <= props.user.feathers
                                ? <UnlockButton bird={props.bird} unlockBird={unlockBird} affordable={true} />
                                : <UnlockButton bird={props.bird} unlockBird={unlockBird} affordable={false} />
                    }
                </div>
            </div>
        ) 
    } 

    return (
        <div className='flex flex-col place-center'>
            <p>Loading...</p>
        </div>
    )
}