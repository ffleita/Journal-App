import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBJW5AkqHfFJvuHJ4GojSUCv-nLE8uRu-o",
    authDomain: "react-app-curso-baf84.firebaseapp.com",
    projectId: "react-app-curso-baf84",
    storageBucket: "react-app-curso-baf84.appspot.com",
    messagingSenderId: "22119515851",
    appId: "1:22119515851:web:1e4afe032add3d19857d4e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}