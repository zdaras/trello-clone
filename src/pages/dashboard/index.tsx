import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

	useEffect(() => {
		getColumns();
		getTasks();
	}, []);

	return (
		<>
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
		</>
	);
};

export default Dashboard;
