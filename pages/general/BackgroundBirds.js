import bird from '../../public/bird.png'
import finch from '../../public/finch.png'
import woodpecker from '../../public/woodpecker.png'
import Image from 'next/image'

export default function BackgroundBirds() {
    return (
        <div className='max-h-screen'>
            <div className='absolute invisible md:visible opacity-20 mt-5 z-0 grid grid-flow-row grid-rows-12 grid-cols-12'>
                {Array.from({ length: 100 }, (_, i) => i % 5 == 0 ? <Image key={i} alt='bird' src={i % 15 == 0 ? finch : i % 10 == 0 ? woodpecker : bird} className="bg-transparent" /> : <p key={i}></p> )}
            </div>

            <div className='absolute visible md:invisible opacity-20 mt-5 z-0 grid grid-flow-row grid-rows-12 grid-cols-12'>
                {Array.from({ length: 350 }, (_, i) => i % 17 == 0 ? <Image key={i} alt='bird' src={i % 51 == 0 ? finch : i % 34 == 0 ? woodpecker : bird} className="bg-transparent" /> : <p key={i}></p> )}
            </div>
        </div>
    )
}