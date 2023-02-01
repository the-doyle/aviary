import { ArrowDownCircleIcon, ArrowRightCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useState } from "react";

export default function GoalProgressBar(props) {
    const [progress, setProgress] = useState({ width: "0%" })

    useEffect(() => {
        setProgress({ width: "0%" })
        setProgress({ width: props.progress + "%" })
    }, [props.progress])

    return props.goal && props.progress && props.class ? (
        <div className='xl:w-1/3 md:w-3/4 h-4 rounded-full xl:mt-1 mt-2 mb-1 bg-skin-secondary-hover'
        >
            <div 
                className={
                    `transition-all ease-out duration-1000
                    h-4 rounded-full 
                    ${props.class === 'asset' ? 'bg-skin-assets' : 'bg-skin-liabilities'}
                    text-xs font-semibold 
                    text-right opacity-${props.progress < 100 ? 50 : 100}
                    `
                } 
                style={progress}
            >
                {props.progress < 100 
                    ? 
                        <div className="flex justify-end align-middle">
                            <ArrowRightCircleIcon className={
                                `h-4 text-white rounded-full border 
                                ${props.class === 'asset' ? 'border-skin-assets bg-skin-assets' : 'border-skin-assets bg-skin-assets'}
                                `} 
                            />
                        </div>
                    : 
                        <div className="flex justify-end align-middle">
                            <CheckCircleIcon className={
                                `h-4 text-white rounded-full border 
                                ${props.class === 'asset' ? 'border-skin-assets bg-skin-assets' : 'border-skin-assets bg-skin-assets'}
                                `} 
                            />
                        </div>
                }
            </div>
        </div>
    ) : null
}
  