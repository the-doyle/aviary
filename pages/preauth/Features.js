import OverlappingBirdCards from './OverlappingBirdCards'
import LinkButton from '../general/LinkButton'

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
    return (

        <div name='features' id='features' className="relative overflow-hidden bg-gray-50">
            <div className="overflow-hidden py-16 lg:py-24">
                <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
                    <div className="relative">
                        <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                            Financial goals are tough
                        </h2>
                        <p className="mx-auto mt-4 max-w-4xl text-center text-xl text-gray-500">
                            Personal finance can be boring, and staying consistent over months/years is difficult 
                        </p>
                    </div>

                    <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                        <div className="relative">
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Personal finance, gamified</h3>
                            <p className="mt-3 text-lg text-gray-500">
                                Aviary pairs beautiful, minimalist goal-setting tools with handcrafted, digitally collectible bird cards. 
                            </p>

                            <dl className="mt-10 space-y-10">
                                {appFeatures.map((item) => (
                                <div key={item.id} className="relative">
                                    <dt>
                                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-green-200 text-green-700">
                                        <item.icon className="h-8 w-8" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{item.name}</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
                                </div>
                                ))}
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

                    <div className="relative mt-12 sm:mt-16 lg:mt-24">
                        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
                            <div className="lg:col-start-2">
                                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Grow your Aviary</h3>
                                <p className="mt-3 mb-5 text-lg text-gray-500">
                                    Aviary incentivizes long-term consistency. Come back monthly to track your progress (and tweak your goals). 
                                    As you do, you&apos;ll unlock new birds that celebrate your achievements. 
                                </p>
                                <LinkButton href='/sign-up' text='Get started' link />  
                            </div>

                            <div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
                                <OverlappingBirdCards />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
