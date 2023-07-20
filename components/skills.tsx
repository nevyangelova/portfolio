import {useEffect, useRef} from 'react';
import Matter from 'matter-js';
import {Modal, Frame} from '@react95/core';
import styles from './skills.module.scss';

type Props = {
    closeSkills: () => void;
};

const SkillsGame = ({closeSkills}: Props) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef(null);

    const generateSkills = () => {
        const canvas = canvasRef.current;
        const skills = [
            'CSS',
            'JavaScript',
            'React',
            'TypeScript',
            'Node.js',
            'Go',
            'Next.js',
            'CI/CD',
            'Git',
            'Problem Solving',
            'Web3',
            'Testing',
            'Collaboration',
            'SCSS',
            'Application Development',
            'Redux',
            'React Hooks',
            'AWS',
        ];
        const Engine = Matter.Engine,
            World = Matter.World,
            Body = Matter.Body,
            Bodies = Matter.Bodies,
            Common = Matter.Common,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events,
            Render = Matter.Render,
            Mouse = Matter.Mouse,
            Vertices = Matter.Vertices,
            height = window.innerHeight,
            width = window.innerWidth;

        const createBodies = () => {
            const colors = [
                '#FF0000',
                '#00FF00',
                '#0000FF',
                '#FF00FF',
                '#FFFF00',
                '#00FFFF',
            ];

            const shapes = [];
            const shapeTypes = ['circle', 'rectangle', 'polygon']; // Updated shapeTypes to strings
            const randomColor = () =>
                colors[Math.floor(Math.random() * colors.length)];

            for (let i = 0; i < skills.length; i++) {
                const skill = skills[i];
                const randomShapeType =
                    shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
                const randomShapeSize = Math.random() * 250 + 250;

                let shape;
                if (randomShapeType === 'circle') {
                    shape = Bodies.circle(
                        // Start at the top of the screen (x will be centered)
                        width / 2,
                        0,
                        randomShapeSize,
                        {
                            density: 0.001, // Increase density for faster falling
                            frictionAir: 0.01, // Adjust friction for smoother motion
                            restitution: 0.3,
                            friction: 0.1,
                            render: {
                                fillStyle: randomColor(),
                                strokeStyle: 'black',
                                lineWidth: 1,
                            },
                        }
                    );
                } else if (randomShapeType === 'rectangle') {
                    shape = Bodies.rectangle(
                        // Start at the top of the screen (x will be centered)
                        width / 2,
                        0,
                        randomShapeSize,
                        randomShapeSize,
                        {
                            density: 0.001, // Increase density for faster falling
                            frictionAir: 0.01, // Adjust friction for smoother motion
                            restitution: 0.3,
                            friction: 0.1,
                            render: {
                                fillStyle: randomColor(),
                                strokeStyle: 'black',
                                lineWidth: 1,
                            },
                        }
                    );
                } else if (randomShapeType === 'polygon') {
                    // Generate random vertices for the polygon

                    shape = Bodies.polygon(width / 2, 200, 3, 100, {
                        density: 0.001,
                        frictionAir: 0.01,
                        restitution: 0.3,
                        friction: 0.1,
                        render: {
                            fillStyle: randomColor(),
                            strokeStyle: 'black',
                            lineWidth: 1,
                        },
                    });
                }
                const labelWidth = randomShapeSize * 2;
                const labelHeight = randomShapeSize * 0.5;
            
                const textElement = Bodies.rectangle(
                  shape.position.x,
                  shape.position.y,
                  labelWidth,
                  labelHeight,
                  {
                    label: skill,
                    render: {
                      fillStyle: 'transparent',
                      strokeStyle: 'white',
                      lineWidth: 0,
                    },
                  }
                );
            
                shapes.push(shape);
                shapes.push(textElement);
            }

            return shapes;
        };
        const engine = Engine.create();
        const render = Render.create({
            element: canvas,
            engine: engine,
            options: {
                wireframes: false,
                showAngleIndicator: false,
                background: '#fff',
                height: 480,
                width: 480,
            },
        });
        Render.run(render);

        const world = engine.world;
        world.gravity.x = 0;
        world.gravity.y = 0.01;

        const mouse = Mouse.create(render.canvas);
        mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
        mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                render: {
                    visible: false,
                },
            },
        });
        World.add(world, mouseConstraint);

        const handleClick = () => {
            const newBodies = createBodies();
            const newComposite = Matter.Composite.create();
            Matter.Composite.add(newComposite, newBodies);
            World.add(world, newComposite);
        };

        buttonRef.current?.addEventListener('click', handleClick);

        Render.lookAt(render, {
            min: {x: 0, y: 0},
            max: {x: width, y: height},
        });

        Matter.Runner.run(engine);
    };

    useEffect(() => {
        generateSkills();
    }, []);

    return (
        <Modal
            title='Click to view skills!'
            closeModal={closeSkills}
            width={'500'}
            height={'500'}
        >
            <button ref={buttonRef} className={styles.button}>
                Skills and tecnologies. Click me!
            </button>
            <div ref={canvasRef} />
        </Modal>
    );
};

export default SkillsGame;
