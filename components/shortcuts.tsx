
'use client'
import React from 'react'
import { InfoBubble, SccviewIcon } from '@react95/icons/'
import { MediaCd } from '@react95/icons/'
// import {startWebamp} from '../utils/startWebamp';
import {Shdocvw257} from '@react95/icons/';
import { Tssoft3210 } from '@react95/icons/';
import { Progman24 } from '@react95/icons/';
import { Progman36 } from '@react95/icons/';
import { Winmine1 } from '@react95/icons/';

const Shortcuts = () => {
    return (
        <div>
                <InfoBubble
                    variant="32x32_4" 
                />
                <div>Explorer</div>
                <MediaCd
                    variant='32x32_4'
                />
                <div>Media</div>
            <Shdocvw257 variant="32x32_4"/>
            <Tssoft3210 variant="32x32_4"/>
            <SccviewIcon variant="32x32_4" aria-label="Icone de uma lupa." />

        </div>
    )
}

export default Shortcuts
