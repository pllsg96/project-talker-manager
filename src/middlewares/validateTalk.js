const HTTP_BAD_REQUEST_STATUS = 400;

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!watchedAt) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!regexDate.test(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  
  if (rate == null) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" é obrigatório' });
  }

  const testRate = (!(Number.isInteger(rate)) || !((rate >= 1) && (rate <= 5)));

  if (testRate) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = { validateTalk, validateWatchedAt, validateRate };