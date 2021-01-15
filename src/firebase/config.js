import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCPsNGSjyJJvKBHAD_5q6NpRSVc7l68Ag0",
    authDomain: "charles-moll.firebaseapp.com",
    projectId: "charles-moll",
    storageBucket: "charles-moll.appspot.com",
    messagingSenderId: "742985169420",
    appId: "1:742985169420:web:55c3169b6f2e2170fa8c29",
    measurementId: "G-6GY0T16Q8P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// AUTH
export var auth = firebase.auth();

// FIRESTORE
export var db = firebase.firestore();
firebase.firestore().settings({ timestampsInSnaphots: true });

// STORAGE
export var storageRef = firebase.storage().ref();
export var storageTaskState = firebase.storage.TaskEvent.STATE_CHANGED;
