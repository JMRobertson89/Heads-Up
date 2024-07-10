

// Map API

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);




const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.tomorrow.io/v4/weather/realtime?location=hartford&units=imperial&apikey=ns6H9BEVqWNemqAjv63ImeJ1sepRXXoE', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

