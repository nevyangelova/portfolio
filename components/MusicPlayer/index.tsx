'use client';

import React, {useState, useRef, useEffect} from 'react';
import {
    FaPlay,
    FaPause,
    FaStepForward,
    FaStepBackward,
    FaVolumeUp,
    FaVolumeMute,
} from 'react-icons/fa';
import styles from './style.module.scss';

interface MusicPlayerProps {
    closePlayer: () => void;
}

interface Track {
    title: string;
    artist: string;
    url: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({closePlayer}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const tracks: Track[] = [
        {
            title: "World's Smallest Violin",
            artist: 'AJR',
            url: '/violin.mp3',
        },
        {
            title: 'Sample Track',
            artist: 'Artist',
            url: '/violin.mp3',
        },
    ];

    const currentTrack = tracks[currentTrackIndex];

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            setDuration(audio.duration);
        };

        const setAudioTime = () => {
            setCurrentTime(audio.currentTime);
        };

        const onEnded = () => {
            if (currentTrackIndex < tracks.length - 1) {
                setCurrentTrackIndex((prev) => prev + 1);
            } else {
                setCurrentTrackIndex(0);
                setIsPlaying(false);
            }
        };

        // Events
        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('ended', onEnded);

        // Update audio properties
        audio.volume = volume;
        audio.muted = isMuted;

        if (isPlaying) {
            audio.play().catch((error) => {
                console.error('Playback failed:', error);
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }

        // Cleanup
        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('ended', onEnded);
        };
    }, [isPlaying, currentTrackIndex, volume, isMuted]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const playPrevious = () => {
        setCurrentTrackIndex((prev) =>
            prev > 0 ? prev - 1 : tracks.length - 1
        );
    };

    const playNext = () => {
        setCurrentTrackIndex((prev) =>
            prev < tracks.length - 1 ? prev + 1 : 0
        );
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0) {
            setIsMuted(false);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTime = parseFloat(e.target.value);
        setCurrentTime(seekTime);
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div
            className='window'
            style={{
                position: 'fixed',
                bottom: '90px',
                right: '20px',
                width: '320px',
                zIndex: 1000,
            }}
        >
            <div className='title-bar'>
                <h1 className='title'>Music Player</h1>
                <div className='title-bar-controls'>
                    <button aria-label='Close' onClick={closePlayer}></button>
                </div>
            </div>
            <div className={`window-body ${styles.playerBody}`}>
                <audio
                    ref={audioRef}
                    src={currentTrack.url}
                    preload='metadata'
                />

                <div className={styles.trackInfo}>
                    <div className={styles.trackTitle}>
                        {currentTrack.title}
                    </div>
                    <div className={styles.trackArtist}>
                        {currentTrack.artist}
                    </div>
                </div>

                <div className={styles.progressContainer}>
                    <span className={styles.timeInfo}>
                        {formatTime(currentTime)}
                    </span>
                    <input
                        type='range'
                        min='0'
                        max={duration || 0}
                        value={currentTime}
                        step='0.1'
                        onChange={handleSeek}
                        className={styles.progressBar}
                    />
                    <span className={styles.timeInfo}>
                        {formatTime(duration)}
                    </span>
                </div>

                <div className={styles.controls}>
                    <button
                        className={styles.controlButton}
                        onClick={playPrevious}
                    >
                        <FaStepBackward />
                    </button>
                    <button
                        className={styles.controlButton}
                        onClick={togglePlay}
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button className={styles.controlButton} onClick={playNext}>
                        <FaStepForward />
                    </button>
                    <button
                        className={styles.controlButton}
                        onClick={toggleMute}
                    >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                    <input
                        type='range'
                        min='0'
                        max='1'
                        step='0.01'
                        value={volume}
                        onChange={handleVolumeChange}
                        className={styles.volumeSlider}
                    />
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
