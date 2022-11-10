const HTTP_UNAUTHORIZED_STATUS = 401;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  console.log(token);
  
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }

  next();
};

module.exports = { validateToken };