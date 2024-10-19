function handleDelete(taskItem) {
    const deleteButton = taskItem.querySelector('.delete-task-button');
    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();
        taskToDelete = taskItem;
        showDeleteModal();
        taskItem.classList.remove("active");
        taskItem.querySelector(".task-buttons").style.display = "none";
    });
}

function showDeleteModal() {
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
        const taskId = taskToDelete.getAttribute("data-id");
        taskToDelete.remove();
        removeTaskFromStorage(taskId);
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
