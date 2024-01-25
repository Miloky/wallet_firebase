import { initializeApp } from 'firebase/app';
import { firebaseConfiguration } from '../firebase-configuration';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfiguration);
const store = getFirestore(app);

export { store };