import Link from "next/link"

export default function PreAuthFooter() {
	return (
	<footer className="bg-white">
		<div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
			<div className="mt-8 md:mt-0">
				<p className="text-center text-base text-skin-muted">&copy; 2023 Aviary Finance. All rights reserved.</p>
			</div>
			<div className='text-skin-muted text-center'> Bird icon made by <Link href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </Link></div>
		</div>
	</footer>
	)
}
