// 後で再代入するため、constからletに変更
let tasksList = [];

// 登録ボタンクリック時の動作
const onClickButton = () => {
  const uname = document.querySelector("#name");
  const title = document.querySelector("#task");

  const task = {
    uname: uname.value,
    title: title.value,
  };

  // webAPIを利用してタスクをデータベースに登録
  // タスク登録後データベースと同期してテーブルを更新
  createNewTask(task).then(() => syncTaskDatabase());
};

// 変更ボタンクリック時の動作
const onClickChangeButton = () => {
  const uname = document.querySelector("#name");
  const title = document.querySelector("#task");
  const taskId = document.querySelector("#task_id");

  const task = {};
  // 入力されている情報のみtasksに格納
  if (uname.value != "") task.uname = uname.value;
  if (title.value != "") task.title = title.value;

  // webAPIを利用してデータベースのタスクを更新
  // データベース更新後、データベースと同期してテーブルを更新
  updateTask(taskId.value, task).then(() => syncTaskDatabase());
};

// 削除ボタンクリック時の動作
const onClickDeleteButton = () => {
  const taskId = document.querySelector("#delete_task_id");

  // 入力されたタスクIDを指定してwebAPIでデータベースからタスクを削除
  // タスク削除後、データベースと同期してテーブルを更新
  removeTask(taskId.value).then(() => syncTaskDatabase());
};

// 取得ボタンクリック時の動作
const syncTaskDatabase = async () => {
  const tableBody = document.querySelector("#table-body");

  // webAPIを利用してデータベース内のタスクを取得しtasksListの中身を入れ替える
  tasksList = await getAllTasks();

  // テーブルの更新
  generateAllTableData(tableBody, ["uname", "title"]);
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
      const cellText = document.createTextNode(task[key]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
};

// tasksListをsessionStorageへ書き込みページ遷移
const transitioningPages = () => {
  // ObjectをKey-Valueで読み書きするためにJSON文字列へ変換して書き込む
  sessionStorage.setItem("tasks", JSON.stringify(tasksList));

  // another.htmlへ遷移
  window.location.href = "another.html";
};

// sessionStorageから値を読み込みコンソールに出力
const loadFromStorage = () => {
  // JSON文字列として記録されているので、読み込んでからObjectに変換
  const tasks = JSON.parse(sessionStorage.getItem("tasks"));

  // consoleに出力
  tasks.forEach((task) => {
    console.log(task);
  });
};
