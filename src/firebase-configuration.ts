import { FirebaseOptions } from 'firebase/app';

const getEnvironmentVariable = (key: string) => {
  var val = process.env[`REACT_APP_FIREBASE_${key}`];
  if (val) {
    return val;
  }

  throw new Error('Missing config in .env file!');
};

export const firebaseConfiguration: FirebaseOptions = {
  apiKey: getEnvironmentVariable('API_KEY'),
  authDomain: getEnvironmentVariable('AUTH_DOMAIN'),
  projectId: getEnvironmentVariable('PROJECT_ID'),
  storageBucket: getEnvironmentVariable('STORAGE_BUCCKET'),
  messagingSenderId: getEnvironmentVariable('MESSAGENING_SENDER_ID'),
  appId: getEnvironmentVariable('APP_ID'),
};

console.log(firebaseConfiguration);
