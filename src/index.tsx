import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from '@/router/app';
import { configureStore, history } from '@/store';
import { appActions } from '@/store/ducks/app';
import { userActions } from '@/store/ducks/user';
import storage from '@/utils/storage';
import { defaultTheme } from '@/styled/themes';
import '@/services/locale/i18n';

export const store = configureStore();

history.listen(() => window.scrollTo(0, 0)); // scroll to top on route change

const storageTheme = storage('theme').get();
const accessToken = storage('access_token').get();
if (storageTheme && storageTheme !== defaultTheme) store.dispatch<any>(appActions.themeSwitchAction(storageTheme));
if (accessToken) store.dispatch<any>(userActions.getCurrentUser());

const renderApp = (AppComponent: any) =>
	render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<AppComponent />
			</ConnectedRouter>
		</Provider>,
		document.getElementById('app')
	);

renderApp(App);

// for progressive web app

// if (process.env.NODE_ENV === 'production') {
// 	import('offline-plugin/runtime').then(plugin => {
// 		plugin.install({
// 			onUpdateReady: () => plugin.applyUpdate(),
// 			onUpdated: () => window.location.reload()
// 		});
// 	});
// }
