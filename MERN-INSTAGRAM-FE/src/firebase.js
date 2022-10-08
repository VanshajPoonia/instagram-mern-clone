import firebase from "firebase";

// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyBucH7Kzm8Ds5CbuUs8uQJlzTPh3eZcTzA",
//   authDomain: "instagram-clone-23884.firebaseapp.com",
//   databaseURL: "https://instagram-clone-23884.firebaseio.com",
//   projectId: "instagram-clone-23884",
//   storageBucket: "instagram-clone-23884.appspot.com",
//   messagingSenderId: "671034896143",
//   appId: "1:671034896143:web:3aceafdf2319c9f1fc587a",
// });
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyABGAkw15swUA65vWq17YmW-8EP1k0quNI",
  authDomain: "instagram-mern-df21f.firebaseapp.com",
  projectId: "instagram-mern-df21f",
  storageBucket: "instagram-mern-df21f.appspot.com",
  messagingSenderId: "125489425264",
  appId: "1:125489425264:web:ce9503b179be43dc8b7db5",
  measurementId: "G-JMS7L5V0GD",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
