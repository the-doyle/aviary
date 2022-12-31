import PreAuthNav from './preauth/PreAuthNav'
import PreAuthFooter from './preauth/PreAuthFooter'
import LinkButton from './general/LinkButton'
import LinkButtonDark from './general/LinkButtonDark'
import Features from './preauth/Features'
import Pricing from './preauth/Pricing'
import Image from 'next/image'
import BackgroundBirds from './general/BackgroundBirds'

export default function Index() {
	return (
		<div className=''>

			<div className="relative z-10 overflow-hidden bg-white">

				<PreAuthNav /> 


				<BackgroundBirds />

				<main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-24 pb-16 sm:pb-24 lg:pb-32 min-h-screen">
					<div className="lg:grid lg:grid-cols-12 lg:gap-8 ">
						<div className="md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
							<h1>
								<span className="mt-5 block text-4xl font-semibold tracking-tight sm:text-4xl xl:text-5xl">
									<span className="block text-slate-800">The gamified framework for growing your net worth. </span>
								</span>
							</h1>
							<p className="my-5 text-base text-black sm:mt-8 sm:text-xl lg:text-lg xl:text-xl list-disc">
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
							
							{/* <img
								className="relative mx-auto"
								width={490}
								src="https://tailwindui.com/img/features/feature-example-1.png"
								alt=""
							/> */}

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
