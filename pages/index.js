import PreAuthNav from './preauth/PreAuthNav'
import PreAuthFooter from './preauth/PreAuthFooter'
import LinkButton from './general/LinkButton'
import LinkButtonDark from './general/LinkButtonDark'
import Features from './preauth/Features'
import Pricing from './preauth/Pricing'
import Image from 'next/image'

export default function Index() {

	return (
		<div className=''>

			<div className="overflow-hidden bg-skin-inverted">

				<PreAuthNav /> 

				<main className="relative mx-auto mt-10 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-24 pb-16 sm:pb-24 lg:pb-56">
					<div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:place-items-center">
						<div className="md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
							<h1>
								<span className="mt-5 block text-4xl font-semibold tracking-tight sm:text-4xl xl:text-5xl">
									<span className="block text-skin-base">The gamified framework for growing your net worth. </span>
								</span>
							</h1>
							<p className="my-5 text-base text-skin-base sm:mt-8 sm:text-xl lg:text-lg xl:text-xl list-disc">
								Working toward financial goals should be hassle-free and enjoyable. 
								Aviary gamifies simple steps to help you consistently track and grow your net worth.  
							</p>

							<div className='z-40 flex space-x-4 mt-10 border-none border-skin-base lg:pt-5 lg:border-t lg:border-dashed'>

								<LinkButton
									text='See features' 
									href='#features'
								/>

								<LinkButtonDark
									href='/sign-up'
									text='Get started' 
									link
								/>

							</div>
							
						</div>

						<div className="md:mx-auto md:max-w-2xl lg:col-span-6 mt-10 lg:mt-32 relative z-20 flex place-items-center">

								<Image 
									src='/chart.png'
									height={600}
									width={600}
									alt="Chart"
									className='shadow-lg rounded-lg relative lg:absolute z-10 lg:right-16 lg:top-10'
								/>
								
								<Image 
									src='/accounts.png'
									height={500}
									width={500}
									alt="Accounts"
									className='shadow-lg rounded-lg hidden lg:block relative left-20 bottom-24'
								/>	

								<div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
									<svg
									className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
									viewBox="0 0 1155 678"
									xmlns="http://www.w3.org/2000/svg"
									>
									<path
										fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
										fillOpacity=".3"
										d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
									/>
									<defs>
										<linearGradient
										id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
										x1="1155.49"
										x2="-78.208"
										y1=".177"
										y2="474.645"
										gradientUnits="userSpaceOnUse"
										>
										<stop stopColor="#8b5cf6" />
										<stop offset={1} stopColor="#c4b5fd" />
										</linearGradient>
									</defs>
									</svg>
								</div>

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
