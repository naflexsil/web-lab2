let taskToDelete = null;
const modal = document.getElementById("delete-modal");

function handleDelete(taskItem) {
    taskToDelete = taskItem;
    showModal();
}

function showModal() {
    modal.style.display = "flex";
}

function hideModal() {
    modal.style.display = "none";
    taskToDelete = null;  
}

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        hideModal();
    }
});

document.getElementById("confirm-delete").addEventListener("click", function() {
    if (taskToDelete) {
        const taskId = taskToDelete.getAttribute("data-id");
        taskToDelete.remove();  
        removeTaskFromStorage(taskId);  
        checkNoTasksMessage();  
    }
    hideModal();
});

document.getElementById("cancel-delete").addEventListener("click", function() {
    hideModal();  
});