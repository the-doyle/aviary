import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react";

import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import HistoryLine from "../charts/HistoryLine";

export default function Progress(props) {
    const supabase = useSupabaseClient() 
    const [history, setHistory] = useState(null) 

    const getHistory = async () => {
        const {data: getHistoryData, error: getHistoryError} = await supabase 
            .rpc('account_history', { 'u_id': props.user.id });

        if (getHistoryData) {
            setHistory(getHistoryData)
            console.log(getHistoryData)
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
        <HistoryLine data={history} /> 
    ) : null 
}