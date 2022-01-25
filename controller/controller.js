const { validateInputs } = require("../helper");
const {
  saveEntryToDatabase,
  getAllEntriesFromDatabase,
  updateEntryInDatabase,
  deleteEntryFromDatabase,
} = require("../services/mysqlService");
const HTTP_STATUS = require("../config/httpcodes.config");

/***
 * Takes request body validates it and saves it to the database
 */
module.exports.createEntry = function (req, res) {
  const { text, date, email, priority, color } = req.body;
  const validator = validateInputs(
    text,
    priority,
    new Date(date),
    email,
    color
  );
  if (validator.length > 0) {
    res.status(HTTP_STATUS.NOT_ACCEPTABLE).send(JSON.stringify(validator));
    return;
  } else {
    saveEntryToDatabase(text, date, email, priority, color, (err, msg) => {
      console.log("yo");
      if (err) {
        res.status(HTTP_STATUS.SERVER_ERROR).send(err);
        return;
      }
      res.status(HTTP_STATUS.SUCCESSFUL_CREATED).send(msg);
    });
  }
};

/**
 * Takes isDone variable from the request body and updates the entry in the database
 */
module.exports.updateEntry = function (req, res) {
  const { isDone } = req.body;
  const { id } = req.params;
  updateEntryInDatabase(id, isDone, (err, msg) => {
    if (err) {
      res.status(HTTP_STATUS.SERVER_ERROR).send(err);
      return;
    }
    res.status(HTTP_STATUS.SUCCESSFUL_CREATED).send(msg);
  });
};

/**
 * Deletes the entry from the database according to the id
 */
module.exports.deleteEntry = function (req, res) {
  const { id } = req.params;
  deleteEntryFromDatabase(id, (err, msg) => {
    if (err) {
      res.status(HTTP_STATUS.SERVER_ERROR).send(err);
      return;
    }
    res.status(HTTP_STATUS.SUCCESSFUL_CREATED).send(msg);
  });
};

/**
 * Gets all entries from the database
 */
module.exports.getEntries = function (req, res) {
  getAllEntriesFromDatabase((err, msg) => {
    if (err) {
      res.status(HTTP_STATUS.SERVER_ERROR).send(err);
      return;
    }
    res.status(HTTP_STATUS.SUCCESSFUL_CREATED).send(msg);
  });
};
