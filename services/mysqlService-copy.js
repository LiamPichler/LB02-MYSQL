let sampleEntries = [];

module.exports.saveEntryToDatabase = async function (
  text,
  date,
  email,
  priority,
  color
) {
  const id = Math.floor(Math.random() * 1000000);
  sampleEntries.push({
    id,
    text: encodeURIComponent(text),
    date,
    email,
    priority,
    color,
    isDone: false,
  });

  // TODO: Create a new entry in the database
};
module.exports.updateEntryInDatabase = async function (id, isDone) {
  sampleEntries.forEach((entry) => {
    if (entry.id == id) {
      entry.isDone = isDone;
    }
  });
  console.log(sampleEntries);
  // TODO: Update an entry in the database
};
module.exports.deleteEntryFromDatabase = async function (id) {
  sampleEntries = sampleEntries.filter((entry) => entry.id != id);
  // TODO: Delete an entry in the database
};
module.exports.getAllEntriesFromDatabase = async function () {
  return sampleEntries;
  // TODO: Get all entries from the database
};
