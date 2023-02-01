import LinkButtonDark from '../general/LinkButtonDark'
import { useState } from 'react'
import UnlockableBird from '../aviary/UnlockableBird'
import AchievementButtonFree from '../achievements/AchievementButtonFree'

import {
    CakeIcon,
    CalendarDaysIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/outline'

const appFeatures = [
    {
        id: 1,
        name: 'Set goals',
        description:
            'Aviary helps you set short, medium, and long term goals for growing your net worth.',
        icon: CheckBadgeIcon,
    },
    {
        id: 2,
        name: 'Monthly check-in',
        description:
            "Come back to Aviary once each month to track your progress with beautiful charts and graphs.",
        icon: CalendarDaysIcon,
    },
    {
        id: 3,
        name: 'Make it fun',
        description:
            'As you grow, so will your Aviary. Unlock hand-drawn birds as you reach financial goals.',
        icon: CakeIcon,
    },
]

export default function Features() {
    const [feathers, setFeathers] = useState(2)

    return (

        <>
        <div name='features' id='features' className="relative overflow-hidden bg-skin-secondary">
            <div className="overflow-hidden py-16 lg:py-24">
                <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
                    <div className="relative">
                        <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-skin-brand sm:text-4xl">
                            Financial goals are tough
                        </h2>
                        <p className="mx-auto mt-4 max-w-4xl text-center text-xl text-skin-light">
                            Personal finance can be boring, and staying consistent over months/years is difficult 
                        </p>
                    </div>

                    <div className="relative mt-20 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                        <div className="relative">
                            <h3 className="text-2xl font-medium tracking-tight text-skin-base sm:text-3xl">Personal finance, gamified</h3>
                            <p className="mt-3 text-lg text-skin-light">
                                Aviary pairs beautiful, minimalist goal-setting tools with handcrafted, digitally collectible bird cards. 
                            </p>

                            <dl className="mt-10 space-y-10">
                                {appFeatures.map((item) => (
                                <div key={item.id} className="relative">
                                    <dt>
                                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-skin-brand-light-hover text-skin-brand-hover">
                                        <item.icon className="h-8 w-8" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg font-medium leading-6 text-skin-base">{item.name}</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-skin-light">{item.description}</dd>
                                </div>
                                ))}
                                <LinkButtonDark href='/sign-up' text='Get started for free' link />  
                            </dl>
                        </div>

                        <div className="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
                            <img
                                className="relative mx-auto"
                                width={490}
                                src="https://tailwindui.com/img/features/feature-example-1.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {/* <div name='aviaryfeatures' id='aviaryfeatures' className="relative overflow-hidden">
            <div className="overflow-hidden py-16 lg:py-24">
                <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
                    <div className="relative">
                        <div className="relative">
                            <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-skin-base sm:text-4xl">
                                Grow your Aviary
                            </h2>
                            <p className="mx-auto mt-4 max-w-4xl lg:text-center text-xl text-skin-light">
                            Aviary incentivizes long-term consistency. Check-in monthly to complete achievements, earn feathers, and unlock new birds.
                            </p>
                        </div>

                        <div className="relative mt-12 sm:mt-16 lg:mt-24">
                            <div className="relative -mx-4 mt-10 lg:mt-0">
                                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>

                                    <div className='col-span-2 my-4 px-10 lg:px-20'>
                                        <div className="text-2xl font-medium text-skin-base text-center mb-5 flex justify-between content-center items-center">
                                            <h1>Achievements</h1>
                                            <p className='text-base text-skin-base'>Balance: {feathers} 🪶</p>
                                        </div>
                                        <div className='flex-col py-4 items-center'>
                                            <div className='flex justify-between'>
                                                <div className='flex-col justify-between align-middle'>
                                                    <h1 className='text-lg text-skin-brand font-semibold'>Hatchling</h1>
                                                    <p className='text-base text-skin-light'>Set your first goal</p>
                                                </div>
                                                <div className='flex-col text-center'>
                                                    <AchievementButtonFree feathers={feathers} setFeathers={setFeathers} value={3} /> 
                                                </div>
                                            </div>
                                        </div> 

                                        <div className='flex-col py-4 items-center'>
                                            <div className='flex justify-between'>
                                                <div className='flex-col justify-between align-middle'>
                                                    <h1 className='text-lg text-skin-brand font-semibold'>Down feathers</h1>
                                                    <p className='text-base text-skin-light'>Add 5 accounts to your Aviary</p>
                                                </div>
                                                <div className='flex-col text-center'>
                                                    <AchievementButtonFree feathers={feathers} setFeathers={setFeathers} value={5} /> 
                                                </div>
                                            </div>
                                        </div> 
                                    </div>

                                    <UnlockableBird 
                                        birdName="Pine grosbeak" 
                                        feathers={feathers} 
                                        setFeathers={setFeathers}
                                        cost={3} 
                                        description="Pine grosbeaks are some of the plumpest finches. They are somewhat sluggish and tame." 
                                        unlocked
                                    /> 
                                    <UnlockableBird 
                                        birdName="Superb fairywren" 
                                        feathers={feathers} 
                                        setFeathers={setFeathers}
                                        cost={8} 
                                        description="These birds are cooperative breeders. Groups of 3-5 birds will defend and maintain territories year-round as they raise their young. " 
                                    /> 
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        
        
        </>
    )
}
