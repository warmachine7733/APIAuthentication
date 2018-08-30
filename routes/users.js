const express = require('express');
const router = express.Router();


const {validateBody,schemas} = require('../helpers/routesHelper')
const userController = require('../controller/users')

router.route('/signup')
      .post(validateBody(schemas.authSchema)
          ,userController.signup)

router.route('/signin')
       .post(userController.signin)
       
router.route('/secret')
       .get(userController.secret)       

module.exports = router;       