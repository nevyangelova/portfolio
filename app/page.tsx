'use client';

import Header from '@/components/Header';
import ProjectsExplorer from '@/components/Instagram';
import {useProjects} from '@/contexts/projectContext';
import {useState} from 'react';
import Shortcuts from '@/components/Shortcuts';

export default function Home() {
    const {projects} = useProjects();
    const [explorerOpened, setExplorerOpened] = useState(true);
    const [skillsOpened, setSkillsOpened] = useState(false);

    const closeExplorer = () => setExplorerOpened(false);
    const openExplorer = () => setExplorerOpened(true);

    return (
        <main>
                <Header />
                <Shortcuts
                    openExplorer={openExplorer}
                />
                {explorerOpened && (
                    <ProjectsExplorer
                        items={projects}
                        closeExplorer={closeExplorer}
                    />
                )}
        </main>
    );
}
