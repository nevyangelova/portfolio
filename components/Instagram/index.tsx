'use client';

import React, {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import ProjectModal from '@/components/ProjectModal';
import { projects, Project } from '@/data/projects';

interface ProjectsExplorerProps {
    closeExplorer: () => void;
}

const Post: React.FC = () => {
    return (
        <div className={styles.postContent}>
            <div className={styles.postItem}>
                <Image
                    src={'/neon5.gif'}
                    width={300}
                    height={300}
                    alt='Post'
                    className={styles.postImage}
                />
                <div className={styles.postIcons}>
                    <div className={styles.postIcon}>
                        <span>412</span>
                    </div>
                    <div className={styles.postIcon}>
                        <span>{'Those are some amazing gifs!'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectsExplorer: React.FC<ProjectsExplorerProps> = ({
    closeExplorer,
}) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [position, setPosition] = useState<{x: number, y: number}>({ 
        x: window.innerWidth / 2 - 187, 
        y: window.innerHeight / 2 - 200
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPosition({ 
            x: window.innerWidth / 2 - 187, 
            y: window.innerHeight / 2 - 200 
        });
    }, []);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).tagName === 'BUTTON') {
            return;
        }
        
        if ((e.target as HTMLElement).closest('.title-bar')) {
            if (windowRef.current) {
                setInitialMousePos({ x: e.clientX, y: e.clientY });
                
                const rect = windowRef.current.getBoundingClientRect();
                setDragOffset({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
                
                e.preventDefault();
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging && initialMousePos.x !== 0) {
            const deltaX = Math.abs(e.clientX - initialMousePos.x);
            const deltaY = Math.abs(e.clientY - initialMousePos.y);
            
            if (deltaX > 3 || deltaY > 3) {
                setIsDragging(true);
            } else {
                return;
            }
        }
        
        if (isDragging) {
            e.preventDefault();
            let newX = e.clientX - dragOffset.x;
            let newY = e.clientY - dragOffset.y;
            
            newX = Math.max(0, Math.min(newX, window.innerWidth - 375));
            newY = Math.max(0, Math.min(newY, window.innerHeight - 100));
            
            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setInitialMousePos({ x: 0, y: 0 });
    };

    useEffect(() => {
        const handleMouseMoveDocument = (e: MouseEvent) => {
            if (!isDragging && initialMousePos.x !== 0) {
                const deltaX = Math.abs(e.clientX - initialMousePos.x);
                const deltaY = Math.abs(e.clientY - initialMousePos.y);
                
                if (deltaX > 3 || deltaY > 3) {
                    setIsDragging(true);
                } else {
                    return;
                }
            }
            
            if (isDragging) {
                e.preventDefault();
                let newX = e.clientX - dragOffset.x;
                let newY = e.clientY - dragOffset.y;
                
                newX = Math.max(0, Math.min(newX, window.innerWidth - 375));
                newY = Math.max(0, Math.min(newY, window.innerHeight - 100));
                
                setPosition({ x: newX, y: newY });
            }
        };

        const handleMouseUpDocument = () => {
            setIsDragging(false);
            setInitialMousePos({ x: 0, y: 0 });
        };

        document.addEventListener('mousemove', handleMouseMoveDocument);
        document.addEventListener('mouseup', handleMouseUpDocument);

        return () => {
            document.removeEventListener('mousemove', handleMouseMoveDocument);
            document.removeEventListener('mouseup', handleMouseUpDocument);
        };
    }, [isDragging, dragOffset, initialMousePos]);

    return (
        <>
            <div
                ref={windowRef}
                className='window'
                style={{
                    width: '375px',
                    position: 'fixed',
                    top: `${position.y}px`,
                    left: `${position.x}px`,
                    zIndex: 1000,
                    cursor: isDragging ? 'grabbing' : 'default'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <div className='title-bar' style={{ cursor: 'grab' }}>
                    <button aria-label='Close' onClick={closeExplorer}></button>

                    <h1 className='title'>
                        <Image
                            src='/instawrite.png'
                            width={20}
                            height={20}
                            alt='Insta'
                            style={{
                                marginRight: '8px',
                                verticalAlign: 'bottom',
                            }}
                        />
                        Nevstagram
                    </h1>

                    <button aria-label='Resize' className='resize'></button>
                </div>
                <div className='window-body'>
                    <div className={styles.storiesContainer}>
                        <div
                            className={`${styles.storyItem} ${styles.addStory}`}
                        >
                            <div className={styles.plusIcon}></div>
                            <div className={styles.storyUsername}>
                                Your Story
                            </div>
                        </div>
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={styles.storyItem}
                                onClick={() => handleProjectClick(project)}
                            >
                                <Image
                                    src={project.image}
                                    className={styles.storyThumbnail}
                                    width={50}
                                    height={50}
                                    alt={project.title}
                                />
                                <div className={styles.storyUsername}>
                                    {project.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Post />
                </div>
            </div>
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onCloseModal={handleCloseModal}
                />
            )}
        </>
    );
};

export default ProjectsExplorer;
