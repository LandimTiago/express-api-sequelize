const Yup = require('yup');

// validação de dados do ID
const idValidator = Yup.object().shape({
  id: Yup.number().integer().required(),
});

// const validateId = id => async (req, res, next) => {}
async function validateId(req, res, next) {
  const isValidID = await idValidator.isValid(req.params);

  if (!isValidID) {
    return res.status(400).json({
      timestamp: new Date().toISOString(),
      error: 'Bad Request',
      message: 'Id parameter must be integer',
    });
  }

  return next();
}

// Clojure
const validateBody = validator => async (req, res, next) => {
  try {
    await validator.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  Validations: {
    validateBody,
    validateId,
  },
};
