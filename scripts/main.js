document.getElementById("add-task").addEventListener("click", function() {
    const title = document.getElementById("task-title").value;
    const desc = document.getElementById("task-desc").value;

    if (title && desc) {
        addTask(title, desc);
        
        // очищ. поля после добавл-я заметки
        document.getElementById("task-title").value = '';
        document.getElementById("task-desc").value = '';

        // сохран. заметки в localStorage
        saveTasks();
    }
});



let taskToDelete = null; 

function addTask(title, desc) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

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

    // контейнер для кнопок, к-ый сначала будет скрыт
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("task-buttons");
    buttonContainer.style.display = "none";  

    // share
    const shareButton = document.createElement("button");
    shareButton.classList.add("task-button");
    const shareIcon = document.createElement("img");
    shareIcon.src = "src/images/share.jpg";
    shareIcon.alt = "Share";
    shareButton.appendChild(shareIcon);

    // info
    const infoButton = document.createElement("button");
    infoButton.classList.add("task-button");
    infoButton.textContent = "i";

    // edit
    const editButton = document.createElement("button");
    editButton.classList.add("task-button");
    const editIcon = document.createElement("img");
    editIcon.src = "src/images/edit.jpg";
    editIcon.alt = "Edit";
    editButton.appendChild(editIcon);

    buttonContainer.appendChild(shareButton);
    buttonContainer.appendChild(infoButton);
    buttonContainer.appendChild(editButton);

    // delete
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task-button");
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", function() {
        taskToDelete = taskItem;  
        showModal();  
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(buttonContainer); 
    taskItem.appendChild(deleteButton);

    const container = document.querySelector(".tasks-list");
    container.appendChild(taskItem);

    checkNoTasksMessage();

    // показ кнопок при клике
    taskItem.addEventListener("click", function(event) {
        if (buttonContainer.style.display === "none") {
            buttonContainer.style.display = "flex";  
        } else {
            buttonContainer.style.display = "none";
        }
    });
}



function showModal() {
    document.getElementById("delete-modal").style.display = "flex";
}

function hideModal() {
    document.getElementById("delete-modal").style.display = "none";
}

document.getElementById("confirm-delete").addEventListener("click", function() {
    if (taskToDelete) {
        taskToDelete.remove();
        checkNoTasksMessage();
        saveTasks();
        taskToDelete = null;
    }
    hideModal();
});

document.getElementById("cancel-delete").addEventListener("click", function() {
    taskToDelete = null; 
    hideModal();
});

function checkNoTasksMessage() {
    const tasksList = document.querySelector(".tasks-list");
    const noTasksMessage = document.querySelector(".no-task-message");

    if (tasksList.children.length > 0) {
        noTasksMessage.style.display = "none";
    } else {
        noTasksMessage.style.display = "block";
    }
}

// сохран. заметки в localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach(taskItem => {
        const title = taskItem.querySelector(".task-title").textContent;
        const desc = taskItem.querySelector(".task-desc").textContent;
        tasks.push({ title, desc });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// загрузка заметок из localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => addTask(task.title, task.desc));
    }
}

loadTasks();
checkNoTasksMessage();