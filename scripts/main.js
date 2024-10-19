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

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("task-buttons");
    buttonContainer.style.display = "none";

    taskItem.appendChild(taskContent);
    taskItem.appendChild(buttonContainer);

    const container = document.querySelector(".tasks-list");
    container.insertBefore(taskItem, container.firstChild);

    checkNoTasksMessage();

    taskItem.addEventListener("click", function(event) {
        if (!event.target.closest('.task-button')) {
            const isActive = taskItem.classList.contains("active");
            document.querySelectorAll(".task-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".task-buttons").style.display = "none";
                adjustTaskMargins(item, 0);
            });

            if (!isActive) {
                taskItem.classList.add("active");
                buttonContainer.style.display = "flex";
                const buttonHeight = buttonContainer.offsetHeight;
                adjustTaskMargins(taskItem, buttonHeight);
            }
        }
    });
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
        tasks.forEach(task => {
            addTask(task.id, task.title, task.desc);
        });
    }
}

function adjustTaskMargins(currentTask, additionalMargin) {
    const tasks = document.querySelectorAll(".task-item");
    let currentTaskFound = false;

    tasks.forEach(task => {
        if (currentTaskFound) {
            task.style.marginTop = `${additionalMargin}px`;
            currentTaskFound = false;
        } else {
            task.style.marginTop = '2px';
        }

        if (task === currentTask) {
            currentTaskFound = true;
        }
    });
}

loadTasks();
checkNoTasksMessage();