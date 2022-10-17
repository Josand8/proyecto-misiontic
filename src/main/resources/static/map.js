var map = L.map('map').setView([4.62971, -74.12000], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '© OpenStreetMap'
}).addTo(map);

