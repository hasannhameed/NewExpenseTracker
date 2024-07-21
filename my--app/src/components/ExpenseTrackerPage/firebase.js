// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDMGEPT6_WQcPUgRPQu-lYfN6dO2K-rEv4",
    authDomain: "react-d64f8.firebaseapp.com",
    databaseURL: "https://react-d64f8-default-rtdb.firebaseio.com",
    projectId: "react-d64f8",
    storageBucket: "react-d64f8.appspot.com",
    messagingSenderId: "92086907543",
    appId: "1:92086907543:web:5061f038eca9ac5ab4afd2",
    measurementId: "G-YNP7ZS6DTT"
  };


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
