const createTask = () => {
    const userName = "サンプルユーザー";
    const newTitle = "新しいタスク";
    const task = {
        uname: userName,
        title: newTitle
    }
    createNewTask(task);
}

const getTask = async () => {
    const taskList = await getAllTasks();
    console.log(taskList)
    console.log(`リストに${taskList.length}個タスクがあります。`);
    taskList.forEach((task, idx) => {
        console.log(`${idx}: uname: ${task.uname}, title: ${task.title}`)
    });
}