import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Navigation from '../components/Navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Navigation>
                <Component {...pageProps} />
            </Navigation>
        </QueryClientProvider>
    );
}

export default MyApp;
