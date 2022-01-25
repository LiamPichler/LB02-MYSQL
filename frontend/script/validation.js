// read form element
let ALL_INPUT_VALID;

const form = document.getElementById("form");

const text = document.getElementById("text");
const priority = document.getElementById("priority");
const date = document.getElementById("date");
const email = document.getElementById("email");
const color = document.getElementById("color");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkText(input) {
  if (input.value.length > 0 && input.value.length <= 255) {
    showSuccess(input);
  } else {
    showError(input, "Text max lenght are 255 characters");
    ALL_INPUT_VALID = false;
  }
}

function checkPriority(input) {
  if (input.value <= 3 && input.value >= 1) {
    showSuccess(input);
  } else {
    showError(input, "Priority must be between 1 and 3");
    ALL_INPUT_VALID = false;
  }
}

function checkDate(input) {
  const dateNow = new Date();
  const dateInput = new Date(input.value);
  if (dateInput > dateNow) {
    showSuccess(input);
  } else {
    showError(input, "Date isnt in the future");
    ALL_INPUT_VALID = false;
  }
}

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email not valid");
    ALL_INPUT_VALID = false;
  }
}

function checkColor(input) {
  const regex = /[0-9A-Fa-f]{6}/g;
  if (regex.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Color not valid");
    ALL_INPUT_VALID = false;
  }
}

function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is a mandatory field`);
      isRequired = true;
      ALL_INPUT_VALID = false;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate form input elements
function validateForm() {
  if (!checkRequired([text, priority, date, email])) {
    checkText(text);
    checkPriority(priority);
    checkDate(date);
    checkEmail(email);
    checkColor(color);
  }
}

/**
 * Make a testcall after the page is loaded
 */
window.onload = () => {
  console.log(`Make test call to the server ...`);
  getWelcome().then(
    (result) => {
      console.log(`Response from server: ${result}`);
    },
    (error) => {
      console.log(error);
    }
  );
};

// Event listeners
form.addEventListener("submit", function (e) {
  ALL_INPUT_VALID = true;
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
  //Send data
  if (ALL_INPUT_VALID) {
    let formData = {
      text: text.value,
      priority: priority.value,
      date: date.value,
      email: email.value,
      color: color.value,
    };
    console.log(`All input is valid. Send data to server:
      ${JSON.stringify(formData)}`);

    sendForm(formData)
      .then((result) => {
        console.log(`Response from server: ${result}`);
        window.location.href = "./confirm.html";
      })
      .catch((err) => {
        console.log(`Error occurred: ${err}`);
      });
  } else {
    console.log(
      "At least one validation failed. No data sent to contact-server."
    );
  }
});
