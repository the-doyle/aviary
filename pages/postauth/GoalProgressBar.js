import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {  } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useState } from "react";

export default function GoalProgressBar(props) {
    const [progress, setProgress] = useState({ width: "0%" })

    useEffect(() => {
        setProgress({ width: props.progress + "%" })
    }, [props.progress])

    return props.goal && props.progress ? (
        <div className='ml-0 lg:ml-5 mb-2'>
            <div className="flex mb-0.5 items-center justify-between text-slate-800">
                <h1 className='block lg:text-white text-sm font-medium'>{props.goal.name}</h1>
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
                            text-right pr-1 pt-0.5 opacity-${props.progress < 100 ? 50 : 100}`} 
                        style={progress}
                    >
                        {props.progress < 100 
                            ? null
                            : 
                                <div className="flex justify-end align-middle">
                                    <CheckCircleIcon className='h-4 text-slate-800' />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    ) : null
}
  