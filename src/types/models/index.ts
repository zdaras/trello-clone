export interface IColumn {
	index: number;
	id?: string;
	name: string;
}

export interface ITask {
	index: number;
	id?: string;
	name: string;
	content: string;
	priority: 'low' | 'medium' | 'high';
	columnId: string;
}
