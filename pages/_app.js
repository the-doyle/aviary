import '../styles/globals.css'
import nProgress from 'nprogress'
import Head from 'next/head'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
	const [supabase] = useState(() => createBrowserSupabaseClient())

	return (
		<>
			<Head>
				<title>Aviary</title>
				<meta name="description" content="Aviary Finance" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
				<main>
					<Component {...pageProps} />
				</main>
			</SessionContextProvider>
		</>
	)
}
