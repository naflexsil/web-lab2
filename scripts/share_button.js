function handleInteractions(taskItem, title, desc) {
    const shareButton = taskItem.querySelector(".share-task-button");

    shareButton.addEventListener('click', function(event) {
        event.stopPropagation();  
        showShareModal(title, desc);  
    });
}

function showShareModal(title, desc) {
    const modal = document.getElementById('share-modal');
    modal.setAttribute('data-title', title);
    modal.setAttribute('data-desc', desc);
    modal.style.display = 'flex';

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function copyToClipboard(title, desc) {
    const textToCopy = `${title}\n${desc}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("☆ Текст скопирован ☆");
    }).catch(err => {
        console.error('Не удалось скопировать текст:', err);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const copyIcon = document.querySelector('img[title="Copy"]');
    
    copyIcon.addEventListener('click', function() {
        const modal = document.getElementById('share-modal');
        const taskTitle = modal.getAttribute('data-title');
        const taskDesc = modal.getAttribute('data-desc');
        
        copyToClipboard(taskTitle, taskDesc);
        modal.style.display = 'none'; 
    });
});
