import { FaceSmileIcon, CalendarIcon, ChartBarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'

import PreAuthNav from './preauth/components/PreAuthNav'
import PreAuthFooter from './preauth/components/PreAuthFooter'
import LinkButton from './general/LinkButton'
import Features from './preauth/components/Features'

const navigation = [
	{ name: 'Features', href: '#' },
	{ name: 'Pricing', href: '#' },
	{ name: 'About', href: '#' },
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
		<div className=''>
			<div className="relative overflow-hidden bg-white">

				<PreAuthNav /> 

				<main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-24 pb-16 sm:pb-24 lg:pb-32 min-h-screen">
					<div className="lg:grid lg:grid-cols-12 lg:gap-8 min-h-screen">
						<div className="md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
							<h1>
								<span className="mt-1 block text-4xl font-medium tracking-tight sm:text-4xl xl:text-5xl">
									<span className="block text-slate-800">The gamified framework for growing your net worth. </span>
								</span>
							</h1>
							<p className="mt-3 text-base text-zinc-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl list-disc">
								Aviary is a beautiful, minimalist, and enjoyable framework for achieving financial goals. 
							</p>

							<div className='flex space-x-4 mt-5 md:mt-8'>

								<LinkButton 
									text='See features' 
									href='#features'
								/>

								<LinkButton
									href='/'
									text='Try the sandbox' 
								/>

							</div>
							
						</div>

						<div className="md:mx-auto md:max-w-2xl lg:col-span-6 mt-10 lg:mt-0">
							
							<img
								className="relative mx-auto"
								width={490}
								src="https://tailwindui.com/img/features/feature-example-1.png"
								alt=""
							/>

						</div>

					</div>
				</main>
			</div>

			<Features /> 

			<PreAuthFooter />
		
		</div>
	)
}
