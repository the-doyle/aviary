import { useState } from "react"
import { CheckBadgeIcon } from "@heroicons/react/24/outline"

export default function AchievementButton(props) {
    const claimAchievement = props.claimAchievement ? props.claimAchievement : null 
    const [button, setButton] = useState({
        style: 'border-skin-brand-button-border text-skin-brand-hover bg-skin-brand-light hover:bg-skin-brand-light-hover',
        text: props.achievement ? `Claim ${props.achievement.feathers} 🪶` : null
    })

    const handleClick = async (id, feathers) => {
        setButton({
            style: 'border-skin-brand text-skin-inverted bg-skin-brand animate-pulse',
            text: props.achievement ? `Claim ${props.achievement.feathers} 🪶` : null 
        })
        claimAchievement(id, feathers)
        setButton({
            style: 'border-skin-brand text-skin-inverted bg-skin-brand',
            text: <span className='flex gap-1'>Claimed <CheckBadgeIcon className='h-4' /> </span>
        })
    }

    return props.claimAchievement && 
        props.achievement && 
        props.user && 
        !props.user.achievements.includes(props.achievement.id) && 
        props.user[props.achievement.tracks] >= props.achievement.requirement 
    ? (
        <button
            type="button"
            className={`
                inline-flex items-center rounded border px-2.5 py-1.5 my-1 text-xs font-bold focus:outline-none shadow-sm transition-all hover:animate-shake-infinite
                ${button.style}
            `}
            onClick={() => handleClick(props.achievement.id, props.achievement.feathers)}
        >
            {button.text}
        </button>
        
    ) : props.claimAchievement && 
    props.achievement && 
    props.user && 
    props.user[props.achievement.tracks] < props.achievement.requirement
    ? (
        <button
            type="button"
            className='inline-flex items-center rounded border px-2.5 py-1.5 my-1 text-xs font-bold focus:outline-none shadow-sm transition-all hover:animate-shake border-skin-secondary-button-border opacity-50'
            
        >
            {button.text}
        </button>
    ) : (
        <button
            type="button"
            className='inline-flex items-center rounded border border-skin-brand text-skin-inverted bg-skin-brand px-2.5 py-1.5 my-1 text-xs font-bold focus:outline-none shadow-sm transition-all'
            disabled 
        >
            <span className='flex gap-1'>Claimed <CheckBadgeIcon className='h-4' /> </span>
        </button> 
    )

}