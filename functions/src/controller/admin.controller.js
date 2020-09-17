const { firebase } = require('../../configFirebase');

const controller = {};

const db = firebase.firestore();

controller.home = async (req, res) => {
    res.render('../views/index.hbs',
        {
            comedor: await getComedores(),
            sala: await getSalas(),
            alcoba: await getAlcobas(),
            oficina: await getOficina(),
            decoracion: await getDecoracion(),
            silla: await getSillas()
        })
}

controller.about = (req, res) => {
    res.render('./layouts/about-us/about.hbs')
}


controller.login = (req, res) => {
    firebase.auth().signOut()
        .then(() => {
            console.log("Sesion cerrada exitosamente");
            res.render('./layouts/login/login.hbs')

        }).catch((error) => {
            console.log(error.message)
        });

}

controller.register = (req, res) => {
    res.render('./layouts/register/register.hbs')
}

controller.admin = async (req, res) => {
    res.render('./layouts/admin/admin.hbs',
        {
            user: await getUser(),
            product : await getProduct()
        })

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user)
        }
        else {
           console.log("error")
        }
    });
}

controller.getProduct = async (req, res) => {
    res.render('./layouts/admin/admin.hbs',
        { product: await getProduct() });
}

controller.getUser = async (req, res) => {
    res.render('./layouts/admin/admin.hbs',
        { user: await getUser() });
}

controller.getComedor = async (req, res) => {
    res.render('../views/index.hbs', { comedor: await getComedores() })
}

controller.getProductId = async (req, res) => {
    res.render('./layouts/admin/admin.hbs', { productoID: await getProductId() })
}

/*controller.comedores = async (req, res) => {
    res.render('index.hbs', { comedor: await getComedores() })
}

/*controller.deleteProduct = async (req, res) => {
    res.render(await deleteProduct())
}*/




const getUser = async () => {
    return new Promise(resolve => {
        let listUser = [];
        db.collection("usuario").get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    let id = doc.id;
                    let primernombre = doc.data().primernombre;
                    let segundonombre = doc.data().segundonombre;
                    let primerapellido = doc.data().primerapellido;
                    let segundoapellido = doc.data().segundoapellido;
                    let usuario = doc.data().usuario;
                    let contrasena = doc.data().contrasena;
                    user = {
                        id: id,
                        primernombre: primernombre,
                        segundonombre: segundonombre,
                        primerapellido: primerapellido,
                        segundoapellido: segundoapellido,
                        usuario: usuario,
                        contrasena: contrasena
                    }

                    listUser.push(user)

                });
                console.log(listUser)
                resolve(listUser);
                // console.log(listUser);

            })
            .catch(function (error) {
                console.log("error :", error);
            });

    })
}

const getProductId = async (req, res) => {
    return new Promise(resolve => {
        let listProductId = [];
        db.collection("usuario").doc(req.params.id).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    let id = doc.id;
                    let nombre = doc.data().nombre;
                    let precio = doc.data().precio;
                    let categoria = doc.data().categoria;
                    producto = {
                        id: id,
                        nombre: nombre,
                        precio: precio,
                        categoria: categoria
                    }
                    listProductId.push(producto);

                });
                console.log(listProductId)
                resolve(listProductId);
                // console.log(listUser);

            })
            .catch(function (error) {
                console.log("error :", error);
            });

    })
}

/*const deleteProduct = async (req,res) => {
    return new Promise(resolve => {
        console.log(req.params.id);
        db.collection("producto").doc(req.params.id).delete()
            .then(() => {
                resolve(res.render('./layouts/admin/admin.hbs'));
            }).catch((error) => {
                console.error("Error: ", error);
            });
    })
}*/

const getProduct = async () => {
    return new Promise(resolve => {
        let listProduct = [];
        db.collection("producto").get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    let id = doc.id;
                    let nombre = doc.data().nombre;
                    let precio = doc.data().precio;
                    let categoria = doc.data().categoria;
                    producto = {
                        id: id,
                        nombre: nombre,
                        precio: precio,
                        categoria: categoria
                    }
                    listProduct.push(producto);
                });
                console.log(listProduct)
                resolve(listProduct);
                // console.log(listUser);
            })
            .catch(function (error) {
                console.log("error :", error);
            });

    })
}


