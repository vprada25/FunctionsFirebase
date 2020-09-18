const { Router } = require('express');
const { admin, login } = require('../controller/admin.controller');
const router = Router();
const { firebase } = require('../../configFirebase');
const db = firebase.firestore();
const controller = require('../controller/admin.controller');
const auth = require('../controller/auth.controller');




//views
router.get('/', controller.home);


router.get('/about', controller.about)
router.get('/login', controller.login)
router.get('/register', controller.register)
router.get('/admin', controller.admin)


router.get('/modal/:id',controller.modal)


//services
router.post('/register', controller.saveUser)
router.post('/admin/addproduct', controller.saveProduct)

router.get('/login', controller.admin)




router.get('/deleteProduct/:id', (req, res) => {

    console.log(req.params.id);
    db.collection("producto").doc(req.params.id).delete()
        .then(() => {
            res.redirect('/admin');
        }).catch((error) => {
            console.error("Error: ", error);
        });
});

router.get('/productId/:id', (req, res) => {


    db.collection("producto").doc(req.params.id).get()
        .then((doc) => {

            req.body.nameproduct = doc.data().name;
            req.body.priceproduct = doc.data().price;
            req.body.categoryproduct = doc.data().category;
            res.render('./layouts/admin/admin.hbs');
        })
        .catch((error) => {
            console.log("Error: ", error);
        });


});

router.get('/deleteUser/:id', (req, res) => {

    console.log(req.params.id);
    db.collection("usuario").doc(req.params.id).delete()
        .then(() => {
            res.redirect('/admin');
        }).catch((error) => {
            console.error("Error: ", error);
        });
});





//services
router.post('/register', controller.saveUser)
router.post('/admin', auth.auth);

router.get('/update/:nombreproducto', (res, req) => {
    


});


module.exports = router;