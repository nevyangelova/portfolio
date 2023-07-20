import React, {useState, useContext, useEffect} from 'react';
import Explorer from './instagram';
import Shortcuts from './shortcuts';
import {ProjectContext} from '../contexts/projectContext';
import SkillsGame from './skills';

const Desktop = () => {
    const {projects} = useContext(ProjectContext);
    const [explorerOpened, toggleExplorer] = useState(false);
    const [skillsOpened, toggleSkills] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(projects);
        toggleExplorer(true);
    }, [projects]);

    const closeExplorer = () => {
        toggleExplorer(false);
    };

    const openExlorer = () => {
        toggleExplorer(true);
    };

    const closeSkills = () => {
        toggleSkills(false);
    };

    const openSkills = () => {
        toggleSkills(true);
    };

    return (
        <>
            <Shortcuts openExplorer={openExlorer} openSkills={openSkills} />
            {explorerOpened && (
                <Explorer items={items} closeExplorer={closeExplorer} />
            )}
            {skillsOpened && <SkillsGame closeSkills={closeSkills} />}
        </>
    );
};

export default Desktop;
