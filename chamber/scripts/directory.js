const jsonURL = "data/members.json";
const displayContainer = document.querySelector("#directory-container");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

// 1. Fetch JSON asynchronously
async function fetchMembers() {
    try {
        const response = await fetch(jsonURL);
        if (!response.ok) {
            throw new Error("Failed to load member profile database");
        }
        const data = await response.json();
        renderDirectory(data);
    } catch (error) {
        console.error("Error operationalizing resource load:", error);
        displayContainer.innerHTML = `<p class="error">Unable to display database data at this time.</p>`;
    }
}

// 2. Loop and generate markup cards
function renderDirectory(members) {
    displayContainer.innerHTML = ""; // Empty baseline placeholder
    
    members.forEach(member => {
        const card = document.createElement("section");
        card.className = "member-item";
        
        // Define human-readable membership tiers
        const tiers = { 1: "Member", 2: "Silver Partner", 3: "Gold Premium" };
        
        card.innerHTML = `
            <img src="images/companies/${member.image}" alt="${member.name} branding logo" loading="lazy">
            <h3>${member.name}</h3>
            <p class="tagline"><em>"${member.tagline}"</em></p>
            <p class="address">📍 ${member.address}</p>
            <p class="phone">📞 ${member.phone}</p>
            <p class="url"><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
            <span class="membership-badge tier-${member.membershipLevel}">${tiers[member.membershipLevel]}</span>
        `;
        displayContainer.appendChild(card);
    });
}

// 3. Toggle view layout mechanisms 
gridBtn.addEventListener("click", () => {
    displayContainer.classList.add("grid-layout");
    displayContainer.classList.remove("list-layout");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    displayContainer.classList.add("list-layout");
    displayContainer.classList.remove("grid-layout");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

// Run routine on load
fetchMembers();