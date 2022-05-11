import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Navigation from '../features/navigation/Navigation';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navigation>
                <Component {...pageProps} />
            </Navigation>
        </>
    );
}

export default MyApp;
