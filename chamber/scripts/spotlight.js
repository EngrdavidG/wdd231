// Async Member Spotlight Processor
// Added relative dot-slash to explicitly anchor to the Live Server root folder path
const membersSource = './data/members.json'; 

async function loadSpotlights() {
    try {
        const response = await fetch(membersSource);
        
        // Detailed path-checking validation fallback
        if (!response.ok) {
            throw new Error(`HTTP network error! Status: ${response.status} - File not found at "${membersSource}".`);
        }
        
        const data = await response.json();
        
        // Double-check that data.members exists and is an array before processing
        if (!data || !Array.isArray(data.members)) {
            throw new Error("Invalid JSON structure: Top-level wrapper must contain a 'members' array.");
        }
        
        /* FILTER CRITERIA (Bulletproofed): 
           Checks if member.membershipLevel exists *first* to prevent 'toLowerCase of undefined' crashes.
        */
        const qualifiedMembers = data.members.filter(member => 
            member.membershipLevel && 
            (member.membershipLevel.toLowerCase() === 'gold' || 
             member.membershipLevel.toLowerCase() === 'silver')
        );

        // Fail-safe notice if no members match the filter criteria
        if (qualifiedMembers.length === 0) {
            throw new Error("No members with a matching 'Gold' or 'Silver' membershipLevel were found in your JSON file.");
        }

        // Mix array ordering randomly using standard Fisher-Yates shuffle logic
        const shuffled = [...qualifiedMembers].sort(() => 0.5 - Math.random());
        
        // Take up to three distinct records from the top of our shuffled array selection
        const spotlightSelection = shuffled.slice(0, 3);
        
        renderSpotlightCards(spotlightSelection);
    } catch (error) {
        console.error("Spotlight engine execution failure:", error);
        
        // Prints the precise system reason for the error cleanly on screen for diagnostics
        document.getElementById('spotlights').innerHTML = `
            <div style="grid-column: 1 / -1; background: #fff5f5; color: #cc0000; border: 1px dashed #cc0000; padding: 1rem; border-radius: 6px; font-family: monospace;">
                <p><strong>⚠️ Spotlight Render Error:</strong></p>
                <p>${error.message}</p>
                <p style="font-size: 0.85rem; margin-top: 0.5rem; color: #555;">Check your browser's inspect tool console (F12) for detailed trace logs.</p>
            </div>`;
    }
}

function renderSpotlightCards(selectedMembers) {
    const container = document.getElementById('spotlights');
    container.innerHTML = ""; // Wipe placeholder components cleanly

    selectedMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';

        // Graceful fallbacks provided for empty keys or broken image resource links
        card.innerHTML = `
            <img src="${member.imagePath || 'images/placeholder-logo.svg'}" alt="${member.name || 'Chamber Member'} Corporate Logo" class="spotlight-logo">
            <h3>${member.name || 'Anonymous Business'}</h3>
            <p><strong>Phone:</strong> ${member.phone || 'N/A'}</p>
            <p><strong>Address:</strong> ${member.address || 'N/A'}</p>
            <p class="membership-tag">🎖️ ${member.membershipLevel || 'General'} Member</p>
            <a href="${member.website || '#'}" target="_blank" rel="noopener noreferrer">Visit Corporate Site</a>
        `;
        
        container.appendChild(card);
    });
}

loadSpotlights();