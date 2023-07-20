'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.scss';
import {FaUser, FaMusic, FaInstagram, FaCode, FaEnvelope} from 'react-icons/fa';
import MusicPlayer from '@/components/MusicPlayer';

interface ShortcutsProps {
    openExplorer: () => void;
    openSkills?: () => void;
}

interface IconPosition {
    id: string;
    x: number;
    y: number;
}

const Shortcuts: React.FC<ShortcutsProps> = ({ openExplorer, openSkills }) => {
    const [musicPlayerOpen, setMusicPlayerOpen] = useState(false);
    const [activeIcon, setActiveIcon] = useState<string | null>(null);
    const [positions, setPositions] = useState<IconPosition[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [mouseDownPos, setMouseDownPos] = useState({ x: 0, y: 0 });
    const dragThreshold = 5; // Pixels to move before considering it a drag
    
    useEffect(() => {
        setPositions([
            { id: 'about', x: 40, y: 40 },
            { id: 'media', x: 40, y: 120 },
            { id: 'instagram', x: 40, y: 200 },
            { id: 'skills', x: 40, y: 280 },
            { id: 'contact', x: 40, y: 360 }
        ]);
    }, []);
    
    const toggleMusicPlayer = (e: React.MouseEvent) => {
        if (!isDragging) {
            e.stopPropagation();
            setMusicPlayerOpen(!musicPlayerOpen);
        }
    };
    
    const handleMouseDown = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        
        const position = positions.find(pos => pos.id === id);
        if (!position) return;
        
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        
        setDragOffset({ x: offsetX, y: offsetY });
        setActiveIcon(id);
        setIsDragging(false); // Reset dragging state
        setMouseDownPos({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!activeIcon || !containerRef.current) return;
        
        const dx = Math.abs(e.clientX - mouseDownPos.x);
        const dy = Math.abs(e.clientY - mouseDownPos.y);
        
        // If we've moved past the threshold, mark as dragging
        if (!isDragging && (dx > dragThreshold || dy > dragThreshold)) {
            setIsDragging(true);
        }
        
        if (isDragging) {
            const containerRect = containerRef.current.getBoundingClientRect();
            
            const x = e.clientX - containerRect.left - dragOffset.x;
            const y = e.clientY - containerRect.top - dragOffset.y;
            
            setPositions(prev => 
                prev.map(pos => 
                    pos.id === activeIcon 
                        ? { ...pos, x, y } 
                        : pos
                )
            );
        }
    };
    
    const handleMouseUp = (e: React.MouseEvent) => {
        if (activeIcon && !isDragging) {
            handleIconClick(e, activeIcon);
        }
        
        setActiveIcon(null);
        setIsDragging(false);
    };
    
    const getPosition = (id: string) => {
        const position = positions.find(pos => pos.id === id);
        return position ? { left: `${position.x}px`, top: `${position.y}px` } : { left: 0, top: 0 };
    };
    
    const handleIconClick = (e: React.MouseEvent, id: string) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        
        if (id === 'instagram' && !isDragging) {
            e.stopPropagation();
            openExplorer();
        } else if (id === 'skills' && openSkills && !isDragging) {
            e.stopPropagation();
            openSkills();
        } else if (id === 'media' && !isDragging) {
            e.stopPropagation();
            setMusicPlayerOpen(!musicPlayerOpen);
        }
    };
    
    return (
        <>
            <div 
                ref={containerRef}
                className={styles.desktopIcons}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div 
                    className={`${styles.desktopIcon} ${activeIcon === 'about' && isDragging ? styles.dragging : ''}`}
                    style={getPosition('about')}
                    onMouseDown={(e) => handleMouseDown(e, 'about')}
                >
                    <FaUser size={32} className={styles.icon} />
                    <div>About</div>
                </div>
                
                <div 
                    className={`${styles.desktopIcon} ${activeIcon === 'media' && isDragging ? styles.dragging : ''}`}
                    style={getPosition('media')}
                    onMouseDown={(e) => handleMouseDown(e, 'media')}
                >
                    <FaMusic size={32} className={styles.icon} />
                    <div>Media</div>
                </div>
                
                <div 
                    className={`${styles.desktopIcon} ${activeIcon === 'instagram' && isDragging ? styles.dragging : ''}`}
                    style={getPosition('instagram')}
                    onMouseDown={(e) => handleMouseDown(e, 'instagram')}
                >
                    <FaInstagram size={32} className={styles.icon} />
                    <div>Instagram</div>
                </div>
                
                {openSkills && (
                    <div 
                        className={`${styles.desktopIcon} ${activeIcon === 'skills' && isDragging ? styles.dragging : ''}`}
                        style={getPosition('skills')}
                        onMouseDown={(e) => handleMouseDown(e, 'skills')}
                    >
                        <FaCode size={32} className={styles.icon} />
                        <div>My Skills</div>
                    </div>
                )}
                
                <div 
                    className={`${styles.desktopIcon} ${activeIcon === 'contact' && isDragging ? styles.dragging : ''}`}
                    style={getPosition('contact')}
                    onMouseDown={(e) => handleMouseDown(e, 'contact')}
                >
                    <FaEnvelope size={32} className={styles.icon} />
                    <div>Contact</div>
                </div>
            </div>
            
            {musicPlayerOpen && <MusicPlayer closePlayer={() => setMusicPlayerOpen(false)} />}
        </>
    );
};

export default Shortcuts;
