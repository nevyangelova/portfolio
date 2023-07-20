import React, {useState} from 'react';
import styled from 'styled-components';
import {Modal, Frame} from '@react95/core';
import styles from './instagram.module.scss';
import Image from 'next/image';
import {Mshearts1} from '@react95/icons/';

const StoryModal = ({story, onCloseModal}) => {
    return (
        <Modal
            title={story.title}
            closeModal={onCloseModal}
            width={'375'}
            height={'auto'}
        >
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
                    className={styles.visitButton}
                >
                    Visit
                </a>
            </div>
        </Modal>
    );
};

const Post = () => {
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
                        <Mshearts1 variant='32x32_4' />
                        <span>412</span>
                    </div>
                    <div className={styles.postIcon}>
                        <img
                            src='comment-icon.png' /* Replace with the path to the comment icon */
                            alt='Comment'
                            className={styles.iconImage}
                        />
                        <span>{'Those are some amazing gifs!'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectsExplorer = ({items, closeExplorer}) => {
    const [selectedStory, setSelectedStory] = useState(null);

    const handleStoryClick = (story) => {
        setSelectedStory(story);
    };

    const handleCloseModal = () => {
        setSelectedStory(null);
    };
    return (
        <>
            <Modal
                icon={<Image src={'/instawrite.png'} width={20} height={20} />}
                title='Nevstagram'
                closeModal={closeExplorer}
                width={'375'}
                height={'auto'}
                className={styles.container}
            >
                <Frame bg='white' boxShadow='out'>
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
                                key={item.id}
                                className={styles.storyItem}
                                onClick={() => handleStoryClick(item)}
                            >
                                <Image
                                    src={item.image}
                                    className={styles.storyThumbnail}
                                    width={50}
                                    height={50}
                                />
                                <div className={styles.storyUsername}>
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Post />
                </Frame>
            </Modal>{' '}
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
