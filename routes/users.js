const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("../passport");
const { validateBody, schemas } = require("../helpers/routesHelper");
const userController = require("../controller/users");

router
  .route("/signup")
  .post(validateBody(schemas.authSchema), userController.signup);

router
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate("local", { session: false }),
    userController.signin
  );

//
router
  .route("/oauth/google")
  .post(passport.authenticate("googleToken", { session:false }),userController.googleOAuth);

router
  .route("/secret")
  .get(passport.authenticate("jwt", { session: false }), userController.secret);

module.exports = router;
