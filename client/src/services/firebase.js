// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA7nOSsJovj15DYktUpZhmsFaO4AqUj99c",
    authDomain: "rocket-post-demo.firebaseapp.com",
    projectId: "rocket-post-demo",
    storageBucket: "rocket-post-demo.firebasestorage.app",
    messagingSenderId: "648111525179",
    appId: "1:648111525179:web:83ae0ab43d2092f1d13b1e",
    measurementId: "G-7Y5P4NMD4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth
export const auth = getAuth(app);
