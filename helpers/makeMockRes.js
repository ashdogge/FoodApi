/* istanbul ignore file */
module.exports = () => {
  const res = {
    //Pass in mock response with Jest
    status: jest.fn(() => {
      return res;
    }),
    json: jest.fn(() => {
      return res;
    }),
    send: jest.fn(() => {
      return res;
    }),
  };
  return res;
};
