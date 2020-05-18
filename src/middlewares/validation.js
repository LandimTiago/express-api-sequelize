const Yup = require('yup');
const { Response, HttpStatus } = require('../libs');

// validação de dados do ID
const idValidator = Yup.object().shape({
  id: Yup.number().integer().required(),
});

// const validateId = id => async (req, res, next) => {}
const validateId = async (req, res, next) => {
  const isValidID = await idValidator.isValid(req.params);

  if (!isValidID) {
    return Response.send(
      res,
      Response.buildError(
        'Id parameter must be integer',
        HttpStatus.BAD_REQUEST
      )
    );
  }

  return next();
};

// Clojure
const validateBody = validator => async (req, res, next) => {
  try {
    await validator.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return Response.send(
      res,
      Response.buildError(error.errors.join(', '), HttpStatus.BAD_REQUEST)
    );

    // return res.status(400).json(error);
  }
};

module.exports = {
  Validations: {
    validateBody,
    validateId,
  },
};
