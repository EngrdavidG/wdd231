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
    const videoURL = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE"; 
    ["video-link", "video-link-portal", "video-link-toolkit"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.href = videoURL;
    });
});