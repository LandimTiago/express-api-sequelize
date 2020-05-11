const Yup = require('yup');
const { response, HttpStatus } = require('../libs');

// validação de dados do ID
const idValidator = Yup.object().shape({
  id: Yup.number().integer().required(),
});

// const validateId = id => async (req, res, next) => {}
async function validateId(req, res, next) {
  const isValidID = await idValidator.isValid(req.params);

  if (!isValidID) {
    return response.send(
      res,
      response.buildError(
        'Id parameter must be integer',
        HttpStatus.BAD_REQUEST
      )
    );
  }

  return next();
}

// Clojure
const validateBody = validator => async (req, res, next) => {
  try {
    await validator.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return response.send(
      res,
      response.buildError(error.errors.join(', '), HttpStatus.BAD_REQUEST)
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
