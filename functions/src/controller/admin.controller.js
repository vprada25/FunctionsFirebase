const { firebase } = require('../configFirebase');

const controller = {};
const db = firebase.firestore();

controller.home = (req, res) =>{
    res.render('index.hbs')
}
















module.exports = controller;