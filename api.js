const HOST_URI = "http://localhost:2022/tasks";

class APIConnecter {
  constructor(host, method) {
    this.host = host;
    this.method = method;
    switch (this.method) {
      case "GET":
        this.request = (url) =>
          fetch(`${this.host}/${url}`, {
            method: this.method,
          })
            .then((responce) => responce.json())
            .catch((e) => {
              console.error(e);
              return [];
            });
        break;
      case "POST":
        this.request = (url, body) =>
          fetch(`${this.host}/${url}`, {
            method: this.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
            .then((responce) => responce.json())
            .catch((e) => {
              console.error(e);
              return [];
            });
        break;
      case "PATCH":
        this.request = (url, body) =>
          fetch(`${this.host}/${url}`, {
            method: this.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
            .then((responce) => responce.json())
            .catch((e) => {
              console.error(e);
              return [];
            });
        break;
      case "DELETE":
        this.request = (url) =>
          fetch(`${this.host}/${url}`, {
            method: this.method,
          })
            .then((responce) => responce.json())
            .catch((e) => {
              console.error(e);
              return [];
            });
        break;
    }
  }
}

const createNewTask = (body) => {
  const api = new APIConnecter(HOST_URI, "POST");
  return api.request("", body);
};

const getAllTasks = async () => {
  const api = new APIConnecter(HOST_URI, "GET");
  const tasks = await api.request("");
  return tasks;
};
const getTaskById = async (id) => {
  const api = new APIConnecter(HOST_URI, "GET");
  const task = await api.request(`${id}`);
  console.log(task);
  return task;
};

const updateTask = (id, body) => {
  const api = new APIConnecter(HOST_URI, "PATCH");
  return api.request(`${id}`, body);
};

const removeTask = (id) => {
  const api = new APIConnecter(HOST_URI, "DELETE");
  return api.request(`${id}`);
};

const printConsole = (tasks) => {
  tasks.forEach((t) =>
    console.log(
      `uname: ${t.uname}\ntitle: ${t.title}\ncreatedAi: ${t.createdAt}`
    )
  );
};
