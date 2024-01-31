import {
  doc,
  getDoc,
} from 'firebase/firestore';
import { store } from './firebase-service';
import { transactionConverter } from '../domain/transaction-converter';


const docRef = doc(store, 'transactions', '1').withConverter(transactionConverter);
// docRef.withConverter
getDoc(docRef)
  .then((x) => {
    console.log('X', x.data());
  })
  .catch(() => console.log('ERORR'));
