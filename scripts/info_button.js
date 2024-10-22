document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM полностью загружен");

  const infoModal = document.getElementById("info-modal");
  const closeInfoButton = document.getElementById("close-info");

  const openModal = () => {
    infoModal.style.display = "flex";
  };

  const closeModal = () => {
    infoModal.style.display = "none";
  };

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("info-button")) {
      openModal();
    }
  });

  closeInfoButton.addEventListener("click", closeModal);
});
