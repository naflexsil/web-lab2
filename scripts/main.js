document.getElementById("add-task").addEventListener("click", function() {
    const title = document.getElementById("task-title").value;
    const desc = document.getElementById("task-desc").value;

    if (title && desc) {
        const taskId = Date.now().toString();   // генер. уник. id на основе времени
        addTask(taskId, title, desc);

        document.getElementById("task-title").value = '';
        document.getElementById("task-desc").value = '';

        saveTasks();
    }
});

let taskToDelete = null; 

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

    const shareButton = document.createElement("button");
    shareButton.classList.add("task-button");
    const shareIcon = document.createElement("img");
    shareIcon.src = "../src/images/share.svg";
    shareIcon.alt = "Share";
    shareButton.appendChild(shareIcon);

    const infoButton = document.createElement("button");
    infoButton.classList.add("task-button");
    infoButton.textContent = "i";

    const editButton = document.createElement("button");
    editButton.classList.add("task-button");
    const editIcon = document.createElement("img");
    editIcon.src = "../src/images/edit.svg";
    editIcon.alt = "Edit";
    editButton.appendChild(editIcon);

    buttonContainer.appendChild(shareButton);
    buttonContainer.appendChild(infoButton);
    buttonContainer.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task-button");
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", function() {
        taskToDelete = taskItem;  
        showModal();  // Показываем модальное окно подтверждения удаления
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(buttonContainer); 
    taskItem.appendChild(deleteButton);

    const container = document.querySelector(".tasks-list");
    container.insertBefore(taskItem, container.firstChild); 

    checkNoTasksMessage();

    taskItem.addEventListener("click", function(event) {
        // не было клика => скрываем
        if (!event.target.closest('.task-button')) {
            const isActive = taskItem.classList.contains("active");

            // убир. активность со всех заметок
            document.querySelectorAll(".task-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".task-buttons").style.display = "none";
                adjustTaskMargins(item, 0);     // сброс отступов
            });

            // заметка не активна => активируем
            if (!isActive) {
                taskItem.classList.add("active");
                buttonContainer.style.display = "flex"; 
                
                const buttonHeight = buttonContainer.offsetHeight;       // увелич. отступ у следующ. заметки
                adjustTaskMargins(taskItem, buttonHeight);
            }
        }
    });

    // привязка событий для share и edit
    shareButton.addEventListener('click', function(event) {
        event.stopPropagation();  
        showShareModal(title, desc);
    });

    editButton.addEventListener('click', function(event) {
        event.stopPropagation();   
        showEditModal(title, desc, (newTitle, newDesc) => {
            taskItem.querySelector('.task-title').textContent = newTitle;
            taskItem.querySelector('.task-desc').textContent = newDesc;
            saveTasks(); 
        });
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideModal(); 
    }
});

function showModal() {
    const modal = document.getElementById("delete-modal");
    modal.style.display = "flex";

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideModal();
        }
    });
}
function hideModal() {
    document.getElementById("delete-modal").style.display = "none";
}

document.getElementById("confirm-delete").addEventListener("click", function() {
    if (taskToDelete) {
        const taskId = taskToDelete.getAttribute("data-id");    // получ. id удаляемой заметки
        taskToDelete.remove();      // удал. заметку из DOM
        removeTaskFromStorage(taskId);      // удал. заметку из localStorage по id
        checkNoTasksMessage();

        const remainingTasks = document.querySelectorAll(".task-item");
        remainingTasks.forEach(task => {
            adjustTaskMargins(task, 0); 
        });

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

function removeTaskFromStorage(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.filter(task => task.id !== id);      // убир. заметку с соответствующим id
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));    // сохран. обновл. список
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            if (task.title && task.desc) {
                addTask(task.id, task.title, task.desc);    // проверка на пустые знач.
            } else {
                console.error("ошибка: некорректные данные заметки", task);
            }
        });
    } else {
        console.warn("нет заметки для загрузки");
    }
}

// отступы
function adjustTaskMargins(currentTask, additionalMargin) {
    const tasks = document.querySelectorAll(".task-item");
    let currentTaskFound = false;

    tasks.forEach(task => {
        if (currentTaskFound) {
            task.style.marginTop = `${additionalMargin}px`;     // устанавл. отступ только для следующ. заметки
            currentTaskFound = false;   // прекращ. поиск после первой найден. заметки
        } else {
            task.style.marginTop = '2px';   // возвращ. стандартный отступ для всех остальных
        }

        if (task === currentTask) {
            currentTaskFound = true;    // найдена актив. заметка
        }
    });
}

// modal edit
function showEditModal(title, desc, onSave) {
    const modal = document.getElementById('edit-modal');
    document.getElementById('edit-title').value = title;
    document.getElementById('edit-desc').value = desc;

    modal.style.display = 'flex';

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Удаляем предыдущие обработчики события перед добавлением нового
    const saveEditButton = document.getElementById('save-edit');
    const saveButtonClone = saveEditButton.cloneNode(true); 
    saveEditButton.parentNode.replaceChild(saveButtonClone, saveEditButton);

    saveButtonClone.addEventListener('click', () => {
        const newTitle = document.getElementById('edit-title').value;
        const newDesc = document.getElementById('edit-desc').value;
        onSave(newTitle, newDesc); // вызываем обновление заметки
        saveTasks(); // сохраняем изменения
        modal.style.display = 'none';
    });

    document.getElementById('cancel-edit').addEventListener('click', () => {
        modal.style.display = 'none'; 
    });
}

// modal share
function showShareModal(title, desc) {
    const modal = document.getElementById('share-modal');
    modal.style.display = 'flex';

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none'; 
        }
    });

    modal.querySelector('img[alt="Copy"]').addEventListener('click', () => {
        copyToClipboard(title, desc);
        modal.style.display = 'none';
    });
}

// copy
function copyToClipboard(title, desc) {
    const textToCopy = `${title}\n${desc}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("☆ текст скопирован ☆");
    }).catch(err => {
        console.error('could not copy text: ', err);
    });
}


loadTasks();
checkNoTasksMessage();