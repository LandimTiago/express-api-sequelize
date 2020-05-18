const { Response } = require('../../libs/response');
const { BookService } = require('./service');

// async function create(req, res) {
//   return response.send(res, await Book.create(req.body));
// }
// async function updateById(req, res) {
//   return response.send(res, await Book.updateById(req.params.id, req.body));
// }
// async function deleteById(req, res) {
//   return response.send(res, await Book.deleteById(req.params.id));
// }
// async function findAll(req, res) {
//   return response.send(res, await Book.findAll());
// }
// async function findById(req, res) {
//   return response.send(res, await Book.findById(req.params.id));
// }

const create = async (req, res) =>
  Response.send(res, await BookService.create(req.body));
const updateById = async (req, res) =>
  Response.send(res, await BookService.updateById(req.params.id, req.body));
const deleteById = async (req, res) =>
  Response.send(res, await BookService.deleteById(req.params.id));
const findAll = async (req, res) =>
  Response.send(res, await BookService.findAll());
const findById = async (req, res) =>
  Response.send(res, await BookService.findById(req.params.id));

module.exports = {
  BookController: {
    create,
    updateById,
    deleteById,
    findById,
    findAll,
  },
};
