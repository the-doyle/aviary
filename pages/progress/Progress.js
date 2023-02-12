import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react";

import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
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
        nProgress.start() 
        if (props.user) {
            getHistory() 
        }
    }, [props.user])

    useEffect(() => {
        if (history) {
            nProgress.done() 
        }
    }, [history])

    return history ? (
        <>
            <nav className="flex space-x-4 mb-5" aria-label="Tabs">
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
        
    ) : null 
}