let tasksList = [];

const generateTableData = (tableBody, queryKeys) => {
  tasksList.forEach((task) => {
    const row = document.createElement("tr");
    row.addEventListener(
      "click",
      () => {
        console.log(task._id);
      },
      false
    );
    // row.addEventListener("click", generateDetail(task._id), false);
    queryKeys.forEach((key) => {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(task[key]);
      cell.appendChild(cellText);
      row.appendChild(cell);
      if (key == "priority") {
        row.setAttribute("class", task[key]);
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

/**
 *
 * @param {string} _id
 * @returns {HTMLParagraphElement}
 */
const generateDetail = (_id) => {
  const article = document.querySelector("#page-body");

  const task = tasksList.find((task) => task._id == _id);
  const p = document.createElement("p");
  const text = document.createTextNode(task.description);
  p.appendChild(text);

  article.replaceWith(p);
};
