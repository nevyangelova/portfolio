'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import { Project } from '@/data/projects';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';

interface ProjectModalProps {
    project: Project;
    onCloseModal: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onCloseModal }) => {
    // Initialize with absolute position in pixels (centered)
    const [position, setPosition] = useState<{x: number, y: number}>({ 
        x: window.innerWidth / 2 - 300, // Half of window width - half of modal width
        y: window.innerHeight / 2 - 250 // Approximate modal height 
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
    const [activeImage, setActiveImage] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);

    const projectImages = [project.hero, ...project.images];

    useEffect(() => {
        setPosition({ 
            x: window.innerWidth / 2 - 300, 
            y: window.innerHeight / 2 - 250
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
            
            newX = Math.max(0, Math.min(newX, window.innerWidth - 600));
            newY = Math.max(0, Math.min(newY, window.innerHeight - 450));
            
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
                
                newX = Math.max(0, Math.min(newX, window.innerWidth - 600));
                newY = Math.max(0, Math.min(newY, window.innerHeight - 450));
                
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
                width: '600px',
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
                <div className='title-bar-text'>{project.title}</div>
                <div className='title-bar-controls'>
                    <button aria-label='Close' onClick={onCloseModal}></button>
                </div>
            </div>
            <div className='window-body'>
                <div className={styles.modalContent}>
                    <div className={styles.imageGallery}>
                        <div className={styles.mainImage}>
                            <img 
                                src={projectImages[activeImage]} 
                                alt={project.title} 
                                className={styles.heroImage}
                                onError={(e) => {
                                    // Fallback to hero image if custom images can't be loaded
                                    const target = e.target as HTMLImageElement;
                                    if (target.src !== project.hero) {
                                        target.src = project.hero;
                                    }
                                }}
                            />
                        </div>
                        <div className={styles.thumbnails}>
                            {projectImages.map((img, index) => (
                                <div 
                                    key={index}
                                    className={`${styles.thumbnail} ${activeImage === index ? styles.active : ''}`}
                                    onClick={() => setActiveImage(index)}
                                >
                                    <img 
                                        src={img} 
                                        alt={`${project.title} thumbnail ${index}`} 
                                        onError={(e) => {
                                            // Hide thumbnail if image can't be loaded
                                            const parent = (e.target as HTMLImageElement).parentElement;
                                            if (parent) parent.style.display = 'none';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.projectDetails}>
                        <h2>{project.title}</h2>
                        
                        <div className={styles.projectDescription}>
                            <p>{project.description}</p>
                        </div>

                        <div className={styles.technologies}>
                            <h3>Technologies</h3>
                            <div className={styles.techTags}>
                                {project.technologies?.map((tech) => (
                                    <span key={tech} className={styles.tag}>{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div className={styles.projectMeta}>
                            <div className={styles.metaItem}>
                                <FaCalendarAlt />
                                <span>2023</span>
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.categoryBadge}>{project.category}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.projectActions}>
                        <a
                            href={project.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='button'
                        >
                            <FaExternalLinkAlt /> Visit Website
                        </a>
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='button'
                            >
                                <FaGithub /> View Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal; 