import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC6wTqvWgoR0DUHR4UQczFF5H2eqRCHuGQ",
  authDomain: "pawsome-6446d.firebaseapp.com",
  projectId: "pawsome-6446d",
  storageBucket: "pawsome-6446d.appspot.com",
  messagingSenderId: "213578312471",
  appId: "1:213578312471:web:967c4a5735f1d032c4a552"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth();

export { auth };

//Code used from https://www.youtube.com/watch?v=ql4J6SpLXZA