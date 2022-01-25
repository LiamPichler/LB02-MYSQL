const ouput = document.getElementById("todos");

function loadTodos() {
  console.log("loadTodos");
  fetchEntries().then((result) => {
    result.json().then((data) => {
      console.log("loadTodos ", data);
      displayTodos(data);
    });
  });
}

function updateEvent(id, div) {
  sendUpdate(id, { isDone: true }).then(() => {
    div.className = "todo done";
  });
}

function deleteEvent(id, div) {
  deleteEntry(id).then(() => {
    div.remove();
  });
  console.log("deleteEvnet", id);
}

function displayTodos(todos) {
  todos.forEach((todo) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const done = document.createElement("button");
    const deleteButton = document.createElement("button");
    div.innerHTML = `
        <span class="date">${todo.date}</span>
        <span class="priority">${todo.priority}</span>`;
    div.appendChild(p);
    div.appendChild(done);
    div.appendChild(deleteButton);
    // safe way to insert Text
    p.innerText = decodeURIComponent(todo.text);
    if (todo.isDone) {
      div.className = "todo done";
    } else {
      div.className = "todo";
    }
    p.style.color = todo.color;
    done.className = "done-button";
    deleteButton.className = "delet-button"
    done.onclick = () => updateEvent(todo.id, div);
    deleteButton.onclick = () => deleteEvent(todo.id, div);
    done.innerText = "DONE";
    deleteButton.innerText = "DELET";
    ouput.appendChild(div);
  });
}

window.onload = () => {
  loadTodos();
};
