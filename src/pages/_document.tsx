import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/icon?family=Material+Icons'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Inter&display=optional'
                    rel='stylesheet'
                />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}
