import { FaceSmileIcon, CalendarIcon, ChartBarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'

import PreAuthNav from './preauth/components/PreAuthNav'
import PreAuthFooter from './preauth/components/PreAuthFooter'
import LinkButton from './general/LinkButton'
import LinkButtonDark from './general/LinkButtonDark'
import Features from './preauth/components/Features'
import Pricing from './preauth/components/Pricing'

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
		style: "ml-10 text-lg font-semibold leading-8 bg-gradient-to-r text-transparent bg-clip-text from-teal-500 to-green-500" 
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
					<div className="lg:grid lg:grid-cols-12 lg:gap-8 ">
						<div className="md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
							<h1>
								<span className="mt-5 block text-4xl font-semibold tracking-tight sm:text-4xl xl:text-5xl">
									<span className="block text-slate-800">The gamified framework for growing your net worth. </span>
								</span>
							</h1>
							<p className="my-5 text-base text-zinc-600 sm:mt-8 sm:text-xl lg:text-lg xl:text-xl list-disc">
								Working toward financial goals should be hassle-free and enjoyable. 
								Aviary gamifies simple steps to help you consistently track and grow your net worth.  
							</p>

							<div className='flex space-x-4 mt-10 border-none border-slate-500 lg:pt-5 lg:border-t lg:border-dashed border-slate-500'>

								<LinkButton 
									text='See features' 
									href='#features'
								/>

								<LinkButtonDark
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

			<Pricing />

			<PreAuthFooter />
		
		</div>
	)
}
