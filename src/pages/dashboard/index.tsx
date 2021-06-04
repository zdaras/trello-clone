import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext } from 'react-beautiful-dnd';

import Helmet from '@/components/shared/helmet';
import Button from '@/components/library/button';
import columnsService from '@/services/firebase/columns-service';
import tasksService from '@/services/firebase/tasks-service';
import { H4 } from '@/styled/shared';
import { IColumn, ITask } from '@/types/models';
import { sortByIndex } from '@/utils/helpers';

import { BoardContainer, BoardTopPanel, ColumnsContainer } from './dashboard-styled';
import Column from './column';

export const Dashboard = () => {
	const { t } = useTranslation();
	const [columns, setColumns] = useState<IColumn[]>([]);
	const [tasks, setTasks] = useState<ITask[]>([]);

	const getColumns = async () => {
		const data = await columnsService.getAll();
		setColumns(data);
	};

	const getTasks = async () => {
		const data = await tasksService.getAll();
		setTasks(data);
	};

	const onDragEnd = async (result: any) => {
		const { source, destination } = result;
		const sourceColumnId = source.droppableId;
		const destinationColumnId = destination.droppableId;

		// dropped outside the list
		if (!destination) {
			return;
		}

		const sourceTask = tasks.find(i => i.index === source.index && i.columnId === sourceColumnId);
		const replacedTask = tasks.find(i => i.index === destination.index && i.columnId === destinationColumnId);

		// same  column
		if (sourceColumnId === destinationColumnId) {
			if (sourceTask && replacedTask) {
				const updatedSourceTrack = { ...sourceTask, columnId: destinationColumnId, index: destination.index };
				const updatedReplacedTrack = { ...replacedTask, columnId: sourceColumnId, index: source.index };
				setTasks(prev => {
					const removed = prev.filter(i => ![sourceTask.id, replacedTask.id].includes(i.id));
					const newTasks = [updatedSourceTrack, updatedReplacedTrack, ...removed];

					return newTasks;
				});
				await tasksService.update(sourceTask.id, { columnId: destinationColumnId, index: destination.index });
				await tasksService.update(replacedTask.id, { columnId: sourceColumnId, index: source.index });
			}
		} else {
			// different column
			if (sourceTask) {
				const updatedSourceTrack = { ...sourceTask, columnId: destinationColumnId, index: destination.index };
				setTasks(prev => {
					const removed = prev.filter(i => ![sourceTask.id].includes(i.id));
					const newTasks = [updatedSourceTrack, ...removed];

					return newTasks;
				});
				await tasksService.update(sourceTask.id, { columnId: destinationColumnId, index: destination.index });
			}
			if (replacedTask) {
				const updatedReplacedTrack = { ...replacedTask, columnId: sourceColumnId, index: source.index };
				setTasks(prev => {
					const removed = prev.filter(i => ![replacedTask.id].includes(i.id));
					const newTasks = [updatedReplacedTrack, ...removed];

					return newTasks;
				});
				await tasksService.update(replacedTask.id, { columnId: destinationColumnId, index: source.index + 1 });
			}
		}
		await getTasks();
	};

	useEffect(() => {
		getColumns();
		getTasks();
	}, []);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Helmet title={t('Dashboard')} />

			<BoardContainer>
				<BoardTopPanel>
					<H4>{t('Board')}</H4>
					<Button text={t('Add a column')} inline buttonType="text" padding="0" icon="plus" />
				</BoardTopPanel>
				<ColumnsContainer>
					{columns.map((item, index) => {
						const filteredTasks = sortByIndex(tasks.filter(i => i.columnId === item.id));

						return <Column key={item.id} column={item} tasks={filteredTasks} index={index} getTasks={getTasks} />;
					})}
				</ColumnsContainer>
			</BoardContainer>
		</DragDropContext>
	);
};

export default Dashboard;
