import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useState } from "react";

const subtractDates = (date) => {
    const day = 60*60*24*1000
    const month = day * 30
    const year = month * 12
    const today = new Date() 
    const future = new Date(date)

    let difference = Math.floor((future - today) / day)
    if (difference < -1 ) {
        return "Deadline passed"
    } else if (difference == -1) {
        return 'Due today!'
    }  else if (difference == 0) {
        return '1 day left'
    }else if (difference < 90) {
        return `${difference + 1} days left`
    }

    difference = Math.floor((future - today) / month)
    if (difference < 25) {
        return `${difference} months left`
    }

    difference = Math.floor((future - today) / year)
    return `${difference} years left`
}

export default function GoalProgressBar(props) {
    const [progress, setProgress] = useState({ width: "0%" })

    useEffect(() => {
        setProgress({ width: props.progress + "%" })
    }, [props.progress])

    return props.goal && props.progress ? (
        <div className='ml-0 lg:ml-5 mt-2 mb-2.5'>
            <h1 className='block lg:hidden text-center lg:text-white text-sm font-medium'>{props.goal.name}</h1>
            <div className="flex items-center justify-between text-slate-400">
                <h1 className='block text-xs font-medium'>{subtractDates(props.goal.target_date)}</h1>
                <div className="text-right">
                    <span className="text-xs font-semibold inline-block">
                        {props.progress + '%'}
                    </span>
                </div>
            </div>
            <div className="" aria-hidden="true">
                <div className="overflow-hidden rounded-full bg-slate-200">
                    <div 
                        className={
                            `transition-all ease-out duration-1000
                            h-5 rounded-full bg-gradient-to-r from-blue-300 to-green-300 text-slate-700 text-xs font-semibold 
                            text-right opacity-${props.progress < 100 ? 50 : 100}`} 
                        style={progress}
                    >
                        {props.progress < 100 
                            ? null
                            : 
                                <div className="flex justify-end align-middle">
                                    <CheckCircleIcon className='h-5 text-white rounded-full border border-slate-800 bg-slate-800' />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    ) : null
}
  