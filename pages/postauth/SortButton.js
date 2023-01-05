import { ArrowDownIcon, ArrowLongDownIcon, ArrowLongUpIcon, ArrowsUpDownIcon, ArrowUpIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function SortButton(props) {
    const onClickSort = props.onClickSort ? props.onClickSort : null 
    const [descending, setDescending] = useState(true)

    const handleClick = () => {
        onClickSort(props.sortOn, descending)
        setDescending(!descending)
    }

    return props.sortOn && props.onClickSort ? (
        <button
            type="button"
            className="inline-flex items-center rounded-full focus:outline-none ml-1 text-slate-800 hover:text-slate-500"
            onClick={handleClick}
        >
            <ArrowsUpDownIcon className="h-4 w-4" aria-hidden="true" />
        </button>


    ) : null 
}