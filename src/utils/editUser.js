const fs = require('fs').promises;
const path = require('path');

const talkerFile = path.resolve(__dirname, '..', 'talker.json');

const { getTalkers } = require('./getTalkers');

const editUser = async (body, idToEdit) => {
  const talkers = await getTalkers();
  const talkerEdited = talkers
    .map((talker) => (talker.id === Number(idToEdit) ? { id: talker.id, ...body } : talker));

  await fs.writeFile(talkerFile, JSON.stringify(talkerEdited, null, 2));
  return talkerEdited;
};

module.exports = { editUser };