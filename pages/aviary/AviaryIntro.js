import { ArrowTrendingUpIcon, CheckCircleIcon, CheckIcon, FaceSmileIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AviaryIntro() {
    return (
        <div>
            <dl className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-3 text-slate-800">
                <div className="flex items-center px-3 lg:px-4 py-3 lg:py-5">
                    {/* <MagnifyingGlassIcon className='m-5 p-1 rounded-lg bg-slate-700 text-slate-200 h-10' /> */}
                    <dd className="flex-col">
                        There are 4 bird rarities <span className='ml-1 font-serif font-bold font-bold'>&rarr;</span>

                        <div>
                            <span className='mr-1 font-medium text-transparent bg-gradient-to-r bg-clip-text from-slate-600 to-slate-400'>
                                Common, 
                            </span>
                            <span className='mr-1 font-medium text-transparent bg-gradient-to-r bg-clip-text from-cyan-600 to-cyan-400'>
                                Rare, 
                            </span>
                            <span className='mr-1 font-medium text-transparent bg-gradient-to-r bg-clip-text from-green-600 to-lime-400'>
                                Exotic, 
                            </span>
                            <span className='mr-1 font-medium text-transparent bg-gradient-to-r bg-clip-text from-fuchsia-600 to-teal-400'>
                                and Legendary.
                            </span>
                        </div>
                    </dd>
                </div>
                <div className="flex items-center overflow-hidden px-3 lg:px-4 py-3 lg:py-5">
                    {/* <CheckIcon className='m-5 p-1 rounded-lg bg-slate-700 text-slate-200 h-10' /> */}

                    <dd className="inline-block">
                        Unlock new birds by completing achievements.
                    </dd>
                </div>
                <div className="flex items-center overflow-hidden px-3 lg:px-4 py-3 lg:py-5">
                    {/* <ArrowTrendingUpIcon className='m-5 p-1 rounded-lg bg-slate-700 text-slate-200 h-10' /> */}
                    <dd className="inline-block">
                        As your net worth grows, so will your Aviary! 
                    </dd>
                </div>
            
            </dl>
        </div>
    )
}
