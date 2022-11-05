const HTTP_NOT_FOUND_STATUS = 404;
const crypto = require('crypto');

const createToken = () => crypto.randomBytes(8).toString('hex');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const isValid = regEmail.test(email);
  
  if (!isValid) res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Formato de e-mail inválido' });
  next();

  if (!email) res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Campo e-mail vazio' });
  
  next();
};

module.exports = { createToken, validateEmail };