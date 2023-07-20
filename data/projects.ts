export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  url: string;
  hero: string;
  technologies: string[];
  category: 'work' | 'personal' | 'opensource';
  featured: boolean;
}

export const projects: Project[] = [
  { 
    id: 'scomot',
    title: 'Scomot',
    image: '/scomot.png',
    description: 'A comprehensive project management platform',
    url: 'https://scomot.com',
    hero: '/magicbanner.png',
    technologies: ['React', 'TypeScript', 'Node.js'],
    category: 'work',
    featured: true
  },
  {
    id: 'mattermost',
    title: 'Mattermost',
    image: '/mattermost.webp',
    description: 'Open-source collaboration platform',
    url: 'https://community.mattermost.com',
    hero: '/magicbanner.png',
    technologies: ['React', 'Go', 'TypeScript'],
    category: 'opensource',
    featured: true
  },
  {
    id: 'neon-game',
    title: 'Neon Game',
    image: '/neon7.gif',
    description: 'Interactive gaming platform',
    url: 'https://neon.game',
    hero: '/magicbanner.png',
    technologies: ['React', 'WebGL', 'Three.js'],
    category: 'work',
    featured: true
  },
  {
    id: 'degen-coin-flip',
    title: 'Degen Coin Flip',
    image: '/degen.png',
    description: 'Cryptocurrency gaming platform',
    url: 'https://degencoinflip.com',
    hero: '/magicbanner.png',
    technologies: ['React', 'Web3', 'Solidity'],
    category: 'work',
    featured: false
  },
  {
    id: 'friday',
    title: 'Friday.de',
    image: '/friday.png',
    description: 'Digital insurance platform',
    url: 'https://friday.de',
    hero: '/magicbanner.png',
    technologies: ['React', 'TypeScript', 'Node.js'],
    category: 'work',
    featured: false
  },
  {
    id: 'babbel',
    title: 'Babbel',
    image: '/babbel.png',
    description: 'Language learning platform',
    url: 'https://babbel.com',
    hero: '/magicbanner.png',
    technologies: ['React', 'TypeScript', 'Python'],
    category: 'work',
    featured: false
  }
]; 