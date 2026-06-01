// Join Page Behavioral Controller Engine
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Capture and inject the active load timestamp window
    const timestampField = document.getElementById("form-timestamp");
    if (timestampField) {
        const now = new Date();
        // Standardizes string presentation readable for summary parsers
        timestampField.value = now.toISOString();
    }

    // 2. Structural Modal Trigger Management Engine
    const openButtons = document.querySelectorAll(".modal-open-btn");
    const closeButtons = document.querySelectorAll(".modal-close-btn");

    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const idTarget = button.getAttribute("data-target");
            const modal = document.getElementById(idTarget);
            if (modal) {
                modal.showModal(); // Opens native HTML dialog overlay natively
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close(); // Closes dialog cleanly
            }
        });
    });

    // Close modal gracefully if user clicks background overlay area instead of close panel node
    const modals = document.querySelectorAll(".benefit-modal");
    modals.forEach(modal => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    });
});