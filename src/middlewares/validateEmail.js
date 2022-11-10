const HTTP_BAD_REQUEST_STATUS = 400;

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const isValid = regEmail.test(email);

  if (!email) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isValid) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }

  next();
};

module.exports = { validateEmail };