// OpenWeatherMap API Implementation for Lagos, NG
const apiKey = '08b506337344ccf8375790e9cde393ac';
const city = 'Lagos';
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

// Select elements present in index.html
const tempElement = document.querySelector('#current-temp');
const descElement = document.querySelector('#weather-desc');
const forecastContainer = document.querySelector('#forecast');

async function fetchWeather() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayWeather(data);

  } catch (error) {
    console.error("Weather System Error:", error);
    // Graceful error display that doesn't break the layout card aesthetics
    if (descElement) {
      descElement.innerHTML = `<span style="color:#cc0000; font-size:0.85rem;">Forecast data temporarily unavailable</span>`;
    }
  }
}

function displayWeather(data) {
  // 1. Render Current Weather
  const current = data.list[0];
  
  // Clean capitalization helper logic
  const description = current.weather[0].description
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (tempElement) {
    tempElement.innerHTML = `<strong>${Math.round(current.main.temp)}°C</strong>`;
  }
  
  if (descElement) {
    descElement.innerHTML = `${description} | Humidity: ${current.main.humidity}%`;
  }

  // 2. Render Labeled 3-Day Forecast Loops safely
  if (forecastContainer) {
    forecastContainer.innerHTML = ""; // Clear loader text

    // Filter by timestamp window safely
    let dailyForecast = data.list.filter(item => item.dt_txt && item.dt_txt.includes("12:00:00"));

    // Bulletproof Fallback: If 12:00:00 isn't caught, grab intervals spaced ~24 hours apart manually
    if (dailyForecast.length === 0) {
      dailyForecast = [data.list[8], data.list[16], data.list[24]];
    }

    // Loop through exactly 3 records to satisfy assignment criteria
    dailyForecast.slice(0, 3).forEach(day => {
      if (day) {
        const date = new Date(day.dt_txt || day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp);

        // Build clean structural sub-rows matching your layout design style
        const dayRow = document.createElement('div');
        dayRow.className = 'forecast-day';
        dayRow.style.display = 'flex';
        dayRow.style.justifyContent = 'space-between';
        dayRow.style.padding = '0.3rem 0';
        dayRow.style.borderBottom = '1px dashed #e2e8f0';
        
        dayRow.innerHTML = `
          <span><strong>${dayName}</strong></span>
          <span>${temp}°C</span>
        `;

        forecastContainer.appendChild(dayRow);
      }
    });
  }
}

// Global Footer Date Dynamic Update Logic
function populateFooterDates() {
  const yearSpan = document.getElementById('currentyear');
  const modifiedSpan = document.getElementById('lastModified');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (modifiedSpan) modifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
}

document.addEventListener("DOMContentLoaded", () => {
  populateFooterDates();
  fetchWeather();
});