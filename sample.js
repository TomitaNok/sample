const tasksList = [];

const onClickButton = () => {
  const tableBody = document.querySelector("#table-body");
  const name = document.querySelector("#name");
  const task = document.querySelector("#task");

  tasksList.push({ name: name.value, task: task.value });
  tasksList.forEach((todo, idx) =>
    console.log(`${idx}: ${todo.name}, ${todo.task}`)
  );
  generateTableData(tableBody, ["name", "task"]);
};

const generateTableData = (tableBody, queryKeys) => {
  const row = document.createElement("tr");
  queryKeys.forEach((key) => {
    const cell = document.createElement("td");
    const cellText = document.createTextNode(
      tasksList[tasksList.length - 1][key]
    );
    cell.appendChild(cellText);
    row.appendChild(cell);
  });
  return tableBody.appendChild(row);
};
