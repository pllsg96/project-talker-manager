const HTTP_UNAUTHORIZED_STATUS = 401;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  const tkn = JSON.parse(token);

  console.log(tkn.token);
  
  if (!tkn.token) {
    return res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }

  if (tkn.token.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }

  next();
};

module.exports = { validateToken };