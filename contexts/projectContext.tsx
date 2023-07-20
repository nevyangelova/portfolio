'use client';
import React, { createContext, useContext } from 'react';

interface Project {
  title: string;
  image: string;
  description: string;
  url: string;
  hero: string;
}

interface ProjectContextType {
  projects: Project[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}

const projects: Project[] = [
  { title: 'Scomot', image: '/scomot.png', description: 'Description 3', url: 'https://scomot.com', hero: '/magicbanner.png' },
  { title: 'Mаttermost', image: '/mattermost.webp', description: 'Description 3', url: 'https://community.mattermost.com', hero: '/magicbanner.png' },
  { title: 'Neon Game', image: '/neon7.gif', description: 'Description 1', url: 'https://neon.game', hero: '/magicbanner.png' },
  { title: 'Degen Coin Flip', image: '/degen.png', description: 'Description 2', url: 'https://degencoinflip.com', hero: '/magicbanner.png' },
  { title: 'Friday.de', image: '/friday.png', description: 'Description 3', url: 'https://friday.de', hero: '/magicbanner.png' },
  { title: 'Babbel', image: '/babbel.png', description: 'Description 3', url: 'https://babbel.com', hero: '/magicbanner.png' },
];

type ProjectProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const contextValue: ProjectContextType = {
    projects,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider, ProjectContext };
