document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Hamburger Layout Controller
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            menuToggle.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
        });
    }

    // 2. Automated Copyright Date Tracker
    const yearSlot = document.getElementById("current-year");
    if (yearSlot) {
        yearSlot.textContent = new Date().getFullYear();
    }

    // 3. Global Video Anchor Router
    const videoURL = "https://www.loom.com/share/e31b608ee5dd4329a4da0c84bb0d7c71"; 
    ["video-link", "video-link-portal", "video-link-toolkit"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.href = videoURL;
    });
});