import TaskService from "./TaskService.js";
const taskService = new TaskService();

import Task from "./Task.js";

const getEle = (id) => {
  return document.getElementById(id);
}

const loading = () => {
  getEle("loader").style.display = "block";
}
const unloading = () => {
  getEle("loader").style.display = "none";
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
  loading();
  taskService.getListTask()
    .then(result => {
      getEle("todo").innerHTML = "";
      getEle("completed").innerHTML = "";
      if (result.data.length > 0) {
        let innerTodo = "", innerCompleted = "";
        result.data.forEach(task => {
          "todo" === task.status ? (innerTodo += renderHTML(task), getEle("todo").innerHTML = innerTodo) : (innerCompleted += renderHTML(task), getEle("completed").innerHTML = innerCompleted);
        });
      };
      unloading();
    })
    .catch(error => {
      alert(error);
      unloading();
    });
};
renderTaskList();

// Add task
getEle("addItem").onclick = () => {
  const newTask = getEle("newTask").value;
  if (newTask !== "") {
    loading();
    const task = new Task("", newTask, "todo");
    taskService.addTask(task)
      .then(() => {
        alert("Add success!");
        renderTaskList();
        getEle("newTask").value = "";
      })
      .catch((error) => {
        alert(error);
        unloading();
      });
  } else alert("Enter content before adding");
};

// Delete task
const deleteTask = id => {
  if (confirm("Delete task?")) {
    loading();
    taskService.deleteTask(id)
      .then(() => {
        alert("Delete success!");
        renderTaskList();
      })
      .catch((error) => {
        alert(error);
        unloading();
      });
  };
};
window.deleteTask = deleteTask;

//Change status
const changeStatus = (id) => {
  if (confirm("Change status?")) {
    loading();
    taskService.getTaskById(id)
      // .catch() của hàm này đặt ở đâu?
      .then((result) => {
        return result.data.status = "todo" === result.data.status ? "completed" : "todo", taskService.updateTask(result.data);
      })
      .then(() => {
        alert("Change status success!");
        renderTaskList();
      })
      .catch(error => {
        alert(error);
        unloading();
      });
  };
};
window.changeStatus = changeStatus;