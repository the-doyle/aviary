import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react";

import HistoryLine from "../charts/HistoryLine";
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from "@heroicons/react/24/solid";

export default function Progress(props) {
    const supabase = useSupabaseClient() 

    const [history, setHistory] = useState(null) 
    const [column, setColumn] = useState('net_worth')
    const [period, setPeriod] = useState(91)
    const [showEmptyState, setShowEmptyState] = useState(false) 
    const setTourEnabled = props.setTourEnabled ? props.setTourEnabled : null 

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const getHistory = async () => {
        const {data: getHistoryData, error: getHistoryError} = await supabase 
            .rpc('net_worth_history', { 'u_id': props.user.id, 'period': period });

        if (getHistoryData) {
            if (getHistoryData.length === 1) {
                const {data: getHistoryDataShort, error: getHistoryErrorShort} = await supabase 
                    .rpc('net_worth_history_short', { 'u_id': props.user.id, 'period': period });

                if (getHistoryDataShort) {
                    setHistory(getHistoryDataShort)
                    setShowEmptyState(true)
                }
            } else {
                setHistory(getHistoryData)
                setShowEmptyState(true)
            }

            if (getHistoryData.length > 0) {
                setTourEnabled(true)
            }
        }
    }

    const changeOverTime = (history, column) => {

        if (history[history.length - 1][column] === 0) { // if the present value is 0, there are two possiblities
            if (history[0][column] === 0) {
                return [0, null, '-'] // (1) both values are 0 and the change is, therefore, 0
            }
            return [ // or (2) the previous value != 0, and the change is -100% 
                100, 
                Intl.NumberFormat('en-US', {
                    notation: "compact",
                    maximumFractionDigits: 1
                }).format(Math.abs(history[0][column])),
                '-' // negative change over period
            ]
        }

        const symbol = history[history.length - 1][column] > history[0][column] ? '+' : '-' // did the balance grow or shrink?

        return [ // otherwise, we either have a positive or negative change
            Math.abs(Math.round((history[history.length - 1][column] - history[0][column]) / history[0][column] * 100)),
            Intl.NumberFormat('en-US', {
                notation: "compact",
                maximumFractionDigits: 1
            }).format(Math.abs(history[history.length - 1][column] - history[0][column])),
            symbol 
        ]
    }

    useEffect(() => {
        if (props.user) {
            getHistory() 
        }
    }, [props.user, period])

    return history && history.length > 0 ? (
        <>
            <div id='summary' className='flex justify-between items-middle mb-2'>
                <h1 className={`
                    flex gap-1 text-2xl font-semibold px-3 py-2
                    ${column === 'sum_assets' 
                        ? 'text-skin-assets' 
                        : column === 'sum_liabilities' 
                            ? 'text-skin-liabilities' 
                            : 'text-skin-brand'}
                `}>
                    <p>{column === 'sum_assets' ? 'Total assets:' : column === 'sum_liabilities' ? 'Total liabilities' : 'Net worth:' }</p>
                    {
                        Intl.NumberFormat('en-US', {
                            style: 'currency', 
                            currency: 'USD',
                            notation: "compact",
                            maximumFractionDigits: 1
                        }).format(history[history.length - 1][column])
                    }
                </h1>

                <h1 className={`
                    text-lg font-semibold px-3 py-2 transition-all
                    ${column === 'sum_assets' 
                        ? 'text-skin-assets' 
                        : column === 'sum_liabilities' 
                            ? 'text-skin-liabilities' 
                            : 'text-skin-brand'}
                `}>

                    {changeOverTime(history, column)[0] == Number.POSITIVE_INFINITY 
                    ?   <div className='flex gap-1 items-center'>
                            <ArrowUpCircleIcon className='h-5 w-5' /> 
                            ${changeOverTime(history, column)[1]}
                            
                            <span className='font-medium text-skin-muted'>
                                (N/A)
                            </span>
                        </div>
                    : changeOverTime(history, column)[0] === 0 
                        ?   <div className='flex gap-1 items-center text-skin-muted font-medium'>
                                No change
                            </div>
                        :   <div className='flex gap-1 items-center'>
                                {changeOverTime(history, column)[2] === '+' 
                                    ? <ArrowUpCircleIcon className='h-5 w-5' /> 
                                    : <ArrowDownCircleIcon className='h-5 w-5' />
                                }

                                {changeOverTime(history, column)[2]}
                                ${changeOverTime(history, column)[1]}
                                
                                <span className='font-medium text-skin-muted'>
                                    ({changeOverTime(history, column)[0]}%)
                                </span>
                            </div>
                    }
                </h1>
            </div>
            
            <div id='history'>
                <HistoryLine data={history} column={column} /> 
            </div>

            <div id='nav' className='flex justify-between items-middle mt-2 sm:mt-5'>
                <nav className="flex space-x-4" aria-label="Tabs">
                    <button
                        className={classNames(
                            column === 'net_worth' ? 'bg-skin-brand-light text-skin-brand' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary-hover',
                            'px-3 py-2 font-medium text-sm rounded-md'
                        )}
                        onClick={() => setColumn('net_worth')}
                    >
                        Net worth
                    </button>
                    <button
                        className={classNames(
                            column === 'sum_assets' ? 'bg-skin-assets-light text-skin-assets' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary-hover',
                            'px-3 py-2 font-medium text-sm rounded-md'
                        )}
                        onClick={() => setColumn('sum_assets')}
                    >
                        Assets
                    </button>
                    <button
                        className={classNames(
                            column === 'sum_liabilities' ? 'bg-skin-liabilities-light text-skin-liabilities' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary-hover',
                            'px-3 py-2 font-medium text-sm rounded-md'
                        )}
                        onClick={() => setColumn('sum_liabilities')}
                    >
                        Liabilities
                    </button>
                </nav>

                <nav className="flex space-x-2" aria-label="Tabs">
                    <button
                        className={classNames(
                            period === 30 ? 'bg-skin-secondary-hover text-skin-base' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary',
                            'px-2 py-1 font-medium text-sm rounded-md'
                        )}
                        onClick={() => setPeriod(30)}
                    >
                        1m
                    </button>
                    <button
                        className={classNames(
                            period === 91 ? 'bg-skin-secondary-hover text-skin-base' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary',
                            'px-2 py-1 font-medium text-sm rounded-md'
                        )}
                        onClick={() => setPeriod(91)}
                    >
                        3m
                    </button>
                    <button
                        className={classNames(
                            period === 365 ? 'bg-skin-secondary-hover text-skin-base' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary',
                            'px-2 py-1 font-medium text-sm rounded-md'
                        )}
                        onClick={() => setPeriod(365)}
                    >
                        1y
                    </button>
                    <button
                        className={classNames(
                            period === 1825 ? 'bg-skin-secondary-hover text-skin-base' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary',
                            'px-2 py-1 font-medium text-sm rounded-md'
                        )}
                        onClick={() => setPeriod(1825)}
                    >
                        5y
                    </button>
                    <button
                        className={classNames(
                            period === 100000 ? 'bg-skin-secondary-hover text-skin-base' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary',
                            'px-2 py-1 font-medium text-sm rounded-md'
                        )}
                        onClick={() => setPeriod(100000)}
                    >
                        All
                    </button>
                </nav>
            </div>

        </>
        
    ) : 
        <div className={`
            transition-all duration-1000 col-span-12 flex text-lg text-skin-muted font-medium mt-10 md:mt-20 place-items-center justify-center h-40 sm:h-60 lg:h-80 rounded-lg bg-skin-secondary-hover
            ${showEmptyState ? 'opacity-100' : 'opacity-0'}
        `}>
            <h1 className='text-center'>Add your first asset and/or liability to see historical progress!</h1>
        </div> 

}