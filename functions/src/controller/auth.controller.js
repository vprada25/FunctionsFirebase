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



controller.auth=(req, res)=>{
 
  var email=req.body.email;
  var contrasena=req.body.contrasena;

  firebase.auth().signInWithEmailAndPassword(email, contrasena)
  .then((user) => {
    console.log('Sesion Inciada');
    res.render('./layouts/admin/admin.hbs',{email});
   

       }).catch(function (error) {
             
             console.log("Error: ", error.message);
             
           res.render('./layouts/login/login.hbs');

      
           });

   
}



module.exports = controller;