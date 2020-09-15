const { Router } = require('express');
const router = Router();

const controller = require('../controller/admin.controller');


//views
router.get('/', controller.home);
router.get('/about', controller.about)
router.get('/login', controller.login)
router.get('/register', controller.register)
router.get('/admin', controller.admin)


module.exports = router;