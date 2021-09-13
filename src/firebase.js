import firebase from 'firebase/app';
import 'firebase/auth';

//DEVELOPMENT
/*const app = firebase.initializeApp({
  apiKey: 'AIzaSyAgSPZ-KP-M7ipJircKhE4b9lBd1b2U3qQ',
  authDomain: 'sidu-ed-test.firebaseapp.com',
  projectId: 'sidu-ed-test',
  storageBucket: 'sidu-ed-test.appspot.com',
  messagingSenderId: '106343319055',
  appId: '1:106343319055:web:f0452795d3c54e893c857a',
  measurementId: 'G-Q3GHJJZY6G',
});*/

//PRODUCTION
const app = firebase.initializeApp({
  apiKey: 'AIzaSyDt2huU_e0UyoBtJdGEAiKbOkNkS7au58s',
  authDomain: 'sidu-ed-development-auth.firebaseapp.com',
  databaseURL: 'https://sidu-ed-development-auth.firebaseio.com',
  projectId: 'sidu-ed-development-auth',
  storageBucket: 'sidu-ed-development-auth.appspot.com',
  messagingSenderId: '853532829477',
  appId: '1:853532829477:web:6cd68c5f5556df69ca5ccc',
  measurementId: 'G-FYFET76FRK',
});

export const auth = app.auth();
export default app;
