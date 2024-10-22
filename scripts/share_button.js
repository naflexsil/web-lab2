function addShareButtonHandler(taskItem, title, desc) {
    const shareButton = taskItem.querySelector('.task-icon[alt="Share"]');

    console.log(taskItem);
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

    const copyIcon = modal.querySelector('img[title="Copy"]');

    copyIcon.removeEventListener('click', copyHandler); 
    copyIcon.addEventListener('click', copyHandler);

    function copyHandler() {
        copyToClipboard(title, desc).then(() => {
            alert("☆ текст скопирован ☆");
            modal.style.display = 'none'; 
        }).catch(err => {
            console.error('не удалось скопировать текст:', err);
        });
    }
}

function copyToClipboard(title, desc) {
    const textToCopy = `${title}\n${desc}`;
    return navigator.clipboard.writeText(textToCopy); 
}