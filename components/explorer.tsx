import React from 'react'
import styled from 'styled-components'
import { Modal, Frame } from '@react95/core'
import { Icon } from '@react95/core'

const StyledItem = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	text-align: center;
	width: 25%;
	padding: 10px 0;
`;

const StyledSpan = styled.span`
	margin-top: 5px;
`

function File({ item, openNotepad }) {
	const {name, icon } = item;
	return (
		<StyledItem>
			{icon}
			<StyledSpan>{name}</StyledSpan>
		</StyledItem>
	)
}
const FilesWrapper = styled.div`
	display: flex;
	grid-template-columns: repeat(4, 1fr);
	flex-wrap: wrap;
`;


function Explorer({ items, closeExplorer, openNotepad, isMobile }) {
    return (
        <Modal
            title="Explore"
            closeModal={closeExplorer}
            style={{
                left: isMobile ? '5%' : '15%',
                top: '30%',
                width: isMobile ? '90%' : 400,
            }}
            >
            <Frame
                bg="white"
                boxShadow="in"
            >
                <FilesWrapper>
                    {
                        items.map((item) => (
                            <File
                                key={item.id}
                                item={item}
                                openNotepad={openNotepad}
                            />
                        ))
                    }
                </FilesWrapper>
            </Frame>
        </Modal>
    )
}

export default Explorer
