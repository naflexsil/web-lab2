document.getElementById("add-task").addEventListener("click", () => {
    const titleElement = document.getElementById("task-title");
    const descElement = document.getElementById("task-desc");
    const title = titleElement.value.trim();
    const desc = descElement.value.trim();

    if (title && desc) {
        const taskId = Date.now().toString();
        addTask(taskId, title, desc);

        titleElement.value = '';
        descElement.value = '';

        saveTasks();
    }
});

function createElementWithClass(tag, className, textContent = '') {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = textContent;
    return element;
}

function addTask(id, title, desc) {
    const taskItem = createElementWithClass('div', 'task-item');
    taskItem.setAttribute('data-id', id);

    const taskContent = createElementWithClass('div', 'task-content');
    const taskTitle = createElementWithClass('div', 'task-title', title);
    const taskDesc = createElementWithClass('div', 'task-desc', desc);

    taskContent.append(taskTitle, taskDesc);

    const deleteButton = createElementWithClass('button', 'delete-task-button', '×');
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        handleDelete(taskItem);
    });

    taskItem.append(taskContent, deleteButton);

    const container = document.querySelector('.tasks-list');
    container.insertBefore(taskItem, container.firstChild);

    taskItem.addEventListener('click', () => {
        console.log('Task clicked:', title);
        handleTaskClick(taskItem, title, desc);
    });

    checkNoTasksMessage();
}

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('.task-item')).map(taskItem => ({
        id: taskItem.getAttribute('data-id'),
        title: taskItem.querySelector('.task-title').textContent,
        desc: taskItem.querySelector('.task-desc').textContent
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.reverse().forEach(task => addTask(task.id, task.title, task.desc));
}

function removeTaskFromStorage(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function checkNoTasksMessage() {
    const tasksList = document.querySelector('.tasks-list');
    const noTasksMessage = document.querySelector('.no-task-message');
    noTasksMessage.style.display = tasksList.children.length > 0 ? 'none' : 'block';
}

window.addEventListener('load', () => {
    loadTasks();
    checkNoTasksMessage();
});
