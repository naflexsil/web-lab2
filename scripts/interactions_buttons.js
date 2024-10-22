let lastActiveTask = null;

function handleTaskClick(taskItem, title, desc) {
    if (lastActiveTask && lastActiveTask !== taskItem) {
        toggleButtonContainer(lastActiveTask, false);
    }

    let buttonContainer = taskItem.querySelector('.task-buttons-container') || createButtonContainer(taskItem, title, desc);

    const isVisible = buttonContainer.style.display === 'flex';
    buttonContainer.style.display = isVisible ? 'none' : 'flex';
    taskItem.style.marginBottom = isVisible ? '10px' : '60px';

    lastActiveTask = isVisible ? null : taskItem;

    handleInteractions(taskItem, title, desc);
    addShareButtonHandler(taskItem, title, desc);
}

function toggleButtonContainer(taskItem, isVisible) {
    const buttonContainer = taskItem.querySelector('.task-buttons-container');
    if (buttonContainer) {
        buttonContainer.style.display = isVisible ? 'flex' : 'none';
        taskItem.style.marginBottom = isVisible ? '60px' : '10px';
    }
}

function createButtonContainer(taskItem, title, desc) {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('task-buttons-container');

    const buttonConfig = [
        { src: "../src/images/share.svg", alt: "Share" },
        { src: "../src/images/info.svg", alt: "Info", event: () => openInfoModal(title, desc) },
        { src: "../src/images/edit.svg", alt: "Edit" }
    ];

    buttonConfig.forEach(({ src, alt, event }) => {
        const button = document.createElement('img');
        button.src = src;
        button.alt = alt;
        button.classList.add('task-icon');
        if (event) button.addEventListener('click', event);
        buttonContainer.appendChild(button);
    });

    taskItem.appendChild(buttonContainer);
    return buttonContainer;
}

function openInfoModal(title, desc) {
    const infoModal = document.getElementById("info-modal");
    const infoTitle = document.getElementById("info-title");
    const infoDesc = document.getElementById("info-desc");

    infoTitle.value = title; 
    infoDesc.value = desc;   

    infoModal.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
    const closeInfoButton = document.getElementById("close-info");
    const infoModal = document.getElementById("info-modal");

    if (closeInfoButton) {
        closeInfoButton.addEventListener("click", () => {
            infoModal.style.display = "none"; 
        });
    }
});