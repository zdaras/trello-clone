import styled from 'styled-components';

export const ContainerStyled = styled.section`
	background: ${props => props.theme.BG_COLOR};
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	transition: 0.3s ease-in-out;
`;
