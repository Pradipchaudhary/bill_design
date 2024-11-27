// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEYssss,
    authDomain: "canvas-video-app.firebaseapp.com",
    projectId: "canvas-video-app",
    storageBucket: "canvas-video-app.firebasestorage.app",
    messagingSenderId: "751145622607",
    appId: "1:751145622607:web:eb8a05bac17805d73b5e3a",
    measurementId: "G-XVJYD3HYK8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);
