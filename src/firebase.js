// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCoDncXmeg1_0vX0Sn916ANngkTiRl36zs',
  authDomain: 'react-notes-71641.firebaseapp.com',
  projectId: 'react-notes-71641',
  storageBucket: 'react-notes-71641.appspot.com',
  messagingSenderId: '590944436101',
  appId: '1:590944436101:web:9e540692e379a43c848eec',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const noteCollection = collection(db, 'notes');
