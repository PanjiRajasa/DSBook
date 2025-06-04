// Import the functions you need from the SDKs you need
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcSCASo9MOT3vdXM8ng4tHfV5zlOLDxsA",
    authDomain: "ds-book-database.firebaseapp.com",
    projectId: "ds-book-database",
    storageBucket: "ds-book-database.firebasestorage.app",
    messagingSenderId: "728602151702",
    appId: "1:728602151702:web:953ec338d3136c8e3b5e37",
    measurementId: "G-B853B0RZTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // <--- ini yang kamu butuhkan

export {auth, app};