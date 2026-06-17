document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("incident-form");
    const logBox = document.getElementById("behavior-log");
    const signatureInput = document.getElementById("teacher-name");
    const feedback = document.getElementById("storage-feedback");

    // Retrieve and restore cached data on page reload
    if (localStorage.getItem("cachedLog")) {
        logBox.value = localStorage.getItem("cachedLog");
        feedback.textContent = "Restored un-saved draft note from localized storage backup.";
    }
    if (localStorage.getItem("cachedSignature")) {
        signatureInput.value = localStorage.getItem("cachedSignature");
    }

    // Continuous auto-save functionality
    [logBox, signatureInput].forEach(field => {
        field.addEventListener("input", () => {
            localStorage.setItem("cachedLog", logBox.value);
            localStorage.setItem("cachedSignature", signatureInput.value);
            feedback.textContent = "Session state cached securely...";
        });
    });

    // Clear saved states when the form is successfully submitted
    if (form) {
        form.addEventListener("submit", () => {
            localStorage.removeItem("cachedLog");
            localStorage.removeItem("cachedSignature");
            // Signature is retained to make logging multiple alerts easier
        });
    }
});