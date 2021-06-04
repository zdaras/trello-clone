import styled from 'styled-components';

import { ITask } from '@/types/models';

export const BoardContainer = styled.div`
	width: 100%;
	min-height: 100%;
	overflow: hidden;
	position: relative;
	padding: 30px 2%;
`;

export const BoardTopPanel = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px 0;
`;

export const ColumnsContainer = styled.div`
	display: flex;
	max-width: 100%;
	width: 100%;
	overflow-x: auto;
	overflow-y: hidden;
	position: relative;
`;

export const ColumnStyled = styled.div`
	padding: 10px 10px 50px;
	height: max-content;
	width: 300px;
	flex: 0 0 300px;
	position: relative;
	background-color: #efefef;
	border-radius: 2px;
	overflow-y: auto;

	:not(:last-child) {
		margin-right: 15px;
	}
`;

export const ColumnAddButton = styled.div`
	position: absolute;
	bottom: 0;
`;

export const TaskStyled = styled.div`
	padding: 10px 12px;
	background-color: #fffbfb;
	border-radius: 10px;
	min-height: 84px;
	cursor: pointer;
	transition: 0.15s;

	:hover {
		background-color: #f9f9f9;
	}
`;

export const TaskTitle = styled.div`
	margin-bottom: 14px;
`;

export const TaskPriority = styled.small<{ priority: ITask['priority'] }>`
	padding: 3px 12px;
	border-radius: 8px;

	background-color: ${({ priority }) => {
		switch (priority) {
			case 'low':
				return '#efefef';
			default:
				return '#efefef';
		}
	}};
`;