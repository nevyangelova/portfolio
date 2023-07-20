'use client';

import {ProjectProvider} from '@/contexts/projectContext';
import '@sakun/system.css';

export function Providers({children}: {children: React.ReactNode}) {
    return <ProjectProvider>{children}</ProjectProvider>;
}
