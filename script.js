// Variables
const ipAddress = document.getElementById("ipAddress");
const ipLocation = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const form = document.getElementById("ipForm");
let map;

// Initialize map
function initMap(lat = 37.38605, lng = -122.08385) {
  map = L.map('map').setView([lat, lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  L.marker([lat, lng]).addTo(map);
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("ip-input").value;
  ipInfo(input);
});

// Fetch IP information
const ipInfo = (address = "") => {
  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qoJBZrBxMVeTgrJkk7P3vZIbtmb0U&domain=${address}`)
    .then(res => res.json())
    .then(data => {
      const { lat, lng } = data.location;
      showIpInfo(data);
      updateMap(lat, lng);
    })
    .catch(error => {
      console.error("Error fetching IP data:", error);
      alert("Failed to fetch IP data. Please try again.");
    });
};

// Display IP information
const showIpInfo = (data) => {
  ipAddress.textContent = data.ip || "-";
  ipLocation.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}` || "-";
  timezone.textContent = `UTC ${data.location.timezone}` || "-";
  isp.textContent = data.isp || "-";
};

// Update map with new coordinates
const updateMap = (lat, lng) => {
  map.setView([lat, lng], 13);
  L.marker([lat, lng]).addTo(map);
};

// Initialize map and fetch user's IP on page load
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  ipInfo();
});