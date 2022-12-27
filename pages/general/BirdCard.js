import Image from "next/image";
import birdPic from '../../public/bird.png'

export default function BirdCard(props) {
    return props.rarity ? (
        <div className='m-10 font-serif'>
            <div className={
                props.rarity == 'Common' 
                ? 'border rounded-lg shadow-lg p-1.5 bg-gradient-to-r from-zinc-400 to-stone-400 w-40 sm:w-48'
                : props.rarity == 'Rare'
                    ? 'border rounded-lg shadow-lg p-1.5 bg-gradient-to-r from-sky-400 to-blue-400 w-40 sm:w-48'
                    : props.rarity == 'Exotic' 
                        ? 'border rounded-lg shadow-lg p-1.5 bg-gradient-to-r from-orange-400 to-amber-400 w-40 sm:w-48'
                        : 'border rounded-lg shadow-lg p-1.5 bg-gradient-to-r from-lime-400 to-teal-400 w-40 sm:w-48'
            }>
                <div className='bg-white px-3 py-2 rounded-lg'>
                    <h1 className='underline underline-offset-4 decoration-2 text-md leading-tight font-medium text-slate-600'>House sparrow</h1>
                    <div className="flex justify-center rounded-lg pt-5 pb-3">
                        <Image className='w-32 md:w-40' src={birdPic} />
                    </div>
                    <div className=" text-slate-700 rounded-md text-xs italic ml-1 mb-5">
                        <p>House sparrows average about 15 wingbeats per second</p>
                    </div>
                    <div className='flex justify-between pt-2 border-dotted border-t-2 text-sm leading-tight '>
                        <h1 className='text-slate-500'>Jan 2023</h1>
                        <h1 className={
                            props.rarity == 'Common' 
                            ? 'font-bold bg-gradient-to-r text-transparent bg-clip-text from-zinc-400 to-stone-400'
                            : props.rarity == 'Rare'
                                ? 'font-bold bg-gradient-to-r text-transparent bg-clip-text from-sky-400 to-blue-400'
                                : props.rarity == 'Exotic' 
                                    ? 'font-bold bg-gradient-to-r text-transparent bg-clip-text from-orange-400 to-amber-400'
                                    : 'font-bold bg-gradient-to-r text-transparent bg-clip-text from-lime-400 to-teal-400'
                        }>
                            {props.rarity}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}