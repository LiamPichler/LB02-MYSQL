const SERVER = "http://localhost:3000";

function sendForm(data) {
  return fetch(SERVER + "/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function sendUpdate(id, data) {
  return fetch(SERVER + "/notes/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function deleteEntry(id) {
  return fetch(SERVER + "/notes/" + id, {
    method: "DELETE",
  });
}

function fetchEntries() {
  console.log("getEntries");
  return fetch(SERVER + "/notes");
}

function getWelcome() {
  return fetch(SERVER + "/welcome");
}
