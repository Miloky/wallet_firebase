// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
} from 'firebase/firestore';
import { transactionConverter } from '../domain/transaction-converter';

import { firebaseConfiguration } from '../firebase-configuration';




const app = initializeApp(firebaseConfiguration);



// Initialize Firebase
const db = getFirestore(app);
const docRef = doc(db, 'transactions', '1').withConverter(transactionConverter);
// docRef.withConverter
getDoc(docRef)
  .then((x) => {
    console.log('X', x.data());
  })
  .catch(() => console.log('ERORR'));