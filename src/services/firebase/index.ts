import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { store } from '@/index';
import user, { userActions } from '@/store/ducks/user';

const firebaseConfig = {
	apiKey: 'AIzaSyC6xOZf09MN50r-qjZg9WVKDRLY6geKdZE',
	authDomain: 'trello-299ef.firebaseapp.com',
	projectId: 'trello-299ef',
	storageBucket: 'trello-299ef.appspot.com',
	messagingSenderId: '546543156890',
	appId: '1:546543156890:web:a90822ef57fd4b129be923',
	measurementId: 'G-LKFR67XG1R'
};

const fire = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

auth.onAuthStateChanged(async data => {
	if (data) {
		store.dispatch(user.actions.loginSuccessAction(data as any));
	} else {
		store.dispatch<any>(userActions.logout());
	}
});

export default fire;
