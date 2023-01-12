import BirdPic from '../../public/bird.png'
import Image from "next/image";

export default function Bird(props) {

    if (props.unlocked) {
        return (
            <div className='flex flex-col justify-center text-center'>
                <Image className='w-64' src={BirdPic} />
                <h1 className='text-md font-medium text-slate-600'>American Robin 💎</h1>
            </div>
        ) 
    }

    return (
        <div className='flex flex-col justify-center text-center'>
            <Image className='w-64 opacity-15 grayscale' src={BirdPic} />
            <h1 className='text-md font-medium text-slate-200 blur-xs'>American Robin</h1>
        </div>
    )
}