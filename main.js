/**
 * @type {Task[]}
 * @typedef {Object} Task
 * @property {string} _id
 * @property {string} uname
 * @property {string} title
 * @property {string} description
 * @property {string} priority
 * @property {boolean} completed
 * @property {Date} createdAt
 */
let tasksList = [];

const generateTableData = (tableBody, queryKeys, profs) => {
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
      if (key == "uname") {
        const responce = profs.get(task[key]);
        const icon = document.createElement("td");
        const img = document.createElement("img");
        img.setAttribute("class", "icon");
        responce.then((res) => {
          img.setAttribute("src", res.url);
        });
        icon.appendChild(img);
        row.appendChild(icon);
      }
    });
    tableBody.appendChild(row);
  });
};

const syncTasks = async () => {
  tasksList = await getAllTasks();
  console.log(tasksList);
  const profs = await setIcon("uname");
  const tableBody = document.querySelector("#table-body");
  generateTableData(
    tableBody,
    ["title", "uname", "priority", "createdAt", "completed"],
    profs
  );
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

const setIcon = async (key) => {
  const profs = tasksList.reduce((map, cur) => {
    if (!map.has(cur[key])) {
      map.set(cur[key], fetch(`https://picsum.photos/64`));
    }
    return map;
  }, new Map());

  await Promise.all(profs.values());

  return profs;
};
