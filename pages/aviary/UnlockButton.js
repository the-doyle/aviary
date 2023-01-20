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
                    ? 'inline-flex items-center rounded-md border border-green-500 bg-green-50 px-2 font-normal text-slate-600 hover:bg-green-100 focus:outline-none opacity-70'
                    : `inline-flex items-center rounded-md border border-slate-300 focus:outline-none opacity-70
                        bg-slate-100 px-2 font-normal text-slate-600 hover:bg-slate-200 transition-all ease-in-out duration-150
                        disabled:hover:bg-red-100 disabled:hover:animate-shake disabled:hover:border-red-300 disabled:hover:cursor-pointer
                        ${wobble ? 'animate-shake' : null}`
                    
            }
        >
            {showConfirm 
                ? <LockOpenIcon className='h-4 w-4' />
                : <LockClosedIcon className='h-4 w-4' />
            }
            <span className='px-1 font-serif text-lg text-slate-800'>&rarr;</span>
            {props.bird.cost}🪶
        </button>
    ) : null           
}