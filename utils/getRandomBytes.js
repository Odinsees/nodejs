const { promisify } = require('util');
const randomBytesAsync = promisify(require('crypto').randomBytes);

module.exports = function getRandomBytes(data) {
  const { bytes } = data;
  return randomBytesAsync(bytes);
};
