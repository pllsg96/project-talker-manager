const express = require('express');
const bodyParser = require('body-parser');
const { createToken } = require('./utils/generateToken');
const { validateEmail } = require('./middlewares/validateEmail');
const { validatePassword } = require('./middlewares/validatePassword');
const { validateToken } = require('./middlewares/validateToken');
const { getTalkers } = require('./utils/getTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', async (_req, res) => {
  const response = await getTalkers();
  res.status(HTTP_OK_STATUS).json(response);
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const findThisId = req.params.id;
  const response = await getTalkers();
  const lookingForId = response.filter((talker) => talker.id === Number(findThisId));
  if (lookingForId.length) res.status(HTTP_OK_STATUS).json(lookingForId[0]);
  else res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});

// Requisito 3 e 4
app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const tkn = createToken();
  res.status(HTTP_OK_STATUS).json({ token: tkn });
});

// Requisito 5
app.post('/talker', validateToken, (_req, res) => {
  res.status(HTTP_OK_STATUS).json('?');
});

app.listen(PORT, () => {
  console.log('Online');
});
