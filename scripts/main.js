document.getElementById("add-task").addEventListener("click", function() {
    const title = document.getElementById("task-title").value;
    const desc = document.getElementById("task-desc").value;

    if (title && desc) {
        const taskId = Date.now().toString();
        addTask(taskId, title, desc);

        document.getElementById("task-title").value = '';
        document.getElementById("task-desc").value = '';

        saveTasks(); 
    }
});

function addTask(id, title, desc) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.setAttribute("data-id", id);

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const taskTitle = document.createElement("div");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = title;

    const taskDesc = document.createElement("div");
    taskDesc.classList.add("task-desc");
    taskDesc.textContent = desc;

    taskContent.appendChild(taskTitle);
    taskContent.appendChild(taskDesc);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.classList.add("delete-task-button");

    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();
        console.log("Delete button clicked!"); 
        handleDelete(taskItem);
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);

    const container = document.querySelector(".tasks-list");
    container.insertBefore(taskItem, container.firstChild);

    taskItem.addEventListener("click", function() {
        console.log('Task clicked:', title);
        handleTaskClick(taskItem, title, desc);
    });

    checkNoTasksMessage();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach(taskItem => {
        const id = taskItem.getAttribute("data-id");
        const title = taskItem.querySelector(".task-title").textContent;
        const desc = taskItem.querySelector(".task-desc").textContent;
        tasks.push({ id, title, desc });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.reverse().forEach(task => {
            addTask(task.id, task.title, task.desc); 
        });
    }
}

function removeTaskFromStorage(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function checkNoTasksMessage() {
    const tasksList = document.querySelector(".tasks-list");
    const noTasksMessage = document.querySelector(".no-task-message");

    if (tasksList.children.length > 0) {
        noTasksMessage.style.display = "none";
    } else {
        noTasksMessage.style.display = "block";
    }
}

window.addEventListener("load", () => {
    loadTasks();
    checkNoTasksMessage();
});
