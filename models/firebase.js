// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getFirestore, collection, addDoc, getDocs, getDoc, where, updateDoc} = require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR4InYindDDpv6cMQ7rTndPcmKstzZ6K4",
  authDomain: "fridgehero-6c678.firebaseapp.com",
  projectId: "fridgehero-6c678",
  storageBucket: "fridgehero-6c678.appspot.com",
  messagingSenderId: "1016274955444",
  appId: "1:1016274955444:web:e02d977c3769cab7187be1",
  measurementId: "G-9SH0BCRXQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

module.exports = {db, collection, addDoc, getDocs, getDoc, getDocs, where, updateDoc}

