
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

                // Fetch weather information for lat lon
                weather.fetchweather(lat, lon)
            } else {
                alert('Location not found');
            }
        })
}



// TODO Weather API

// const options = {method: 'GET', headers: {accept: 'application/json'}};

// fetch('https://api.tomorrow.io/v4/weather/realtime?location=hartford&units=imperial&apikey=ns6H9BEVqWNemqAjv63ImeJ1sepRXXoE', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


let weather = {
    apiKey: "a62915ca2ffd9620d9f39d90f68fc54d",
    fetchWeather: function (lat, lon) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=" 
            + lat 
            + "&lon=" 
            + lon 
            + "&units=imperial&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " mp/h";
    },
    
};
