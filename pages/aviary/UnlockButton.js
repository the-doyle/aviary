import { LockOpenIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useState } from "react"

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

export default function UnlockButton(props) {
    const unlockBird = props.unlockBird ? props.unlockBird : null 
    const [showConfirm, setShowConfirm] = useState(false)
    const [wobble, setWobble] = useState(null)

    const handleClick = async () => {
        if (showConfirm) {
            unlockBird()
        } else {
            setShowConfirm(true)
            await timeout(3000)
            setShowConfirm(false)
            setWobble(true)
            await timeout(500)
            setWobble(false)
        }
    }

    return props.bird && props.unlockBird ? (
        <button 
            disabled={props.affordable ? false : true}
            onClick={handleClick}
            className={showConfirm 
                    ? 'inline-flex items-center rounded-md border border-skin-brand-button-border bg-skin-brand-light px-2 font-normal text-skin-brand-hover hover:bg-skin-brand-light-hover focus:outline-none opacity-70'
                    : `inline-flex items-center rounded-md border border-skin-secondary-button-border focus:outline-none opacity-70
                        bg-slate-100 px-2 font-normal text-skin-light hover:bg-skin-secondary-hover transition-all ease-in-out duration-150
                        disabled:hover:bg-red-100 disabled:hover:animate-shake disabled:hover:border-red-300 disabled:hover:cursor-pointer
                        ${wobble ? 'animate-shake' : null}`
                    
            }
        >
            {showConfirm 
                ? <LockOpenIcon className='h-4 w-4' />
                : <LockClosedIcon className='h-4 w-4' />
            }
            <span className='px-1 font-serif text-lg text-skin-base'>&rarr;</span>
            {props.bird.cost}🪶
        </button>
    ) : null           
}