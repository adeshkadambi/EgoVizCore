// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBo_VGQBF6lVOzzNHRxJPTkNJbYJJVpvLY',
	authDomain: 'egocdss.firebaseapp.com',
	projectId: 'egocdss',
	storageBucket: 'egocdss.appspot.com',
	messagingSenderId: '611883717189',
	appId: '1:611883717189:web:3953d655ceee16faddc92c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
