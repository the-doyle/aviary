import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react";

import HistoryLine from "../charts/HistoryLine";
import {ArrowTrendingUpIcon, ArrowTrendingDownIcon, ArrowLongRightIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

export default function Progress(props) {
    const supabase = useSupabaseClient() 

    const [history, setHistory] = useState(null) 
    const [column, setColumn] = useState('net_worth')
    const [period, setPeriod] = useState(91)
    const [showEmptyState, setShowEmptyState] = useState(false) 

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
        }
    }

    const changeOverTime = (history, column) => {

        if (history[history.length - 1][column] === 0) {
            if (history[0][column] === 0) {
                return [0, null]
            }
            return [
                -100, 
                Intl.NumberFormat('en-US', {
                    notation: "compact",
                    maximumFractionDigits: 1
                }).format(history[0][column])
            ]
        }

        return [
            Math.round((history[history.length - 1][column] - history[0][column]) / history[0][column] * 100),
            Intl.NumberFormat('en-US', {
                notation: "compact",
                maximumFractionDigits: 1
            }).format(history[history.length - 1][column] - history[0][column])
        ]
    }

    useEffect(() => {
        if (props.user) {
            getHistory() 
        }
    }, [props.user, period])

    return history && history.length > 0 ? (
        <>
            <div className='flex justify-between align-middle mb-5 sm:mb-10'>
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
                            column === 'sum_assets' ? 'bg-skin-brand-light text-skin-brand' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary-hover',
                            'px-3 py-2 font-medium text-sm rounded-md'
                        )}
                        onClick={() => setColumn('sum_assets')}
                    >
                        Assets
                    </button>
                    <button
                        className={classNames(
                            column === 'sum_liabilities' ? 'bg-skin-brand-light text-skin-brand' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary-hover',
                            'px-3 py-2 font-medium text-sm rounded-md'
                        )}
                        onClick={() => setColumn('sum_liabilities')}
                    >
                        Liabilities
                    </button>
                </nav>

                <h1 className='text-lg font-bold px-3 py-2 text-skin-brand'>
                    {changeOverTime(history, column)[0] == Number.POSITIVE_INFINITY 
                    ?   <div className='flex gap-2 align-middle'>
                            +{changeOverTime(history, column)[1]}
                        </div>
                    : changeOverTime(history, column)[0] > 0
                        ?   <div className='flex gap-2 align-middle'>
                                +{changeOverTime(history, column)[1]}
                                <p>|</p>
                                +{changeOverTime(history, column)[0]}%
                            </div>
                        : changeOverTime(history, column)[0] === 0 
                            ?   <div className='flex gap-2 align-middle'>
                                    No change
                                </div>
                            :   <div className='flex gap-2 align-middle'>
                                    -{changeOverTime(history, column)[1]}
                                    <p>|</p>
                                    -{changeOverTime(history, column)[0]}%
                                </div>
                    }
                </h1>
            </div>

            <HistoryLine data={history} column={column} /> 

            <nav className="flex justify-end space-x-2 mt-5 sm:mt-10" aria-label="Tabs">
                <button
                    className={classNames(
                        period === 1 ? 'bg-skin-secondary-hover text-skin-base' : 'text-skin-light hover:text-skin-base hover:bg-skin-secondary',
                        'px-2 py-1 font-medium text-sm rounded-md'
                    )}
                    onClick={() => setPeriod(1)}
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
        </>
        
    ) : 
        <div className={`
            transition-all duration-1000 col-span-12 flex text-lg text-skin-muted font-medium mt-10 md:mt-20 place-items-center justify-center h-40 sm:h-60 lg:h-80 rounded-lg bg-skin-secondary-hover
            ${showEmptyState ? 'opacity-100' : 'opacity-0'}
        `}>
            <h1 className='text-center'>Add your first asset and/or liability to see historical progress!</h1>
        </div> 

}