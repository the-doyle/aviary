import { MapIcon } from '@heroicons/react/24/outline'
import { useTour } from '@reactour/tour'

export default function Tour(props) {
    const { setIsOpen } = useTour() 

    return (
        <button 
        onClick={() => setIsOpen(true)}
        className='transition-all group flex justify-center items-center rounded-md text-skin-light hover:text-skin-base bg-skin-secondary hover:bg-skin-secondary-hover px-3 py-1 text-sm font-medium focus:outline-none'>
            Tutorial
            <MapIcon className='ml-1.5 h-5 rounded-full'/>
        </button>
    )
}