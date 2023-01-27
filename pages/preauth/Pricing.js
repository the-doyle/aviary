import { CheckIcon } from '@heroicons/react/24/outline'
import LinkButton from '../general/LinkButton'
import LinkButtonDark from '../general/LinkButtonDark'

const features = [
    'Track your net worth',
    'Set long-term goals',
    'Vizualize your progress',
    // 'Premium themes',
    // 'Email reminders',
    'Unlock achievements',
    'Collect digital hand-drawn birds',
    'More features coming soon!',
]

export default function Pricing() {
    return (
        <div name='pricing' id='pricing' className="relative overflow-hidden bg-slate-50">
            <div className="overflow-hidden py-16 lg:py-24">
                <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
                    <div className="pb-16 xl:flex xl:items-center xl:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight sm:text-5xl">
                                <span className="text-slate-900">Start growing your Aviary for free</span>
                                {/* <span className="text-slate-200 line-through"> $30 / year</span> */}
                                <span className="text-slate-300"> (beta)</span>
                            </h1>
                        </div>
                    </div>
                    <div className="border-slate-500 border-t border-dashed border-slate-500 pt-16 xl:grid xl:grid-cols-3 xl:gap-x-8">
                        <div>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Packed with premium features</p>
                            <p className="mt-4 text-lg text-slate-500">
                                Aviary includes everything you need to set goals, track your progress, and grow your net worth. 
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-x-8 xl:col-span-2 xl:mt-0">
                            <ul role="list" className="divide-y divide-slate-200">
                            {features.slice(0, 4).map((feature, featureIdx) =>
                                featureIdx === 0 ? (
                                <li key={feature} className="flex py-4 md:py-0 md:pb-4">
                                    <CheckIcon className="h-6 w-6 flex-shrink-0 text-green-500" aria-hidden="true" />
                                    <span className="ml-3 text-base text-slate-500">{feature}</span>
                                </li>
                                ) : (
                                <li key={feature} className="flex py-4">
                                    <CheckIcon className="h-6 w-6 flex-shrink-0 text-green-500" aria-hidden="true" />
                                    <span className="ml-3 text-base text-slate-500">{feature}</span>
                                </li>
                                )
                            )}
                            </ul>
                            <ul role="list" className="divide-y divide-slate-200 border-t border-slate-200 md:border-t-0">
                            {features.slice(4).map((feature, featureIdx) =>
                                featureIdx === 0 ? (
                                <li key={feature} className="flex py-4 md:border-t-0 md:py-0 md:pb-4">
                                    <CheckIcon className="h-6 w-6 flex-shrink-0 text-green-500" aria-hidden="true" />
                                    <span className="ml-3 text-base text-slate-500">{feature}</span>
                                </li>
                                ) : (
                                <li key={feature} className="flex py-4">
                                    <CheckIcon className="h-6 w-6 flex-shrink-0 text-green-500" aria-hidden="true" />
                                    <span className="ml-3 text-base text-slate-500">{feature}</span>
                                </li>
                                )
                            )}
                            </ul>
                        </div>
                    </div>


                    <div className='flex space-x-4 mt-10'>

                        <LinkButton 
                            text='Get started for free' 
                            href='/sign-up'
                            link
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}
