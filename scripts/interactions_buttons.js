function handleInteractions(taskItem, title, desc) {
    const shareButton = taskItem.querySelector(".share-task-button");
    const editButton = taskItem.querySelector(".edit-task-button");

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

    const saveEditButton = document.getElementById('save-edit');
    saveEditButton.addEventListener('click', function() {
        const newTitle = document.getElementById('edit-title').value;
        const newDesc = document.getElementById('edit-desc').value;
        onSave(newTitle, newDesc);
        modal.style.display = 'none';
    });

    document.getElementById('cancel-edit').addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

function showShareModal(title, desc) {
    const modal = document.getElementById('share-modal');
    modal.style.display = 'flex';

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    modal.querySelector('.copy-button').addEventListener('click', function() {
        copyToClipboard(title, desc);
        modal.style.display = 'none';
    });
}

function copyToClipboard(title, desc) {
    const textToCopy = `${title}\n${desc}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("☆ текст скопирован ☆");
    }).catch(err => {
        console.error('не удалось скопировать текст:', err);
    });
}
