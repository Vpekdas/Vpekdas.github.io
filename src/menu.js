function clearLocalStorage(storageModalOverlay) {
    localStorage.clear();
    storageModalOverlay.style.display = "none";
    location.reload();
}

function closePopup(storageModalOverlay) {
    storageModalOverlay.style.display = "none";
}

function openPopup() {
    const storageModalOverlay = document.querySelector(".storage-modal-overlay");
    const confirmButton = document.getElementById("confirm-button");
    const cancelButton = document.getElementById("cancel-button");

    storageModalOverlay.style.display = "flex";
    confirmButton.addEventListener("click", () => clearLocalStorage(storageModalOverlay));
    cancelButton.addEventListener("click", () => closePopup(storageModalOverlay));
}

export function clearPopup() {
    const clearButton = document.querySelector(".clear-storage-button");

    clearButton.addEventListener("click", () => openPopup());
}
