const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkerFile = path.resolve(__dirname, './talker.json');

// não remova esse endpoint, e para o avaliador funcionar 
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile(talkerFile, 'utf-8');
  const response = talkers ? JSON.parse(talkers) : [];
  res.status(200).json(response);
});

app.get('/talker/:id', async (req, res) => {
  const findThisId = req.params.id;
  const talkers = await fs.readFile(talkerFile, 'utf-8');
  const talkersJson = JSON.parse(talkers);
  const lookingForId = talkersJson.filter((talker) => talker.id === Number(findThisId));
  if (lookingForId.length) res.status(200).json(lookingForId[0]);
  else res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.listen(PORT, () => {
  console.log('Online');
});
