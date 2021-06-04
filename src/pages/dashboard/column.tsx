import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/library/button';
import { H5 } from '@/styled/shared';
import { IColumn, ITask } from '@/types/models';

import { ColumnStyled, ColumnAddButton, TaskStyled, TaskTitle, TaskPriority } from './dashboard-styled';

export const Column: FC<IProps> = ({ column, tasks }) => {
	const { t } = useTranslation();

	return (
		<ColumnStyled>
			<H5>{column.name}</H5>
			{tasks.map(task => (
				<TaskStyled key={task.id}>
					<TaskTitle>{task.name}</TaskTitle>
					<TaskPriority priority={task.priority}>{task.priority}</TaskPriority>
				</TaskStyled>
			))}
			<ColumnAddButton>
				<Button buttonType="text" inline text={t('Add a task')} padding="0" icon="plus" />
			</ColumnAddButton>
		</ColumnStyled>
	);
};

interface IProps {
	column: IColumn;
	tasks: ITask[];
	index: number;
}

export default Column;
