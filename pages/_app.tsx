import {ThemeProvider} from '@react95/core';
import './globals.scss';

export default function App({Component, pageProps}) {
    return (
        <ThemeProvider>
            <div className='background' />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
