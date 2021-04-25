import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Init firebase
const firebaseConfig = {
    apiKey: "AIzaSyD06iZQiikFSbQ2cuQ3fKbtBVWvHQz0w7k",
    authDomain: "fairshare-48f9f.firebaseapp.com",
    projectId: "fairshare-48f9f",
    storageBucket: "fairshare-48f9f.appspot.com",
    messagingSenderId: "1097496332317",
    appId: "1:1097496332317:web:7c6de0506d954ddf961ef4",
    measurementId: "G-EQK1GXWT16",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalAutoDetectLongPolling: true });

export default firebase;
