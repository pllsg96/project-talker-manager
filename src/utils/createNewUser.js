const fs = require('fs').promises;
const path = require('path');

const talkerFile = path.resolve(__dirname, '..', 'talker.json');

const { getTalkers } = require('./getTalkers');

const createNewUser = async (name, age, talk) => {
  const talkers = await getTalkers();

  const lastOneId = Number(talkers[talkers.length - 1].id);

  const newTalker = {
    id: lastOneId + 1,
    name,
    age,
    talk,
  };
  talkers.push(newTalker);
  await fs.writeFile(talkerFile, JSON.stringify(talkers, null, 2));
  return talkers;
};

module.exports = { createNewUser };