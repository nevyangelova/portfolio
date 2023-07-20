'use client';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import styles from './style.module.scss';

type Props = {};

export const Header = (props: Props): JSX.Element => {
    const [userTime, setUserTime] = useState('');
    const [myTime, setMyTime] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const updateTimes = () => {
            const now = new Date();
            setUserTime(
                now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            );

            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Europe/Sofia',
                hour: '2-digit',
                minute: '2-digit',
            };
            setMyTime(now.toLocaleTimeString([], options));
        };

        updateTimes();
        const interval = setInterval(updateTimes, 60000);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.item}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16px'
                        height='16px'
                        fill='currentcolor'
                        viewBox='0 0 256 256'
                    >
                        <rect width='256' height='256' fill='none'></rect>
                        <path d='M215.8,118.2a8,8,0,0,0-5-5.7L153.2,90.9l14.6-73.3a8.1,8.1,0,0,0-4.1-8.7,7.9,7.9,0,0,0-9.5,1.6l-112,120a7.9,7.9,0,0,0-2,7.3,8.2,8.2,0,0,0,5,5.7l57.6,21.6L88.2,238.4a8.1,8.1,0,0,0,4.1,8.7,8.4,8.4,0,0,0,3.7,.9,7.9,7.9,0,0,0,5.8-2.5l112-120A7.9,7.9,0,0,0,215.8,118.2Z'></path>
                    </svg>
                    <div>Nevy Angelova</div>
                </div>
                <Image src='/divider.svg' alt='' width={8} height={20} />

                <div className={styles.item} onClick={toggleTheme}>
                    <div>Switch Theme</div>
                </div>
            </div>
            <div className={styles.grid}>
                <div className={styles.item}>
                    <Image src='/timezone.jpg' alt='' width={16} height={16} />
                    <div>Your time:</div>
                    <div>{userTime}</div>
                </div>
                <div className={styles.item}>
                    <Image src='/divider.svg' alt='' width={8} height={20} />
                    <div>Where I am:</div>
                    <div>{myTime}</div>
                </div>
                <div className={styles.item}>
                    <Image src='/divider.svg' alt='' width={8} height={20} />
                    <div>
                        <Image
                            src='/screen.svg'
                            alt=''
                            width={16}
                            height={16}
                        />
                    </div>
                    <div className='div-block-fullscreen' />
                </div>
            </div>
        </div>
    );
};

export default Header;
