const { Router } = require('express');
const router = Router();

const controller = require('../controller/admin.controller');
const auth = require('../controller/auth.controller');


//views
router.get('/', controller.home);
router.get('/about', controller.about)
router.get('/login', controller.login)
router.get('/register', controller.register)
router.get('/admin', controller.admin )

//services
router.post('/register', controller.saveUser)
router.post('/admin/addproduct', controller.saveProduct)


router.get('/login', controller.admin)


//services
//router.post('/register', controller.save)
router.post('/admin', auth.auth);
router.post('/login', auth.ControlLogin);


module.exports = router;