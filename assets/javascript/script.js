const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.tomorrow.io/v4/weather/realtime?location=hartford&units=imperial&apikey=ns6H9BEVqWNemqAjv63ImeJ1sepRXXoE', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
