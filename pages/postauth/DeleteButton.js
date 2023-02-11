import { useState } from "react"
import { XCircleIcon, TrashIcon } from "@heroicons/react/24/outline"

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

export default function DeleteButton(props) {
    const deleteAccount = props.deleteAccount ? props.deleteAccount : null 

    const [showConfirm, setShowConfirm] = useState(false)
    const [icon, setIcon] = useState('h-5 rounded-full')

    const handleClick = async () => {
        if (showConfirm) {
            setIcon('h-5 rounded-full animate-spin')
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
            <XCircleIcon className={icon}/>
        </button>
    ) : null           
}