// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBo_VGQBF6lVOzzNHRxJPTkNJbYJJVpvLY",
    authDomain: "egocdss.firebaseapp.com",
    projectId: "egocdss",
    storageBucket: "egocdss.appspot.com",
    messagingSenderId: "611883717189",
    appId: "1:611883717189:web:3953d655ceee16faddc92c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;