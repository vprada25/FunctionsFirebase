const { Router } = require('express');
const router = Router();

const controller = require('../controller/admin.controller');


//views
router.get('/', controller.home);




router.get('/about', (req, res) => {
    res.render('./layouts/about-us/about.hbs')
})

router.get('/login', (req, res) => {
    res.render('./layouts/login/login.hbs')
})

router.get('/register', (req, res) => {
    res.render('./layouts/register/register.hbs')
})

router.get('/admin', (req, res) => {
    res.render('./layouts/admin/admin.hbs')
})


module.exports = router;