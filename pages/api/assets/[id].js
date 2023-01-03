import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default async function handler(req, res) {
    const {data: assetsData, error: assetsError } = await supabase 
        .from('assets')
        .select('*')
        .eq('user_id', req.query.id)

    res.status(200).json(assetsData)
}


