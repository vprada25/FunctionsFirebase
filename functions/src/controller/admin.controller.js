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


    let listUser = [];

    db.collection("usuario").get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                listUser.push(doc.data())
            });
            res.render('./layouts/admin/admin.hbs', {
                user: listUser

            });
            console.log(listUser);

        })
        .catch(function (error) {
            console.log("error :", error);
        });


}




controller.saveUser = (req, res) => {
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
controller.saveProduct = (req, res) => {
    console.log(req.body);


    db.collection("producto").add({
        nombre: req.body.nameproduct,
        precio: req.body.priceproduct,
        categoria: req.body.categoryproduct,


    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            res.render('./layouts/admin/admin.hbs')
        })
        .catch((error) => {
            console.error("Error: ", error);
        });



}

controller.listUsers = (req, res) => {

    let user = db.collection('usuario');
    let listUsers = user.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

}


var emailUsuarioLogueado="hola";

controller.ControlLogin=(res, req) =>{
  
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        emailUsuarioLogueado = user.email;
      }
      // reques flash
      // body parce
      else {
        res.render('./layouts/login/login.hbs');
      }
    });
  


}







module.exports = controller;