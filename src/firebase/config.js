// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// import "firebase/compat/auth";

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import "firebase/analytics";
import "firebase/auth";
// import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx5EoJoE5cXzYHjYp2-M0fOP005NP34Pw",
  authDomain: "shopping-331de.firebaseapp.com",
  projectId: "shopping-331de",
  storageBucket: "shopping-331de.appspot.com",
  messagingSenderId: "925152184691",
  appId: "1:925152184691:web:887d1d6bd20155890c5d06",
  measurementId: "G-74STS6PN8D",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.getAnalytics(app);

// const auth = firebase.auth();
const db = firebase.firestore();
// const db = firebase.firestore;
export { db };
export default firebase;
