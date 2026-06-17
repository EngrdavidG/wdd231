let studentsData = [];

document.addEventListener("DOMContentLoaded", () => {
    loadPortalRecords("data/students.json");
    setupFilterEvents();
    setupModalEvents();
});

// Asynchronous Fetch with robust error handling
async function loadPortalRecords(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Network returned bad state: ${response.status}`);
        
        studentsData = await response.json();
        renderGridCards(studentsData);
    } catch (err) {
        console.error("Data tracking failure alert:", err);
        const container = document.getElementById("student-grid");
        if (container) {
            container.innerHTML = `<p style="color:red; font-weight:bold;">Error downloading student matrix logs. Please review parameters.</p>`;
        }
    }
}

// Array mapping & Template Literals generation (Displays >15 items, 4 properties each)
function renderGridCards(list) {
    const container = document.getElementById("student-grid");
    if (!container) return;
    
    if (list.length === 0) {
        container.innerHTML = "<p>No matching institutional records filtered.</p>";
        return;
    }

    container.innerHTML = list.map(student => `
        <div class="student-card">
            <h4>${student.name}</h4>
            <p><strong>System Identification:</strong> ${student.id}</p>
            <p><strong>Division Level:</strong> ${student.level} (${student.class})</p>
            <p><strong>Activity Status:</strong> ${student.status}</p>
            <button class="btn btn-secondary inspect-btn" data-id="${student.id}" style="margin-top:10px; font-size:13px;">Inspect Detailed Logs</button>
        </div>
    `).join("");
}

// Filter controls logic using Array.filter()
function setupFilterEvents() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            buttons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            
            const scope = e.target.getAttribute("data-filter");
            if (scope === "all") {
                renderGridCards(studentsData);
            } else {
                const subset = studentsData.filter(s => s.level === scope);
                renderGridCards(subset);
            }
        });
    });
}

// Accessible Native Dialog control sequence
function setupModalEvents() {
    const grid = document.getElementById("student-grid");
    const dialog = document.getElementById("student-modal");
    const closeBtn = document.getElementById("close-modal-btn");

    if (grid && dialog) {
        grid.addEventListener("click", (e) => {
            if (e.target.classList.contains("inspect-btn")) {
                const targetId = e.target.getAttribute("data-id");
                const profile = studentsData.find(s => s.id === targetId);
                if (profile) {
                    document.getElementById("modal-student-name").textContent = profile.name;
                    
                    let detailsHTML = "";
                    for (const [key, val] of Object.entries(profile.details)) {
                        detailsHTML += `<p style="margin: 5px 0;"><strong>${key.toUpperCase()}:</strong> ${val}</p>`;
                    }
                    document.getElementById("modal-body-content").innerHTML = detailsHTML;
                    dialog.showModal();
                }
            }
        });
    }

    if (closeBtn && dialog) {
        closeBtn.addEventListener("click", () => dialog.close());
    }
}