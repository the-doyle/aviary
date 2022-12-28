import { FaceSmileIcon, CalendarIcon, ChartBarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'

import PreAuthNav from './preauth/components/PreAuthNav'
import PreAuthFooter from './preauth/components/PreAuthFooter'
import LinkButton from './general/LinkButton'
import BirdCard from './general/BirdCard'

const navigation = [
	{ name: 'Features', href: '#' },
	{ name: 'Pricing', href: '#' },
	{ name: 'About', href: '#' },
]

const birds = [
    {mt: 'mt-0', rarity: 'Common', name: 'House sparrow', date: 'Jan 2023', description: 'House sparrows have a wingbeat rate of roughly 15 times per second'}, 
    {mt: 'mt-12', rarity: 'Rare', name: 'North American Blackbird', date: 'Dec 2022', description: 'These blackbirds always lay two eggs, nurturing both birds'}, 
    {mt: 'mt-24', rarity: 'Exotic', name: 'Bald eagle', date: 'Aug 2022', description: 'Bald eagles wait around for the salmon run in Alaska before flying south'}, 
    {mt: 'mt-36', rarity: 'Legendary', name: 'King penguin', date: 'Mar 2023', description: 'King penguins can reach a height of over 35 inches'},
]

const basicFeatures = [
	{ 	
		description: 'Check in every month', 
		icon: CalendarIcon, 
		iconStyle: 'absolute mt-1 h-6 w-6 text-teal-500',
		style: "ml-10 text-lg font-semibold leading-8 bg-gradient-to-r text-transparent bg-clip-text from-teal-500 to-emerald-500" 
	},
	{ 	
		description: 'Visualize your progress', 
		icon: ChartBarIcon, 
		iconStyle: 'absolute mt-1 h-6 w-6 text-cyan-500',
		style: "ml-10 text-lg font-semibold leading-8 bg-gradient-to-r text-transparent bg-clip-text from-cyan-500 to-blue-500" 
	},
	{ 	
		description: 'Unlock achievements', 
		icon: CheckBadgeIcon, 
		iconStyle: 'absolute mt-1 h-6 w-6 text-blue-500',
		style: "ml-10 text-lg font-semibold leading-8 bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-indigo-500" 
	},
	{ 	
		description: 'Collect beautiful birds', 
		icon: FaceSmileIcon, 
		iconStyle: 'absolute mt-1 h-6 w-6 text-fuchsia-500',
		style: "ml-10 text-lg font-semibold leading-8 bg-gradient-to-r text-transparent bg-clip-text from-fuchsia-500 to-red-500" 
	}
]

export default function Index() {
	return (
		<div className="relative overflow-hidden bg-white">
			<div className="relative">

				<PreAuthNav /> 

				<main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32 pb-16 sm:pb-24 lg:pb-32 min-h-screen">
					<div className="lg:grid lg:grid-cols-12 lg:gap-8">
						<div className="md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
							<h1>
								<span className="mt-1 block text-4xl font-medium tracking-tight sm:text-4xl xl:text-5xl">
									<span className="block text-slate-800">The gamified framework for growing your net worth. </span>
								</span>
							</h1>
							<p className="mt-3 text-base text-zinc-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl list-disc">
								Aviary helps you achieve long-term financial goals with a simple, gamified set of tools: 
							</p>
							<div className='ml-3 mt-5'>
								{basicFeatures.map((feature) => (
									<dt key={feature.description}>
										<feature.icon className={feature.iconStyle} />
										<p className={feature.style}>{feature.description}</p>
									</dt>
								))}
							</div>

							<div className='flex space-x-4 mt-5 md:mt-8'>

								<LinkButton 
									text='Get started' 
									href='/'
								/>

								<LinkButton
									href='/'
									text='Try the sandbox' 
								/>

							</div>
							
						</div>
						<div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
							
						<div className='grid grid-cols-6 gap-0'>
							{birds.map((bird) => (
								<div key={bird.name} className={bird.mt}>
									<BirdCard rarity={bird.rarity} name={bird.name} date={bird.date} description={bird.description} /> 
								</div>
							))}
						</div>
							

						</div>
					</div>
				</main>

				<PreAuthFooter />
			</div>
		</div>
	)
}
