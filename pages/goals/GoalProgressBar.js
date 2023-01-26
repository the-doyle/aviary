import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useState } from "react";

export default function GoalProgressBar(props) {
    const [progress, setProgress] = useState({ width: "0%" })

    useEffect(() => {
        setProgress({ width: "0%" })
        setProgress({ width: props.progress + "%" })
    }, [props.progress])

    return props.goal && props.progress && props.class ? (
        <div className={
            `xl:w-1/3 md:w-3/4 h-4 rounded-full xl:mt-1 mt-2 mb-1
            ${props.class === 'asset' ? 'bg-sky-100' : 'bg-violet-100'}
        `}
        >
            <div 
                className={
                    `transition-all ease-out duration-1000
                    h-4 rounded-full bg-gradient-to-r 
                    ${props.class === 'asset' ? 'from-sky-300 to-sky-600 text-sky-800' : 'from-violet-300 to-violet-600 text-violet-800'}
                    text-xs font-semibold 
                    text-right opacity-${props.progress < 100 ? 50 : 100}
                    `
                } 
                style={progress}
            >
                {props.progress < 100 
                    ? null
                    : 
                        <div className="flex justify-end align-middle">
                            <CheckCircleIcon className={
                                `h-4 text-white rounded-full border 
                                ${props.class === 'asset' ? 'border-sky-800 bg-sky-800' : 'border-violet-800 bg-violet-800'}
                                `} 
                            />
                        </div>
                }
            </div>
        </div>
    ) : null
}
  