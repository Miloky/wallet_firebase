import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, logEvent } from "firebase/analytics";

const getEnvironmentVariable = (key: string) => {
  var val = process.env[`REACT_APP_FIREBASE_${key}`];
  if (val) {
    return val;
  }

  throw new Error('Missing config in .env file!');
};

const firebaseConfiguration: FirebaseOptions = {
  apiKey: getEnvironmentVariable('API_KEY'),
  authDomain: getEnvironmentVariable('AUTH_DOMAIN'),
  projectId: getEnvironmentVariable('PROJECT_ID'),
  storageBucket: getEnvironmentVariable('STORAGE_BUCCKET'),
  messagingSenderId: getEnvironmentVariable('MESSAGENING_SENDER_ID'),
  appId: getEnvironmentVariable('APP_ID'),
};

const app = initializeApp(firebaseConfiguration);

export const analytics = getAnalytics(app);
logEvent(analytics, 'Somethings to test', { id: 999 });


export const store = getFirestore(app);
