const fs = require('fs').promises;
const path = require('path');

const talkerFile = path.resolve(__dirname, '..', 'talker.json');

const { getTalkers } = require('./getTalkers');

const deleteUser = async (idToDelete) => {
  const talkers = await getTalkers();
  const talkerToDelete = talkers
    .filter((talker) => (talker.id !== Number(idToDelete)));

  await fs.writeFile(talkerFile, JSON.stringify(talkerToDelete, null, 2));
  return talkerToDelete;
};

module.exports = { deleteUser };