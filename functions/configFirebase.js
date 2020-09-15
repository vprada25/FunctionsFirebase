const admin = require("firebase-admin");
const firebase = require('firebase')

const serviceAccount = require("./ofimuebles-4518c-firebase-adminsdk-3j00i-d706022d52.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ofimuebles-4518c.firebaseio.com"
});


var firebaseConfig = {
    apiKey: "AIzaSyBKlKutxzQLVyFCjodkwoU_aQ7rpzF3SXs",
    authDomain: "ofimuebles-4518c.firebaseapp.com",
    databaseURL: "https://ofimuebles-4518c.firebaseio.com",
    projectId: "ofimuebles-4518c",
    storageBucket: "ofimuebles-4518c.appspot.com",
    messagingSenderId: "854751746711",
    appId: "1:854751746711:web:35546f482d5067537427d2"
  };
  // Initialize Firebase

firebase.initializeApp(firebaseConfig);

module.exports = { admin, firebase };