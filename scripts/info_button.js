document.addEventListener("DOMContentLoaded", () => {
    const infoModal = document.getElementById("info-modal"); 
    const closeInfoButton = document.getElementById("close-info");

    const openModal = () => {
        if (infoModal) {
            infoModal.style.display = "flex"; 
        } else {
            console.error("Модальное окно не найдено.");
        }
    };

    const closeModal = () => {
        if (infoModal) {
            infoModal.style.display = "none"; 
        }
    };

    document.body.addEventListener("click", event => {
        if (event.target.classList.contains('info-button')) {
            openModal();
        }
    });

    if (closeInfoButton) {
        closeInfoButton.addEventListener("click", closeModal);
    } else {
        console.error("Кнопка закрытия не найдена.");
    }

    window.addEventListener("click", event => {
        if (event.target === infoModal) {
            closeModal();
        }
    });
});