/* Coders:
     - Sean Nguyen
     - Matthew Nguyen
*/

import firebase from "firebase";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN84lCLbOBdBGUUgqZDViXdEsaL_8ap5s",
  authDomain: "projectaerie-7bab7.firebaseapp.com",
  databaseURL: "https://projectaerie-7bab7.firebaseio.com",
  projectId: "projectaerie-7bab7",
  storageBucket: "projectaerie-7bab7.appspot.com",
  messagingSenderId: "651624054890",
  appId: "1:651624054890:web:612ee99748131b95a68a13",
  measurementId: "G-F6NBVPLG95",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider(); //Tells firebase we want google login service

export { auth, provider }; //This can be asked for
export default db; //This is always
