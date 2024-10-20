const editModal = document.getElementById("edit-modal");
const editTitleInput = document.getElementById("edit-title");
const editDescInput = document.getElementById("edit-desc");
const saveEditButton = document.getElementById("save-edit");
const cancelEditButton = document.getElementById("cancel-edit");

let currentTaskItem = null;

function openEditModal(taskItem, title, desc) {
    currentTaskItem = taskItem; 
    editTitleInput.value = title; 
    editDescInput.value = desc;
    editModal.style.display = "flex";
}

function closeEditModal() {
    editModal.style.display = "none";
}

saveEditButton.addEventListener("click", function () {
    if (currentTaskItem) {
        const newTitle = editTitleInput.value;
        const newDesc = editDescInput.value;

        currentTaskItem.querySelector(".task-title").textContent = newTitle;
        currentTaskItem.querySelector(".task-desc").textContent = newDesc;

        closeEditModal();

        saveTasks();
    }
});

cancelEditButton.addEventListener("click", function () {
    closeEditModal();
});

function handleInteractions(taskItem, title, desc) {
    const editButton = taskItem.querySelector('.task-icon[alt="Изменить"]');
    
    editButton.addEventListener('click', function (event) {
        event.stopPropagation(); 
        openEditModal(taskItem, title, desc); 
    });
}
