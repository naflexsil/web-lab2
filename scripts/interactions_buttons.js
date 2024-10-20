let lastActiveTask = null;

function handleTaskClick(taskItem, title, desc) {
    if (lastActiveTask && lastActiveTask !== taskItem) {
        const lastButtonContainer = lastActiveTask.querySelector('.task-buttons-container');
        if (lastButtonContainer) {
            lastButtonContainer.style.display = 'none';
            lastActiveTask.style.marginBottom = '10px';  
        }
    }

    let buttonContainer = taskItem.querySelector('.task-buttons-container');

    if (!buttonContainer) {
        const shareButton = document.createElement('img');
        const infoButton = document.createElement('img');
        const editButton = document.createElement('img');
        buttonContainer = document.createElement('div');

        shareButton.src = "../src/images/share.svg";
        shareButton.alt = "Share";
        shareButton.classList.add('task-icon');
        
        infoButton.src = "../src/images/info.svg";
        infoButton.alt = "Info";
        infoButton.classList.add('task-icon');
        
        editButton.src = "../src/images/edit.svg";
        editButton.alt = "Edit";
        editButton.classList.add('task-icon');

        buttonContainer.classList.add('task-buttons-container');
        buttonContainer.appendChild(shareButton);
        buttonContainer.appendChild(infoButton);
        buttonContainer.appendChild(editButton);

        taskItem.appendChild(buttonContainer);
    }

    buttonContainer.style.display = buttonContainer.style.display === 'flex' ? 'none' : 'flex';

    if (buttonContainer.style.display === 'flex') {
        taskItem.style.marginBottom = '60px';  
    } else {
        taskItem.style.marginBottom = '10px';  
    }

    lastActiveTask = taskItem;

    handleInteractions(taskItem, title, desc);
}

document.addEventListener("DOMContentLoaded", function() {
    const allTaskItems = document.querySelectorAll('.task-item');

    allTaskItems.forEach(taskItem => {
        const buttonContainer = taskItem.querySelector('.task-buttons-container');
        if (buttonContainer) {
            buttonContainer.style.display = 'none'; 
        }
    });
});