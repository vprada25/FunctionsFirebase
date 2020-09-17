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
router.get('/Logout', controller.ControlLogin)




//services
router.post('/register', controller.saveUser)
router.post('/admin/addproduct', controller.saveProduct)


router.get('/login', controller.admin)
router.get('/admin/getProduct', controller.getProduct)
router.get('/admin/getUsers', controller.getUser)



router.get('/deleteProduct/:id', (req, res) => {

    console.log(req.params.id);
    db.collection("producto").doc(req.params.id).delete()
        .then(() => {
            res.render('./layouts/admin/admin.hbs');
        }).catch((error) => {
            console.error("Error: ", error);
        });
});





//services
router.post('/register', controller.saveUser)
router.post('/admin', auth.auth);
router.post('/login', controller.ControlLogin);


module.exports = router;