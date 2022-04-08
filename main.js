let tasksList = [];

const generateTableData = (tableBody, queryKeys) => {
  tasksList.forEach((task) => {
    const row = document.createElement("tr");
    queryKeys.forEach((key) => {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(task[key]);
      cell.appendChild(cellText);
      row.appendChild(cell);
      if(key == "priority") {
        row.setAttribute("class", task[key])
      }
    });
    tableBody.appendChild(row);
  });
};

const syncTasks = async () => {
  tasksList = await getAllTasks();
  console.log(tasksList);
  const tableBody = document.querySelector("#table-body");
  generateTableData(tableBody, [
    "title",
    "uname",
    "priority",
    "createdAt",
    "completed",
  ]);
  // createNewTask({name: "piyo", title: "ぴよぴよ", desctiption: "ぴよよー", priority: "Top"})
};