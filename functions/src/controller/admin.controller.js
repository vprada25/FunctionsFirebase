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

controller.admin = async (req, res) => {
    res.render('./layouts/admin/admin.hbs');


}

controller.getProduct = async (req, res) => {
    res.render('./layouts/admin/admin.hbs',
        { product: await getProduct() });


}
controller.getUser = async (req, res) => {
    res.render('./layouts/admin/admin.hbs',
        { user: await getUser() });


}


const getUser = async () => {
    return new Promise(resolve => {
        let listUser = [];
        db.collection("usuario").get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    listUser.push(doc.data())

                });

                resolve(listUser);
                // console.log(listUser);

            })
            .catch(function (error) {
                console.log("error :", error);
            });

    })
}

const getProduct = async () => {
    return new Promise(resolve => {
        let listProduct = [];
        db.collection("producto").get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    listProduct.push(doc.data())

                });

                resolve(listProduct);
                // console.log(listUser);

            })
            .catch(function (error) {
                console.log("error :", error);
            });

    })
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




module.exports = controller;