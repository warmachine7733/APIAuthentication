const Joi = require("joi");

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      console.log("in joi",req.body)
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        res.status(400).json(result.error);
      }
      //store evaluated value in req.value.body
      if (!req.value) req.value = {};
      req.value["body"] = result.value;
      next();
    };
  },
  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
};
