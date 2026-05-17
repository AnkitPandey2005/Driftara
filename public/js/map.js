// Render a Leaflet map using OpenStreetMap tiles. No API key required.
const coords = listing.geometry?.coordinates || [0, 0];
const lng = coords[0];
const lat = coords[1];
const map = L.map("map").setView([lat, lng], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const marker = L.marker([lat, lng]).addTo(map);
marker.bindPopup(`<div class="map-click"><h4><b>${listing.title}</b></h4><p>Exact location will be provided after booking.</p></div>`);
