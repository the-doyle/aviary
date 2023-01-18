import { LockOpenIcon } from "@heroicons/react/24/outline";
import { useState } from "react"

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

export default function UnlockButton(props) {
    const unlockBird = props.unlockBird ? props.unlockBird : null 

    const [showConfirm, setShowConfirm] = useState(false)

    const handleClick = async () => {
        if (showConfirm) {
            unlockBird(props.bird.id)
        } else {
            setShowConfirm(true)
            await timeout(3000)
            setShowConfirm(false)
        }
    }

    return props.bird && props.unlockBird ? (
        <button 
            onClick={handleClick}
            className={showConfirm 
                    ? 'inline-flex items-center rounded-md border border-green-500 bg-green-50 px-2 font-normal text-slate-600 hover:bg-green-100 focus:outline-none opacity-70'
                    : 'inline-flex items-center rounded-md border border-slate-300 bg-slate-100 px-2 font-normal text-slate-600 hover:bg-slate-200 focus:outline-none opacity-70'
                    
            }
        >
            <LockOpenIcon className='h-4 w-4' />
            <span className='px-2 font-serif text-lg text-slate-800'>&rarr;</span>
            {props.bird.cost} 🪶
        </button>
    ) : null           
}