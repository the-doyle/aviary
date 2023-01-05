import { useState } from "react"
import { XCircleIcon } from "@heroicons/react/24/outline"

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

export default function DeleteButton(props) {
    const deleteAccount = props.deleteAccount ? props.deleteAccount : null 

    const [showConfirm, setShowConfirm] = useState(false)

    const handleClick = async () => {
        if (showConfirm) {
            deleteAccount(props.account.id)
        } else {
            setShowConfirm(true)
            await timeout(3000)
            setShowConfirm(false)
        }
    }

    return props.account && props.deleteAccount ? (
        <button 
            className={showConfirm ? "text-red-500 hover:text-red-700" : "text-slate-300 hover:text-slate-500"}
            onClick={handleClick}
        >
            <XCircleIcon className='h-6 rounded-full'/>
        </button>
    ) : null           
}