
// Initialize the map
var map = L.map('map').setView([0, 0], 1);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker to the map
var marker = L.marker([0, 0]).addTo(map);

// Retrieve stored address information from localStorage if available
var storedCity = localStorage.getItem('destCity');
var storedState = localStorage.getItem('destState');
if (storedCity && storedState) {
    document.getElementById('destCity').value = storedCity;
    document.getElementById('destState').value = storedState;
    fetchLocation(storedCity, storedState);
}

// Handle form submission and close modal
document.querySelector('#addressModal .modal-footer .btn-primary').addEventListener('click', function() {
    var city = document.getElementById('destCity').value;
    var state = document.getElementById('destState').value;

    // Store the address in localStorage
    localStorage.setItem('destCity', city);
    localStorage.setItem('destState', state);

    // Fetch location information
    fetchLocation(city, state);

    // Close modal after form submission
    var addressModal = bootstrap.Modal.getInstance(document.getElementById('addressModal'));
    addressModal.hide();
});

// Close modal when the close button is clicked
document.querySelector('#addressModal .modal-header .btn-close').addEventListener('click', function() {
    var addressModal = bootstrap.Modal.getInstance(document.getElementById('addressModal'));
    addressModal.hide();
});

function fetchLocation(city, state) {
    var address = city + ', ' + state;

    // Use OpenStreetMap Nominatim API for geocoding
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var lat = data[0].lat;
                var lon = data[0].lon;

                // Update the map view
                map.setView([lat, lon], 13);

                // Move the marker
                marker.setLatLng([lat, lon]);
            } else {
                alert('Location not found');
            }
        })
}



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


