// 後で再代入するため、constからletに変更
let tasksList = [];

// 登録ボタンクリック時の動作
const onClickButton = () => {
  const tableBody = document.querySelector("#table-body");
  const name = document.querySelector("#name");
  const task = document.querySelector("#task");

  let tasks = {
    uname: name.value,
    title: task.value
  }

  // webAPIを利用してタスクをデータベースに登録
  createNewTask(tasks);

  // tasksListにタスクを追加
  tasksList.push({ uname: name.value, title: task.value });
  tasksList.forEach((todo, idx) =>
    console.log(`${idx}: ${todo.name}, ${todo.task}`)
  );

  // テーブルに新しいタスクを追加
  generateTableData(tableBody, ["uname", "title"]);
};

// 取得ボタンクリック時の動作
const onClickGetButton = async () => {
  const tableBody = document.querySelector("#table-body");

  // webAPIを利用してデータベース内のタスクを取得しtasksListの中身を入れ替える
  tasksList = await getAllTasks();

  // テーブルの更新
  generateAllTableData(tableBody, ["uname", "title"]);
};

// 登録ボタン押下時のテーブル更新
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

// 取得ボタン押下時のテーブル更新
const generateAllTableData = (tableBody, queryKeys) => {
  // テーブルボディを空にする
  tableBody.innerHTML = "";

  // webAPIで取得したtasksListの中身をすべてテーブルに追加
  tasksList.forEach((task) => {
    const row = document.createElement("tr");
    queryKeys.forEach((key) => {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(
        task[key]
      );
      cell.appendChild(cellText);
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
};
