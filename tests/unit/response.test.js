const { Response } = require('../../src/libs/response');
const { HttpStatus } = require('../../src/libs/httpStatus');

describe('response build function', () => {
  test('should be content array', () => {
    const content = [
      { name: 'tiago', age: 26 },
      { name: 'guilherme', age: 21 },
    ];
    expect(Response.build(content)).toStrictEqual({ content });
  });
  test('Should be content object', () => {
    const content = { name: 'tiago', age: 26 };
    expect(Response.build(content)).toStrictEqual({ content });
  });
});

describe('response build error function', () => {
  test('Should be INTERNAL SERVER ERROR', () => {
    const responseError = Response.buildError();
    expect(responseError.error.status).toEqual(
      HttpStatus.INTERNAL_SERVER_ERROR.number
    );
    expect(responseError.error.data.name).toEqual(
      HttpStatus.INTERNAL_SERVER_ERROR.name
    );
    expect(responseError.error.data.message).toEqual(
      'Internal Server Error, contact the suport'
    );
  });

  test('Should be NOT FOUND', () => {
    const responseError = Response.buildError(
      'Cannot found entity with provided id',
      HttpStatus.NOT_FOUND
    );
    expect(responseError.error.status).toEqual(HttpStatus.NOT_FOUND.number);
    expect(responseError.error.data.name).toEqual(HttpStatus.NOT_FOUND.name);
    expect(responseError.error.data.message).toEqual(
      'Cannot found entity with provided id'
    );
  });
});
