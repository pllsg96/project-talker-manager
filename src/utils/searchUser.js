// const fs = require('fs').promises;
// const path = require('path');

// const talkerFile = path.resolve(__dirname, '..', 'talker.json');

const { getTalkers } = require('./getTalkers');

const searchUser = async (query) => {
  const talkers = await getTalkers();
  const searchQuery = talkers
    .filter((talker) => (talker.name.includes(query)));
  return searchQuery;
};

module.exports = { searchUser };