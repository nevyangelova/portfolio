import {ThemeProvider} from '@react95/core';
import {ProjectProvider} from '../contexts/projectContext';
import './globals.scss';

export default function App({Component, pageProps}) {
    return (
        <ThemeProvider theme={'highContrast'}>
            <ProjectProvider>
                <div className='background' />
                <Component {...pageProps} />
            </ProjectProvider>
        </ThemeProvider>
    );
}
