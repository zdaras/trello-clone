import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import Button from '@/components/library/button';
import { H5 } from '@/styled/shared';
import { IColumn, ITask } from '@/types/models';
import useFormModes from '@/hooks/useFormModes';

import TaskModal from './task-modal';

import { ColumnStyled, ColumnAddButton, TaskStyled, TaskTitle, TaskPriority } from './dashboard-styled';

export const Column: FC<IProps> = ({ column, tasks, getTasks }) => {
	const { t } = useTranslation();
	const defaultValues = { priority: null };
	const methods = useForm({ defaultValues });
	const { state, handleOpen, handleClose, handleItemChange } = useFormModes(defaultValues, methods.reset);

	const handleEdit = async (item: ITask) => {
		handleItemChange(item);
	};

	return (
		<>
			<ColumnStyled>
				<H5>{column.name}</H5>
				{tasks.map(task => (
					<TaskStyled key={task.id} onClick={() => handleEdit(task)}>
						<TaskTitle>{task.name}</TaskTitle>
						{task.priority && <TaskPriority priority={task.priority}>{task.priority}</TaskPriority>}
					</TaskStyled>
				))}
				<ColumnAddButton>
					<Button buttonType="text" inline text={t('Add a card')} padding="0" icon="plus" onClick={handleOpen} />
				</ColumnAddButton>
			</ColumnStyled>

			<TaskModal
				formState={state}
				closeModal={handleClose}
				methods={methods}
				tasks={tasks}
				column={column}
				getTasks={getTasks}
			/>
		</>
	);
};

interface IProps {
	column: IColumn;
	tasks: ITask[];
	index: number;
	getTasks: () => Promise<any>;
}

export default Column;
