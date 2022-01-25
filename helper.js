validateEmail = function (email) {
  let regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

validateHex = function (color) {
  const regex = /[0-9A-Fa-f]{6}/g;
  return regex.test(color);
};

validatePriority = function (priority) {
  return priority <= 3 && priority >= 1;
};

validateText = function (text) {
  return text.length > 0 && text.length <= 255;
};

validateDate = function (date) {
  dateNow = new Date();
  return date > dateNow;
};

module.exports.validateInputs = function (text, priority, date, email, color) {
  const error = [];
  if (!validateText(text)) {
    error.push("Text is not valid");
  }
  if (!validatePriority(priority)) {
    error.push("Priority is not valid");
  }
  if (!validateDate(date)) {
    error.push("Date is not valid");
  }
  if (!validateEmail(email)) {
    error.push("Email is not valid");
  }
  if (!validateHex(color)) {
    error.push("Color is not valid");
  }
  return error;
};
