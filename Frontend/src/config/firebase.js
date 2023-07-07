import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

const firebaseConfig = {
    //amber
//   apiKey: "AIzaSyC6wTqvWgoR0DUHR4UQczFF5H2eqRCHuGQ",
//   authDomain: "pawsome-6446d.firebaseapp.com",
//   projectId: "pawsome-6446d",
//   storageBucket: "pawsome-6446d.appspot.com",
//   messagingSenderId: "213578312471",
//   appId: "1:213578312471:web:967c4a5735f1d032c4a552"


  //karan
  apiKey: "AIzaSyB1gOWhdspbLhbbjZ-cdIRH_Gmum-X5gvg", 
  authDomain: "pawsome-466e0.firebaseapp.com",
  projectId: "pawsome-466e0",
  storageBucket: "pawsome-466e0.appspot.com", 
  databaseURL: "https://pawsome-466e0-default-rtdb.firebaseio.com",     
  messagingSenderId: "828205681546",
  appId: "1:828205681546:web:2a7dcc08b9d5fec2f4d673"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth();

export { auth };

//Code used from https://www.youtube.com/watch?v=ql4J6SpLXZA