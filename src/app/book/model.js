const Sequelize = require('sequelize');
const Yup = require('yup');

// validação de dados para criação
const bookCreateValidator = Yup.object().shape({
  name: Yup.string().required().min(4).max(40),
  description: Yup.string().min(4).max(255),
  pages: Yup.number().integer().required().min(1),
});
// validação de dados para atualização
const bookUpdatedValidator = Yup.object().shape({
  name: Yup.string().min(4).max(40),
  description: Yup.string().min(4).max(255),
  pages: Yup.number().integer().min(1),
});

class Book extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        pages: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }
}

module.exports = { Book, bookCreateValidator, bookUpdatedValidator };
