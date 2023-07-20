'use client';
import React, {useEffect, useState} from 'react';
import {InfoBubble, SccviewIcon} from '@react95/icons/';
import {MediaCd} from '@react95/icons/';
import {Shdocvw257} from '@react95/icons/';
import {Tssoft3210} from '@react95/icons/';
import {Progman24} from '@react95/icons/';
import {Progman36} from '@react95/icons/';
import {Winmine1} from '@react95/icons/';
import styles from './shortcuts.module.scss';
import Webamp from 'webamp';

const startWebamp = () => {
    if (Webamp.browserIsSupported() && typeof window !== 'undefined') {
        const webamp = new Webamp({
            initialTracks: [
                {
                    metaData: {
                        artist: 'AJR',
                        title: "World's Smallest Violin",
                    },
                    url: '/violin.mp3',
                    duration: 213,
                },
            ],
        });
        webamp.onClose(() => {
            webamp.dispose();
        });
        webamp.renderWhenReady(document.getElementById('container'));
    }
};

const Shortcuts = ({openExplorer, openSkills}) => {
    return (
        <div className={styles.container} id={'container'}>
            <div className={styles.shortcut}>
                <InfoBubble variant='32x32_4' />
                <div>About</div>
            </div>
            <div className={styles.shortcut}>
                <MediaCd variant='32x32_4' onClick={() => startWebamp()} />
                <div>Media</div>
            </div>
            <div className={styles.shortcut}>
                <Shdocvw257 variant='32x32_4' onClick={openExplorer} />
                <div>Instagram</div>
            </div>
            <div className={styles.shortcut} onClick={openSkills}>
                <Tssoft3210 variant='32x32_4' />
                <div>My Skills</div>
            </div>
            <div className={styles.shortcut}>
                <SccviewIcon variant='32x32_4' />
                <div>Let's Meet!</div>
            </div>
        </div>
    );
};

export default Shortcuts;
