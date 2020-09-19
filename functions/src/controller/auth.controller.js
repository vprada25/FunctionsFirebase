const { firebase } = require('../../configFirebase');

const controller = {};
const db = firebase.auth();

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






module.exports = controller;