const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');




// app.set('port',  4000);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//routes

//app.use(require(path.join(__dirname, './src/routes/index')));
app.use(require('./src/routes/index'));



app.set('views', path.join(__dirname, './src/views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, './src/views/layouts/partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname,'public')));

exports.app=functions.https.onRequest(app);