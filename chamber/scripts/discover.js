import { itemsOfInterest } from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
    processVisitorTimeline();
    renderGalleryCards(itemsOfInterest);
});

// 1. Storage Temporal Delta Logic Engine
function processVisitorTimeline() {
    const displayElement = document.getElementById("visitor-message");
    if (!displayElement) return;

    const currentTimestamp = Date.now();
    const lastVisitValue = localStorage.getItem("chamberLastVisitTimestamp");

    // Scenario A: Absolute First Init Configuration
    if (!lastVisitValue) {
        displayElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const structuralDeltaMS = currentTimestamp - parseInt(lastVisitValue, 10);
        
        // Convert milliseconds to a decimal number of days: ms / (ms * s * m * h)
        const totalCalculatedDays = structuralDeltaMS / (1000 * 60 * 60 * 24);

        // Scenario B: Visited within the same 24-hour cycle
        if (totalCalculatedDays < 1) {
            displayElement.textContent = "Back so soon! Awesome!";
        } else {
            // Scenario C: Pluralized Day Counter Configuration
            const roundedWholeDays = Math.floor(totalCalculatedDays);
            if (roundedWholeDays === 1) {
                displayElement.textContent = "You last visited 1 day ago.";
            } else {
                displayElement.textContent = `You last visited ${roundedWholeDays} days ago.`;
            }
        }
    }

    // Persist current state tracking parameters 
    localStorage.setItem("chamberLastVisitTimestamp", currentTimestamp.toString());
}

// 2. Element Structural Creation Loop
function renderGalleryCards(dataCollection) {
    const wrapper = document.getElementById("gallery-container");
    if (!wrapper) return;

    wrapper.innerHTML = "";

    dataCollection.forEach((item) => {
        const cardSection = document.createElement("section");
        cardSection.className = "discover-card";
        // Assigning explicit CSS grid area markers inline dynamically map elements safely
        cardSection.style.gridArea = item.id; 

        cardSection.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="Visual presentation showcasing ${item.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>📍 ${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more-btn">Learn More</button>
        `;
        wrapper.appendChild(cardSection);
    });
}