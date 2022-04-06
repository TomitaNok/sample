const tasksList = [];

const onClickButton = () => {
  const todoList = document.querySelector("#todo-list");
  const name = document.querySelector("#name");
  const task = document.querySelector("#task");

  tasksList.push({ name: name.value, task: task.value });
  tasksList.forEach((todo, idx) =>
    console.log(`${idx}: ${todo.name}, ${todo.task}`)
  );
  const tbl = generateTable();

  todoList.childNodes.forEach((child) => {
    todoList.removeChild(child);
  });
  todoList.appendChild(tbl);
};

const generateTable = () => {
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  tasksList.forEach((task) => {
    const row = document.createElement("tr");
    Object.values(task).forEach((value) => {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(value);
      cell.appendChild(cellText);
      row.appendChild(cell);
    });
    tblBody.appendChild(row);
  });
  tbl.appendChild(tblBody);
  return tbl;
};
