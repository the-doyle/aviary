import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react";

import HistoryLine from "../charts/HistoryLine";

export default function Progress(props) {
    const supabase = useSupabaseClient() 
    const [history, setHistory] = useState(null) 
    const [column, setColumn] = useState('net_worth')

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const getHistory = async () => {
        const {data: getHistoryData, error: getHistoryError} = await supabase 
            .rpc('net_worth_history', { 'u_id': props.user.id });

        if (getHistoryData) {
            setHistory(getHistoryData)
        }
    }

    useEffect(() => {
        if (props.user) {
            getHistory() 
        }
    }, [props.user])

    return history && history.length >= 3 ? (
        <>
            <nav className="flex space-x-4 mb-5 sm:mb-10" aria-label="Tabs">
                <button
                    className={classNames(
                        column === 'net_worth' ? 'bg-skin-secondary-hover text-skin-base' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary',
                        'px-3 py-2 font-medium text-sm rounded-md'
                    )}
                    onClick={() => setColumn('net_worth')}
                >
                    Net worth
                </button>
                <button
                    className={classNames(
                        column === 'sum_assets' ? 'bg-skin-secondary-hover text-skin-base' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary',
                        'px-3 py-2 font-medium text-sm rounded-md'
                    )}
                    onClick={() => setColumn('sum_assets')}
                >
                    Assets
                </button>
                <button
                    className={classNames(
                        column === 'sum_liabilities' ? 'bg-skin-secondary-hover text-skin-base' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary',
                        'px-3 py-2 font-medium text-sm rounded-md'
                    )}
                    onClick={() => setColumn('sum_liabilities')}
                >
                    Liabilities
                </button>
            </nav>

            <HistoryLine data={history} column={column} /> 
        </>
        
    ) : history ? 
        <div className='col-span-12 flex text-lg text-skin-muted font-medium mt-10 md:mt-20 place-items-center justify-center h-80 rounded-lg bg-skin-secondary'>
            <h1 className='text-center'>Update your account data in Aviary {3 - history.length} more times to see historical progress</h1>
        </div> 
    :   <div className='col-span-12 flex text-lg text-skin-muted font-medium mt-10 md:mt-20 place-items-center justify-center h-80 rounded-lg bg-skin-secondary'>
            <h1 className='text-center'>Update your account data in Aviary 3 more times to see historical progress </h1>
        </div> 
}