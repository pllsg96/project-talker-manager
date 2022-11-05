const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const { createToken, validateEmail } = require('./utilities');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

const talkerFile = path.resolve(__dirname, './talker.json');

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile(talkerFile, 'utf-8');
  const response = talkers ? JSON.parse(talkers) : [];
  res.status(HTTP_OK_STATUS).json(response);
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const findThisId = req.params.id;
  const talkers = await fs.readFile(talkerFile, 'utf-8');
  const talkersJson = JSON.parse(talkers);
  const lookingForId = talkersJson.filter((talker) => talker.id === Number(findThisId));
  if (lookingForId.length) res.status(HTTP_OK_STATUS).json(lookingForId[0]);
  else res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});

// Requisito 3
app.post('/login', validateEmail, async (_req, res) => {
  const tkn = createToken();
  res.status(HTTP_OK_STATUS).json({ token: tkn });
});

app.listen(PORT, () => {
  console.log('Online');
});
