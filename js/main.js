import TaskService from "./TaskService.js";
const taskService = new TaskService();
import Task from "./Task.js";

const getEle = (id) => {
  return document.getElementById(id);
}

// Render
const renderHTML = task => {
  return `
    <li>
      <span>${task.textTask}</span>
      <div class="buttons">
        <button class="remove" onclick="deleteTask(${task.id})"><i class="fa fa-trash-alt"></i></button>
        <button class="complete" onclick="changeStatus(${task.id})">
          <i class="far fa-check-circle"></i>
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
    </li>
    `;
};

const renderTaskList = () => {
  taskService.getListTask()
    .then(result => {
      let innerTodo = "", innerCompleted = "";
      result.data.forEach(task => {
        "todo" === task.status ? (innerTodo += renderHTML(task), getEle("todo").innerHTML = innerTodo) : (innerCompleted += renderHTML(task), getEle("completed").innerHTML = innerCompleted);
      });
    })
    .catch(error => {
      alert(error);
    });
};
renderTaskList();

// Add task
getEle("addItem").onclick = () => {
  const newTask = getEle("newTask").value;
  if (newTask !== "") {
    const task = new Task("", newTask, "todo");
    taskService.addTask(task)
      .then(() => {
        alert("Add success!");
        renderTaskList();
        getEle("newTask").value = "";
      })
      .catch((error) => {
        alert(error);
      });
  } else alert("Enter content before adding");
};

// Delete task
const deleteTask = id => {
  if (confirm("Delete task?")) {
    taskService.deleteTask(id)
      .then(() => {
        alert("Delete success!");
        renderTaskList();
      })
      .catch((error) => {
        alert(error);
      });
  };
};
window.deleteTask = deleteTask;

//Change status
const changeStatus = (id) => {
  if (confirm("Change status?")) {
    taskService.getTaskById(id)
      .then((result) => {
        return result.data.status = "todo" === result.data.status ? "completed" : "todo", taskService.updateTask(result.data);
      })
      .then(() => {
        alert("Change status success!");
        renderTaskList();
      });
  };
};
window.changeStatus = changeStatus;