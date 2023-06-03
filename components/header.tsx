'use client';
import styled from 'styled-components';

type Props = {};

const StyledHeader = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: auto;
    display: grid;
    height: 24px;
    grid-auto-columns: 1fr;
    grid-column-gap: 16px;
    grid-template-columns: 1fr 1fr;
    -ms-grid-rows: auto;
    grid-template-rows: auto;
    border-bottom: 1px solid #262626;
    background-color: #ddd;
    box-shadow: inset 0 1px 0 0 #eee, inset 0 -1px 0 0 #bbb,
        0 10px 20px 0 rgba(0, 0, 0, 0.06);
    color: #262626;
`;

const Item = styled.div`
    display: flex;
    height: auto;
    padding: 3px 6px;
    justify-content: center;
    align-items: center;
    font-family: Charcoal, sans-serif;
    font-size: 12px;
    line-height: 100%;
    font-weight: 400;
    white-space: nowrap;
    cursor: pointer;
    grid-column-start: span 1;
    -ms-grid-column-span: 1;
    grid-column-end: span 1;
    -ms-grid-row: span 1;
    grid-row-start: span 1;
    -ms-grid-row-span: 1;
    grid-row-end: span 1;
`;

const Grid = styled.div`
    display: grid;
    justify-content: ${props => props.justify || 'start'};
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    height: 24px;
    grid-column-gap: 4px;
    grid-row-gap: 0px;
    -ms-grid-columns: auto;
    grid-template-columns: auto;
    -ms-grid-rows: auto;
    grid-template-rows: auto;
`;

export const Header = (props: Props): JSX.Element => {
    return (
        <StyledHeader>
            <Grid>
                <Item>
                    <div class='icon w-embed'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16px'
                            height='16px'
                            fill='currentcolor'
                            viewBox='0 0 256 256'
                        >
                            <rect width='256' height='256' fill='none'></rect>
                            <path d='M215.8,118.2a8,8,0,0,0-5-5.7L153.2,90.9l14.6-73.3a8.1,8.1,0,0,0-4.1-8.7,7.9,7.9,0,0,0-9.5,1.6l-112,120a7.9,7.9,0,0,0-2,7.3,8.2,8.2,0,0,0,5,5.7l57.6,21.6L88.2,238.4a8.1,8.1,0,0,0,4.1,8.7,8.4,8.4,0,0,0,3.7.9,7.9,7.9,0,0,0,5.8-2.5l112-120A7.9,7.9,0,0,0,215.8,118.2Z'></path>
                        </svg>
                    </div>
                    <div class='text-block-10'>Nevy Angelova</div>
                </Item>
                <Item
                    id='w-node-_6a27d2ae-198d-1e34-3077-de3a5167533a-bee34dae'
                    data-w-id='6a27d2ae-198d-1e34-3077-de3a5167533a'
                    class='div-block-17 click__theme'
                >
                    <div>Switch Theme</div>
                </Item>
            </Grid>
            <Grid justify={'end'}>
                <Item>
                    <img
                        src='https://assets.website-files.com/637fe1f84b89d92db337544d/637fe1f84b89d96a6737548e_spotify%201.svg'
                        loading='lazy'
                        id='w-node-a0edeb8a-ea0e-6693-0742-caa28457d5bd-bee34dae'
                        alt=''
                        class='image-17'
                    />
                    <div class='text-block-3 capitalize'>Your time:</div>
                    <div id='digital-clock' class='text-block-3'>
                        4:44 PM
                    </div>
                </Item>
                <Item>
                    <img
                        src='https://assets.website-files.com/637fe1f84b89d92db337544d/637fe1f84b89d93246375475_Menu%20bar%20resizer.svg'
                        loading='lazy'
                        id='w-node-_60cc4b26-d371-e7d9-898c-2505587c2179-bee34dae'
                        alt=''
                        class='image-3'
                    />
                    <div class='text-block-3 capitalize'>Where I am:</div>
                    <div class='text-block-3 barcelona_time'>4:44 PM</div>
                </Item>
                <Item>
                    <img
                        src='https://assets.website-files.com/637fe1f84b89d92db337544d/637fe1f84b89d93246375475_Menu%20bar%20resizer.svg'
                        loading='lazy'
                        id='w-node-_75ff718c-d2d4-738d-236f-e9f85fff0087-bee34dae'
                        alt=''
                        class='image-3 mobile-hide'
                    />
                    <div
                        id='w-node-_72d5522c-84e8-35cb-9244-4e9127aca0fc-bee34dae'
                        class='div-block-32-copy'
                    >
                        <img
                            src='https://assets.website-files.com/637fe1f84b89d92db337544d/637fe1f84b89d9a2f9375470_Monitor%20resolution.svg'
                            loading='lazy'
                            alt=''
                        />
                    </div>
                    <div class='w-embed'>
                        <div
                            class='div-block-fullscreen'
                            type='button'
                            value='Full Screen'
                            onclick='toggleFullScreen()'
                        />
                    </div>
                </Item>
            </Grid>
        </StyledHeader>
    );
};

export default Header;
