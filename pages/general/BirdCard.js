import Image from "next/image";
import birdPic from '../../public/bird.png'

export default function BirdCard(props) {
    return props.rarity && props.name && props.description && props.date ? (
        <div className='m-10 font-serif font-bold'>
            <div className={
                props.rarity == 'Common' 
                ? 'rounded-lg shadow-xl p-1.5 bg-gradient-to-r from-zinc-400 to-slate-400 w-40 w-48'
                : props.rarity == 'Rare'
                    ? 'rounded-lg shadow-xl p-1.5 bg-gradient-to-r from-sky-400 to-blue-400 w-40 w-48'
                    : props.rarity == 'Exotic' 
                        ? 'rounded-lg shadow-xl p-1.5 bg-gradient-to-r from-lime-400 to-teal-400 w-40 w-48'
                        : 'rounded-lg shadow-xl p-1.5 bg-gradient-to-r from-slate-400 to-slate-900 w-40 w-48'
            }>
                <div className='bg-white px-3 py-2 rounded-lg'>

                    <div className="grid grid-rows-4 grid-cols-1 gap-4">
                        <div className="row-span-4">
                            <h1 className='text-md leading-tight font-medium text-slate-800'>{props.name}</h1>
                            <h1 className='text-xs font-light leading-tight text-slate-400'>Found by 3% of users</h1>
                        </div>
                    </div>
                
                    <div className="flex justify-center rounded-lg mb-3">
                        <Image alt="pic"  className='w-40' src={birdPic} />
                    </div>

                    <div className="grid grid-rows-5 grid-cols-1 gap-4">
                        <div className="row-span-5">
                            <h1 className='text-slate-700 rounded-md text-xs italic ml-1'>{props.description}</h1>
                        </div>
                    </div>

                    <div className='flex justify-between pt-2 border-dotted border-t-2 text-sm leading-tight '>
                        <h1 className='text-slate-500'>{props.date}</h1>
                        <h1 className={
                            props.rarity == 'Common' 
                            ? 'font-bold bg-gradient-to-r text-transparent bg-clip-text from-zinc-400 to-slate-400'
                            : props.rarity == 'Rare'
                                ? 'font-bold bg-gradient-to-r text-transparent bg-clip-text from-sky-400 to-blue-400'
                                : props.rarity == 'Exotic' 
                                    ? 'font-bold bg-gradient-to-r text-transparent bg-clip-text from-lime-400 to-teal-400'
                                    : 'font-bold bg-gradient-to-r text-transparent bg-clip-text from-slate-400 to-slate-900'
                        }>
                            {props.rarity}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}