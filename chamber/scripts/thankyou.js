// Thank You Page URL Query Parameter Parser Engine
document.addEventListener("DOMContentLoaded", () => {
    const dataContainer = document.getElementById("parameter-summary");
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has("firstName")) {
        let rawTime = queryParams.get("formTimestamp");
        let structuredTime = rawTime ? new Date(rawTime).toLocaleString() : "N/A";

        dataContainer.innerHTML = `
            <p><strong>Applicant Name:</strong> ${queryParams.get("firstName")} ${queryParams.get("lastName")}</p>
            <p><strong>Contact Email:</strong> <a href="mailto:${queryParams.get("email")}">${queryParams.get("email")}</a></p>
            <p><strong>Mobile Line:</strong> ${queryParams.get("phone")}</p>
            <p><strong>Corporate Entity:</strong> ${queryParams.get("orgName")}</p>
            <p><strong>Selected Tier Value:</strong> <span class="tier-highlight">${queryParams.get("membershipLevel")}</span></p>
            <p><strong>System Load Epoch Timestamp:</strong> <code>${structuredTime}</code></p>
        `;
    } else {
        dataContainer.innerHTML = `<p style="color: #cc0000;">⚠️ No valid application query string traces located in active window variables.</p>`;
    }
});