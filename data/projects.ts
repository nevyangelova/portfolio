export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  url: string;
  hero: string;
  technologies: string[];
  category: 'work' | 'freelance' | 'opensource';
  githubUrl?: string;
  images: string[];
}

export const projects: Project[] = [
  { 
    id: 'seedworld',
    title: 'Seedworld',
    image: '/seedworld/seedworld-logo.jpeg',
    description: 'Architected and implemented their Blockchain gaming website with smart contract integration, enabling users to earn passive rewards through yield-generating NFTs. Implemented NFT staking, TGE, farming, token burn mechanisms, marketing pages using Framer motion. The platform processed over $2M in total value locked within the first month of launch.',
    url: 'https://seedworld.io',
    hero: '/seedworld/lp.jpeg',
    technologies: ['React', 'TypeScript', 'Next.js', 'Python', 'Node.js', 'MongoDB', 'AWS', 'Github Actions', 'Web3.js', 'Ethers', 'Tailwind CSS', 'Framer Motion', 'Wagmi', 'WebSockets'],
    category: 'work',
    images: [
      '/seedworld/seedworld.png',
      '/seedworld/palm.webp',
      '/seedworld/seedbg.png',
      '/seedworld/wp.jpeg',
    ]
  },
  { 
    id: 'seedify',
    title: 'Seedify NFT Launchpad',
    image: '/seedworld/seedify-logo.jpg',
    description: 'A comprehensive project management platform designed for software development teams. I led the frontend development and implemented real-time collaboration features using React and WebSockets. The platform includes task management, documentation, and seamless integration with GitHub, enabling teams to streamline their workflow.',
    url: 'https://seedify.fund/nft',
    hero: '/seedworld/seedifyhero.png',
    technologies: ['React', 'TypeScript', 'Next.js', 'Python', 'Node.js', 'MongoDB', 'AWS', 'Github Actions', 'Web3.js', 'Ethers', 'Tailwind CSS', 'Framer Motion', 'Wagmi', 'WebSockets'],
    category: 'work',
    images: [
      '/seedworld/portal.png',
      '/seedworld/seedify.png',
      '/seedworld/character.png',
    ]
  },
  { 
    id: 'scomot',
    title: 'Scomot',
    image: '/scomot/scomot.png',
    description: 'A comprehensive market analyser and project management platform designed for online ecommerce businesses. I designed and led the development of multiple MVP features, securing seed funding for the founder. The platform includes shipping pricing calculator, shipping management, tax advice and more and its currently in development.',
    url: 'https://scomot.com',
    hero: '/scomot/background.svg',
    technologies: ['React', 'TypeScript', 'Next.js', 'Python', 'Go', 'MongoDB', 'AWS', 'Terraform', 'DynamoDB', 'Github Actions', 'Figma'],
    category: 'freelance',
    images: [
      '/scomot/login.png',
      '/scomot/calculation.png',
      '/scomot/modal.png',
      '/scomot/signup.png',
    ]
  },
  {
    id: 'mattermost',
    title: 'Mattermost',
    image: '/mattermost/mattermost.webp',
    description: 'Contributed to the Mattermost open-source collaboration platform by developing features and fixing bugs. Worked closely with the community to improve user experience, performance, and accessibility. Implemented various UI components and helped with the maintenance of the codebase, implemented a design system using Storybook.',
    url: 'https://mattermost.com',
    hero: '/mattermost/hero.png',
    technologies: ['React', 'Go', 'TypeScript', 'Redux', 'Jest', 'Cypress', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'PostgreSQL', 'Testing Library', 'Github Actions'],
    category: 'opensource',
    githubUrl: 'https://github.com/mattermost/mattermost',
    images: [
      '/mattermost/ai.png',
      '/mattermost/plugin.png',
      '/mattermost/tablet.png',
      '/mattermost/ui.png',
      '/mattermost/welcome.png'
    ]
  },
  {
    id: 'neon-game',
    title: 'Neon Game',
    image: '/neon/neon7.gif',
    description: 'An immersive browser-based gaming platform featuring stunning neon visuals and interactive elements. I created the brand identify and gifs, architected the front-end and implemented the backend for interacting with the smart contracts, implementing beatiful animations and particle effects. The game features multiple levels with increasing difficulty and a global leaderboard system.',
    url: 'https://neon.game',
    hero: '/neon/hero.png',
    technologies: ['React', 'Redux', 'Web3.js', 'Ethers', 'Framer Motion', 'Node.js', 'MongoDB', 'AWS'],
    category: 'freelance',
    images: [
      '/neon/banner.gif',
      '/neon/neon7.gif',
      '/neon/neon1.gif',
      '/neon/neon6.gif',
      '/neon/stakeui.jpeg'
    ]
  },
  {
    id: 'magic-folk',
    title: 'Magic Folk',
    image: '/magic/magic.gif',
    description: 'A cute and simple 3D Nft collection aimed at creating a community around the project. I helped with the brand identify, architected the front-end and implemented the backend for interacting with the smart contracts',
    url: 'https://opensea.io/collection/magicfolk-genesis',
    hero: '/magic/magicbanner.png',
    technologies: ['React', 'Next.js', 'Web3.js', 'Ethers', 'Framer Motion', 'Node.js', 'Figma'],
    category: 'freelance',
    images: [
      '/magic/dark.avif',
      '/magic/web.avif',
      '/magic/fire.png',
      '/magic/modes.gif',
    ]
  },
  {
    id: 'degen-coin-flip',
    title: 'Degen Coin Flip',
    image: '/degen/degen.png',
    description: 'A decentralized gambling application built on blockchain technology on the Solana network. Users can bet cryptocurrency on coin flips with provably fair results. I implemented the smart contracts integration and built the initial frontend interface with React, Next and Web3.js, ensuring secure transactions and transparent outcomes.',
    url: 'https://degencoinflip.com',
    hero: '/degen/bethero.png',
    technologies: ['React', 'Web3', 'Solidity', 'Ethereum', 'Next.js', 'Web3.js', 'Tailwind CSS', 'Framer Motion', 'Wagmi', 'Node.js', 'Express', 'MongoDB', 'WebSockets'],
    category: 'freelance',
    images: [
      '/degen/connect.png',
      '/degen/light.png',
      '/degen/bet.png',
      '/degen/mythic.png',
    ]
  },
  {
    id: 'friday',
    title: 'Friday.de',
    image: '/friday/friday.png',
    description: 'A digital insurance platform that simplifies the process of obtaining and managing insurance policies. I worked on developing the user interface, implementing form validation, and integrating payment gateways. The platform features a customer dashboard for managing policies and submitting claims.',
    url: 'https://friday.de',
    hero: '/friday/landing.png',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS', 'Redux', 'Docker', 'Kubernetes', 'Python'],
    category: 'work',
    images: [
      '/friday/funnel1.png',
      '/friday/funnel2.png',
      '/friday/plans.png',
    ]
  },
  {
    id: 'babbel',
    title: 'Babbel',
    image: '/babbel/babbel.png',
    description: 'Contributed to the development of Babbel\'s language learning platform, focusing on interactive exercises and speech recognition features. Implemented responsive designs for mobile and desktop interfaces, improved accessibility, and optimized performance to enhance user engagement and retention.',
    url: 'https://babbel.com',
    hero: '/babbel/landing.png',
    technologies: ['React', 'TypeScript', 'Ruby', 'Rails', 'Python', 'Docker', 'Kubernetes', 'Flux', 'Redux'],
    category: 'work',
    images: [
      '/babbel/lesson.png',
      '/babbel/lesson2.png',
      '/babbel/live.png',
    ]
  },
];