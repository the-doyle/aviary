import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function Bird(props) {
    const supabase = useSupabaseClient() 

    const getHrefForName = (name) => {
        const {data: hrefData, error: hrefError} = supabase 
            .storage
            .from('birds')
            .getPublicUrl(`${name}.png`)

        return hrefData ? hrefData.publicUrl : hrefError
    }

    if (props.bird) {
        return (
            <div className='flex flex-col h-full px-1 py-2 group rounded-lg border border-transparent hover:bg-slate-100 hover:border-slate-200 transition-all hover:cursor-pointer'>
                <Image 
                    height="300" 
                    width="300" 
                    src={getHrefForName(props.bird.name)}
                    className={`${!props.unlocked ? 'opacity-15 grayscale' : null} my-auto`} 
                    alt=""
                />   
                <h1 
                    className={`mt-4 text-sm lg:text-md text-center text-white ${props.unlocked ? 'font-medium group-hover:text-slate-700' : 'font-light group-hover:text-slate-500 blur-xs'} `}
                >
                    {props.bird.name}
                </h1>
            </div>
        ) 
    } 

    return (
        <div className='flex flex-col place-center'>
            <p>Loading...</p>
        </div>
    )
}