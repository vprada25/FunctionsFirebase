const { firebase } = require('../../configFirebase');

const controller = {};
const db = firebase.firestore();

controller.home = (req, res) => {
    res.render('index.hbs')
}
controller.about = (req, res) => {
    res.render('./layouts/about-us/about.hbs')
}
controller.login = (req, res) => {
    res.render('./layouts/login/login.hbs')
}
controller.register = (req, res) => {
    res.render('./layouts/register/register.hbs')
}
controller.admin = (req, res) => {
    res.render('./layouts/admin/admin.hbs')
}




controller.save = (req, res) => {
    console.log(req.body);

    firebase.auth().createUserWithEmailAndPassword(req.body.emailUser, req.body.contrasena)
        .then(() => {
            db.collection("usuario").add({
                usuario: req.body.usuario,
                contrasena: req.body.contrasena,
                primernombre: req.body.primernombre,
                segundonombre: req.body.segundonombre,
                primerapellido: req.body.primerapellido,
                segundoapellido: req.body.segundoapellido,
                emailUser: req.body.emailUser

            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    res.render('./layouts/login/login.hbs')
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });

        })
        .catch((error) => {
            console.log(error)
        });


}













module.exports = controller;