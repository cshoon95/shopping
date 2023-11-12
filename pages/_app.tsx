import { AppProps } from "next/app";
import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function MyApp({ Component, pageProps}: AppProps) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider>
				<Component {...pageProps} />
			</MantineProvider>
		</QueryClientProvider>
	)
}

export default MyApp