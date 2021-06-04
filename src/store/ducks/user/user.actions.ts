import { ThunkA } from '@/types';
import {
	ILoginParams,
	IRegisterParams,
	IUpdateUserInfoParams,
	IRecoverPasswordParams
} from '@/services/api/user/types';
import Api from '@/services/api';
import { setAuthHeader, deleteAuthHeader } from '@/services/api/axios';
import storage from '@/utils/storage';
import { toastActions } from '@/store/ducks/toast';
import app, { appActions } from '@/store/ducks/app';

import user from '.';

export const logout = (): ThunkA => async dispatch => {
	const logoutParams = { refresh_token: storage('refresh_token').get() };
	Api.user.logout(logoutParams);
	dispatch(user.actions.logoutAction());
	deleteAuthHeader();
	dispatch(appActions.routerPush('/login'));
	dispatch(app.actions.clearAlerts());
};

export const getCurrentUser = (setHeader = true): ThunkA => async dispatch => {
	try {
		dispatch(user.actions.loginStartAction());
		const access_token: string = storage('access_token').get();
		const refresh_token: string = storage('refresh_token').get();
		const data = await Api.user.currentUser(access_token);
		if (setHeader) await setAuthHeader({ access_token, refresh_token });
		dispatch(user.actions.loginSuccessAction(data));
	} catch (e) {
		dispatch(logout());
	}
};

export const login = (params: ILoginParams): ThunkA => async dispatch => {
	try {
		const res = await Api.user.login(params);
		await setAuthHeader(res);
		dispatch(getCurrentUser(false));
		return Promise.resolve(res);
	} catch (e) {
		return Promise.reject(e);
	}
};

export const register = (params: IRegisterParams): ThunkA<Promise<string>> => async () => {
	try {
		const res = await Api.user.register(params);
		return Promise.resolve(res);
	} catch (e) {
		return Promise.reject(e);
	}
};

export const updateUserInfo = (params: IUpdateUserInfoParams): ThunkA => async dispatch => {
	try {
		await Api.user.updateUserInfo(params);
		dispatch(user.actions.updateInfo(params));
		return Promise.resolve();
	} catch (e) {
		return Promise.reject(e);
	}
};

export const recoverPassword = (params: IRecoverPasswordParams): ThunkA => async dispatch => {
	try {
		await Api.user.recoverPassword(params);
		dispatch(appActions.routerPush('/login'));
		dispatch(toastActions.success('You can now login with the new password', { timeout: 10000 }));
		return Promise.resolve();
	} catch (e) {
		return Promise.reject(e);
	}
};
