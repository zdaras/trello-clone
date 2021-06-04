import { Action } from '@/types';

export interface IToast {
	id?: number;
	text?: string;
	type: 'info' | 'success' | 'warning' | 'danger' | 'processing';
	autoClose?: boolean;
	closeOnClick?: boolean;
	position?: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';
	timeout?: number;
}

export interface IPartialToast extends Partial<IToast> {}

export interface IToastState {
	data: IToast[];
	isProcessing: boolean;
	processToasts: IToast[];
	minimizedModal: boolean;
}

export interface IShowToastAction extends Action {
	payload: IToast;
}

export interface IHideToastAction extends Action {
	payload: IPartialToast;
}
