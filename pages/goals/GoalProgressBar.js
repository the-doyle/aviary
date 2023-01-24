import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useState } from "react";

export default function GoalProgressBar(props) {
    const [progress, setProgress] = useState({ width: "0%" })

    useEffect(() => {
        setProgress({ width: props.progress + "%" })
    }, [props.progress])

    return props.goal && props.progress ? (
        <div className="xl:w-1/3 md:w-3/4 h-4 rounded-full bg-slate-200 xl:mt-1 mt-2 mb-1">
            <div 
                className={
                    `transition-all ease-out duration-1000
                    h-4 rounded-full bg-gradient-to-r from-slate-300 to-slate-500 text-slate-700 text-xs font-semibold 
                    text-right opacity-${props.progress < 100 ? 50 : 100}`} 
                style={progress}
            >
                {props.progress < 100 
                    ? null
                    : 
                        <div className="flex justify-end align-middle">
                            <CheckCircleIcon className='h-4 text-white rounded-full border border-slate-800 bg-slate-800' />
                        </div>
                }
            </div>
        </div>
    ) : null
}
  