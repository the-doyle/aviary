import { useState } from "react"
import { CheckBadgeIcon } from "@heroicons/react/24/outline"

export default function AchievementButton(props) {
    const setFeathers = props.setFeathers ? props.setFeathers : null 
    const [claimed, setClaimed] = useState(false)

    const [button, setButton] = useState({
        style: 'border-green-600 text-green-600 hover:bg-green-50',
        text: props.value ? `Claim ${props.value} 🪶` : null
    })

    const handleClick = async () => {
        setFeathers(props.feathers + props.value)
        setButton({
            style: 'border-green-600 text-white bg-green-600',
            text: <span className='flex gap-1'>Claimed <CheckBadgeIcon className='h-4' /> </span>
        })
        setClaimed(true)
    }

    return props.feathers && props.setFeathers && props.value && !claimed
    ? (
        <div className='flex-col gap-2'>
            <p className='text-xs text-slate-400'>Click me</p>
            <button
                type="button"
                className={`
                    inline-flex items-center rounded border px-2.5 py-1.5 my-1 text-xs font-bold focus:outline-none shadow-sm transition-all hover:animate-shake-infinite
                    ${button.style}
                `}
                onClick={handleClick}
            >
                {button.text}
            </button>

        </div>
        
    ) : 
        <button
            type="button"
            className='inline-flex items-center rounded border border-green-600 text-white bg-green-600 px-2.5 py-1.5 my-1 text-xs font-bold focus:outline-none shadow-sm transition-all'
            disabled 
        >
            <span className='flex gap-1'>Claimed <CheckBadgeIcon className='h-4' /> </span>
        </button> 
    

}