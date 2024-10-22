const editModal = document.getElementById("edit-modal");
const editTitleInput = document.getElementById("edit-title");
const editDescInput = document.getElementById("edit-desc");
const saveEditButton = document.getElementById("save-edit");
const cancelEditButton = document.getElementById("cancel-edit");

let currentTaskItem = null;

function openEditModal(taskItem) {
    currentTaskItem = taskItem; 

    const taskTitle = taskItem.querySelector(".task-title");
    const taskDesc = taskItem.querySelector(".task-desc");

    editTitleInput.value = taskTitle.textContent;
    editDescInput.value = taskDesc.textContent;

    editModal.style.display = "flex";
}

function closeEditModal() {
    editModal.style.display = "none";
}

saveEditButton.addEventListener("click", function () {
    if (currentTaskItem) {
        const newTitle = editTitleInput.value;
        const newDesc = editDescInput.value;

        const taskTitle = currentTaskItem.querySelector(".task-title");
        const taskDesc = currentTaskItem.querySelector(".task-desc");
        taskTitle.textContent = newTitle;
        taskDesc.textContent = newDesc;

        closeEditModal();
        saveTasks(); 
    }
});

cancelEditButton.addEventListener("click", closeEditModal);

function handleInteractions(taskItem) {
    const editButton = taskItem.querySelector('.task-icon[alt="Edit"]');

    if (!editButton.dataset.bound) {
        editButton.addEventListener('click', function (event) {
            event.stopPropagation();
            openEditModal(taskItem);
        });
        editButton.dataset.bound = true;  
    }
}