var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel')

// Para INGRESAR a session: LOGIN
router.get('/', function (req, res, next) {
    res.render('admin/login', {
      layout:'admin/layout',
    });
  });

  /*Para DESTRUIR variables de session: LOGOUT*/
  router.get('/logout', function (req, res, next) {
    req.session.destroy();   //DESTRUIR
    res.render('admin/login', {
      layout: 'admin/layout'
    });
  });


  router.post('/', async (req, res, next) => {
    try {
      console.log(req.body);
      var usuario = req.body.usuario;
      var password = req.body.password;
   
      var data = await usuariosModel.getUserAndPassword(usuario, password);

      if (data != undefined) {
        req.session.id_usuario = data.id; //id >nombre de la columna
        req.session.nombre = data.usuario;

        res.redirect('/admin/novedades');
      } else {
         res.render('admin/login', {
            layout: 'admin/layout',
            error: true
         });
      } //cierre else  
    } catch (error) {
        console.log(error);
    }
  }); //cierra el post

  module.exports = router;