const HTTP_BAD_REQUEST_STATUS = 400;
const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  const isValid = password.length >= 6;
  if (!isValid) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = { validatePassword };