const fs = require('fs').promises;
const path = require('path');

const talkerFile = path.resolve(__dirname, '../talker.json');

const getTalkers = async () => {
  const talkers = await fs.readFile(talkerFile, 'utf-8');
  const response = talkers ? JSON.parse(talkers) : [];
  return response;
};

module.exports = { getTalkers };