const getComedores = async () => {
    return new Promise(resolve => {
        let listComedores = [];
        db.collection("producto").where("categoria", "==", "COMEDORES").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let id = doc.id;
                    let nombre = doc.data().nombre;
                    let precio = doc.data().precio;
                    let categoria = doc.data().categoria;
                    comedor = {
                        id: id,
                        nombre: nombre,
                        precio: precio,
                        categoria: categoria
                    }
                    console.log(comedor);
                    listComedores.push(comedor);
                });
                resolve(listComedores)
                // console.log(listUser);
            })
            .catch(function (error) {
                console.log("error :", error);
            });

    })
}
const getSalas = async () => {
    return new Promise(resolve => {
        let listSalas = [];
        db.collection("producto").where("categoria", "==", "SALAS").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let id = doc.id;
                    let nombre = doc.data().nombre;
                    let precio = doc.data().precio;
                    let categoria = doc.data().categoria;
                    salas = {
                        id: id,
                        nombre: nombre,
                        precio: precio,
                        categoria: categoria
                    }
                    console.log(salas);
                    listSalas.push(salas);
                });
                resolve(listSalas)
                // console.log(listUser);
            })
            .catch(function (error) {
                console.log("error :", error);
            });

    })
}
const getAlcobas = async () => {
    return new Promise(resolve => {
        let listAlcoba = [];
        db.collection("producto").where("categoria", "==", "ALCOBAS").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let id = doc.id;
                    let nombre = doc.data().nombre;
                    let precio = doc.data().precio;
                    let categoria = doc.data().categoria;
                    alcobas = {
                        id: id,
                        nombre: nombre,
                        precio: precio,
                        categoria: categoria
                    }
                    console.log(alcobas);
                    listAlcoba.push(alcobas);
                });
                resolve(listAlcoba)
                // console.log(listUser);
            })
            .catch(function (error) {
                console.log("error :", error);
            });

    })
}
const getOficina = async () => {
    return new Promise(resolve => {
        let listoficina = [];
        db.collection("producto").where("categoria", "==", "OFICINA").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let id = doc.id;
                    let nombre = doc.data().nombre;
                    let precio = doc.data().precio;
                    let categoria = doc.data().categoria;
                    oficina = {
                        id: id,
                        nombre: nombre,
                        precio: precio,
                        categoria: categoria
                    }
                    console.log(oficina);
                    listoficina.push(oficina);
                });
                resolve(listoficina)
                // console.log(listUser);
            })
            .catch(function (error) {
                console.log("error :", error);
            });

    })
}
const getDecoracion = async () => {
    return new Promise(resolve => {
        let listDecoracion = [];
        db.collection("producto").where("categoria", "==", "DECORACION").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let id = doc.id;
                    let nombre = doc.data().nombre;
                    let precio = doc.data().precio;
                    let categoria = doc.data().categoria;
                    decoracion = {
                        id: id,
                        nombre: nombre,
                        precio: precio,
                        categoria: categoria
                    }
                    console.log(decoracion);
                    listDecoracion.push(decoracion);
                });
                resolve(listDecoracion)
                // console.log(listUser);
            })
            .catch(function (error) {
                console.log("error :", error);
            });

    })
}
const getSillas = async () => {
    return new Promise(resolve => {
        let listSillas = [];
        db.collection("producto").where("categoria", "==", "SILLAS").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let id = doc.id;
                    let nombre = doc.data().nombre;
                    let precio = doc.data().precio;
                    let categoria = doc.data().categoria;
                    silla = {
                        id: id,
                        nombre: nombre,
                        precio: precio,
                        categoria: categoria
                    }
                    console.log(silla);
                    listSillas.push(silla);
                });
                resolve(listSillas)
                // console.log(listUser);
            })
            .catch(function (error) {
                console.log("error :", error);
            });

    })
}




controller.act = (req, res) => {
    console.log(req.params.id);

    db.collection("producto").doc(req.params.id).update({
        name: nameproduct1.value,
        price: priceproduct1.value,
        category: categoryproduct1.value,
    })
        .then(() => {
            console.log("Document successfully updated!");
            res.render('/admin');
        })
        .catch((error) => {
            console.log("Error: ", error);
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

var emailUsuarioLogueado = "hola";

controller.ControlLogin = (res, req) => {


}



module.exports = controller;