let taskToDelete = null;

function handleDelete(taskItem) {
    taskToDelete = taskItem;
    showDeleteModal();
}

function showDeleteModal() {
    console.log("Opening modal..."); 
    const modal = document.getElementById("delete-modal");
    modal.style.display = "flex"; 

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideModal();
        }
    });
}

function hideModal() {
    const modal = document.getElementById("delete-modal");
    modal.style.display = "none";
}


document.getElementById("confirm-delete").addEventListener("click", function() {
    if (taskToDelete) {
        const taskId = taskToDelete.getAttribute("data-id");
        taskToDelete.remove();  
        removeTaskFromStorage(taskId);  
        checkNoTasksMessage();  
        taskToDelete = null; 
    }
    hideModal();  
});

document.getElementById("cancel-delete").addEventListener("click", function() {
    taskToDelete = null;  
    hideModal();  
});
