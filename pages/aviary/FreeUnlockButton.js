import { LockOpenIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useState } from "react"

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

export default function FreeUnlockButton(props) {
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

    return props.cost && props.unlockBird ? (
        <div className=''>
            <p className='text-xs text-skin-muted mb-1'>Click me (twice)</p>
            <button 
                disabled={props.affordable ? false : true}
                onClick={handleClick}
                className={showConfirm 
                        ? 'inline-flex items-center rounded-md border border-skin-brand bg-skin-brand-light px-2 font-normal text-skin-brand hover:bg-skin-brand-light-hover focus:outline-none opacity-70'
                        : `inline-flex items-center rounded-md border border-skin-muted focus:outline-none opacity-70
                            bg-skin-secondary px-2 font-normal text-skin-light hover:bg-skin-secondary-hover transition-all ease-in-out duration-150
                            disabled:hover:bg-red-100 disabled:hover:animate-shake disabled:hover:border-red-300 disabled:hover:cursor-pointer
                            ${wobble ? 'animate-shake' : null}`
                        
                }
            >
                {showConfirm 
                    ? <LockOpenIcon className='h-4 w-4' />
                    : <LockClosedIcon className='h-4 w-4' />
                }
                <span className='px-1 font-serif text-lg text-slate-800'>&rarr;</span>
                {props.cost}🪶
            </button>
        </div>
    ) : null           
}