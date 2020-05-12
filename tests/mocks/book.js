const faker = require('faker');

const create = (data = {}) => ({
  name: faker.lorem.words(2),
  description: faker.lorem.sentence(),
  pages: faker.random.number({ min: 1, max: 10000 }),
  ...data,
});

const getLargeName = () => faker.lorem.words(15);
const getLargeDescriptionm = () => faker.lorem.sentences(10);

module.exports = {
  BookMock: { create, getLargeName, getLargeDescriptionm },
};
