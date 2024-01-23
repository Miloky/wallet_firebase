import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
} from 'firebase/firestore';
import { transactionConverter } from './domain/transaction-converter';

import {
  getAuth,

} from 'firebase/auth';
import { firebaseConfiguration } from './firebase-configuration';


const app = initializeApp(firebaseConfiguration);
const auth = getAuth();
console.log(auth.currentUser);
// signInWithPopup(auth, provider)
//   .then((result:any) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result)!;
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });


// Initialize Firebase
const db = getFirestore(app);
const docRef = doc(db, 'transactions', '1').withConverter(transactionConverter);
// docRef.withConverter
getDoc(docRef)
  .then((x) => {
    console.log('X', x.data());
  })
  .catch(() => console.log('ERORR'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
