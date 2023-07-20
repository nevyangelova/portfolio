'use client';

import React, {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import styles from './style.module.scss';

interface Story {
    id?: string;
    title: string;
    image: string;
    hero: string;
    description: string;
    url: string;
}

interface ProjectsExplorerProps {
    items: Story[];
    closeExplorer: () => void;
}

interface StoryModalProps {
    story: Story;
    onCloseModal: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({story, onCloseModal}) => {
    const [position, setPosition] = useState<{x: number, y: number}>({ 
        x: window.innerWidth / 2 - 187, 
        y: window.innerHeight / 2 - 200
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPosition({ 
            x: window.innerWidth / 2 - 187, 
            y: window.innerHeight / 2 - 200 
        });
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).tagName === 'BUTTON') {
            return;
        }
        
        if ((e.target as HTMLElement).closest('.title-bar')) {
            if (modalRef.current) {
                setInitialMousePos({ x: e.clientX, y: e.clientY });
                
                const rect = modalRef.current.getBoundingClientRect();
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
            // Check if mouse has moved at least 3px (drag threshold)
            const deltaX = Math.abs(e.clientX - initialMousePos.x);
            const deltaY = Math.abs(e.clientY - initialMousePos.y);
            
            if (deltaX > 3 || deltaY > 3) {
                setIsDragging(true);
            } else {
                return; // Don't update position until mouse has moved enough
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
        <div
            ref={modalRef}
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
                <div className='title-bar-text'>{story.title}</div>
                <div className='title-bar-controls'>
                    <button aria-label='Close' onClick={onCloseModal}></button>
                </div>
            </div>
            <div className='window-body'>
                <div className={styles.modalBody}>
                    <img
                        src={story.hero}
                        alt='Project'
                        className={styles.modalImage}
                    />
                    <p>{story.description}</p>
                </div>
                <div className={styles.modalFooter}>
                    <a
                        href={story.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='button'
                    >
                        Visit
                    </a>
                </div>
            </div>
        </div>
    );
};

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
    items,
    closeExplorer,
}) => {
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
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

    const handleStoryClick = (story: Story) => {
        setSelectedStory(story);
    };

    const handleCloseModal = () => {
        setSelectedStory(null);
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
                
                // Don't set isDragging until mouse actually moves
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
                return; // Don't update position until mouse has moved enough
            }
        }
        
        if (isDragging) {
            e.preventDefault();
            let newX = e.clientX - dragOffset.x;
            let newY = e.clientY - dragOffset.y;
            
            // Keep the window on screen
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
            // If mouse is down but hasn't moved enough yet
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
                        {items.map((item) => (
                            <div
                                key={item.id || item.title}
                                className={styles.storyItem}
                                onClick={() => handleStoryClick(item)}
                            >
                                <Image
                                    src={item.image}
                                    className={styles.storyThumbnail}
                                    width={50}
                                    height={50}
                                    alt={item.title}
                                />
                                <div className={styles.storyUsername}>
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Post />
                </div>
            </div>
            {selectedStory && (
                <StoryModal
                    story={selectedStory}
                    onCloseModal={handleCloseModal}
                />
            )}
        </>
    );
};

export default ProjectsExplorer;
