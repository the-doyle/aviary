import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import UnlockButton from "./UnlockButton";

export default function Bird(props) {
    const supabase = useSupabaseClient() 
    const [flipped, setFlipped] = useState(true)
    const refreshUser = props.refreshUser ? props.refreshUser : null 

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

        refreshUser() 
    }

    if (props.bird && props.user && props.refreshUser) {
        return (
            <div 
                onClick={() => props.unlocked ? setFlipped(!flipped) : null} 
                className={`relative group transition-all rounded-lg flex flex-col h-full px-6 group min-h-max text-transparent 
                            ${props.unlocked 
                                ? flipped 
                                    ? 'hover:bg-skin-secondary hover:cursor-pointer' 
                                    : 'bg-skin-secondary hover:bg-skin-secondary-hover hover:cursor-pointer'
                                : ''}
                            `}
            >
                <ArrowUturnLeftIcon className={`h-8 pt-4 place-self-end ${props.unlocked ? flipped ? 'text-skin-inverted group-hover:text-skin-muted' : 'text-skin-secondary group-hover:text-skin-secondary-hover' : null}`} />
                
                <Image alt="pic"  
                    height="300" 
                    width="300" 
                    src={`/birds/${props.bird.name}.png`}
                    className={`${!props.unlocked ? 'opacity-15 grayscale' : null} ${flipped ? null : 'opacity-5'} my-auto pt-4 transition-all`} 
                />   

                <p className={`${flipped ? 'hidden' : 'absolute w-full'} text-sm text-skin-base my-auto place-self-center pt-4 px-6`}>{props.bird.description}</p>

                <div
                    className={`text-sm lg:text-md font-medium text-center
                        ${props.unlocked 
                            ? 'my-4 text-skin-light font-medium'
                            : 'my-3 text-skin-muted font-light'
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