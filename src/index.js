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

app.listen(PORT, () => {
  console.log('Online');
});
