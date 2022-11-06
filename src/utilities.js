const HTTP_400_STATUS = 400;
const crypto = require('crypto');

const createToken = () => crypto.randomBytes(8).toString('hex');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const isValid = regEmail.test(email);

  if (!email) {
    res.status(HTTP_400_STATUS)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isValid) {
  res.status(HTTP_400_STATUS)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    res.status(HTTP_400_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  const isValid = password.length >= 6;
  if (!isValid) {
    res.status(HTTP_400_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  createToken,
  validateEmail,
  validatePassword,
};