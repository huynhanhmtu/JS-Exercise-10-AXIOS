export default class TaskService {
  getListTask() {
    return axios({
      url: "https://61ce2d727067f600179c5de7.mockapi.io/todolist",
      method: "GET"
    });
  }

  addTask(task) {
    return axios({
      url: "https://61ce2d727067f600179c5de7.mockapi.io/todolist",
      method: "POST",
      data: task,
    });
  }

  updateTask(task) {
    return axios({
      url: `https://61ce2d727067f600179c5de7.mockapi.io/todolist/${task.id}`,
      method: "PUT",
      data: task,
    });
  }

  getTaskById(id) {
    return axios({
      url: `https://61ce2d727067f600179c5de7.mockapi.io/todolist/${id}`,
      method: "GET"
    });
  }

  deleteTask(id) {
    return axios({
      url: `https://61ce2d727067f600179c5de7.mockapi.io/todolist/${id}`,
      method: "DELETE"
    });
  }
}