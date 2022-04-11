// 後で再代入するため、constからletに変更
let tasksList = [];

// 登録ボタンクリック時の動作
const onClickButton = () => {
  const uname = document.querySelector("#name");
  const title = document.querySelector("#task");

  const task = {
    uname: uname.value,
    title: title.value
  }

  // webAPIを利用してタスクをデータベースに登録
  // タスク登録後データベースと同期してテーブルを更新
  createNewTask(task).then(() => syncTaskDatabase());
};

// データベースと同期してテーブルを更新
const syncTaskDatabase = async () => {
  const tableBody = document.querySelector("#table-body");

  // webAPIを利用してデータベース内のタスクを取得しtasksListの中身を入れ替える
  tasksList = await getAllTasks();

  // テーブルの更新
  generateAllTableData(tableBody, ["uname", "title"]);
};

// ボタンの作成
const createButtonCell = (taskId, buttonText, func) => {
  const buttonCell = document.createElement("td");
  const button = document.createElement("button");
  const buttonTextNode = document.createTextNode(buttonText)
  button.appendChild(buttonTextNode);
  // ボタンにイベントリスナーを追加
  button.addEventListener("click", () => {
    func(taskId);
  });
  buttonCell.appendChild(button);
  return buttonCell
}

// タスクの編集
const changeTask = (taskId) => {
  const uname = document.querySelector("#name");
  const title = document.querySelector("#task")
  // const taskId = row.getAttribute("id");

  const task = {}
  // 入力されている情報のみtasksに格納
  if (uname.value != "") task.uname = uname.value;
  if (title.value != "") task.title = title.value;

  // webAPIを利用してデータベースのタスクを更新
  // データベース更新後、データベースと同期してテーブルを更新
  updateTask(taskId, task).then(() => syncTaskDatabase());
}

// タスクの削除
const deleteTask = (taskId) => {
  // const taskId = row.getAttribute("id");
  removeTask(taskId).then(() => syncTaskDatabase());
}

// 取得ボタン押下時のテーブル更新
// tableBody: 行を追加したい<tbody>
// queryKeys: タスクの中身でテーブルに表示したいもののkey(ex: ["uname", "title"])
const generateAllTableData = (tableBody, queryKeys) => {
  // テーブルボディを空にする
  tableBody.textContent = "";

  // webAPIで取得したtasksListの中身をすべてテーブルに追加
  tasksList.forEach((task) => {
    // 新しく行の要素を追加
    const row = document.createElement("tr");
    queryKeys.forEach((key) => {
      // 新しくセルの要素を追加
      const cell = document.createElement("td");
      // セルの中身のテキストノードを作成
      const cellText = document.createTextNode(
        // データベースから取得したタスクの中の要素をテキストとして使用
        task[key]
      );
      // セルに作成したテキストノードを追加
      cell.appendChild(cellText);
      // 行に作成したセルを追加
      row.appendChild(cell);
    });
    
    // ここからquerykeyにないものを行に追加
    // 削除ボタンを行に追加
    row.appendChild(createButtonCell(task["_id"], "削除", deleteTask))

    // 編集ボタンを行に追加
    row.appendChild(createButtonCell(task["_id"], "編集", changeTask))
    
    // 引数として与えられたtbodyの中に作成した行を追加する
    tableBody.appendChild(row);
  });
};
