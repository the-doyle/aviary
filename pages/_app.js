import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Aviary</title>
				<meta name="description" content="Aviary Finance" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>


			<main>
				<Component {...pageProps} />
			</main>

		</>
	)
}
