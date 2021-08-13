const fetchData = function() {
  const icon_active = './assets/ic_pin_active.png';
  const icon_normal = './assets/ic_pin_normal.png';
  const infoWindow = new google.maps.InfoWindow;

  // if user click Block set map on this coordinates
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 48.137154, lng: 11.576124 },
    zoom: 12
  })

  // fetch betshops position
  fetch('https://interview.superology.dev/betshops?boundingBox=48.16124,11.60912,48.12229,11.52741')
    .then(response => response.json()) 
    .then(data => { 
      const receivedData = data.betshops;
      let markers = [];
          
      receivedData.forEach(function(data, i) {
        const receivedLng = receivedData[i] = data.location.lng;
        const receivedLat = receivedData[i] = data.location.lat;
        const receivedAddress = receivedData[i] = data.address;
        const receivedName = receivedData[i] = data.name;
        const receivedCity = receivedData[i] = data.city;
        const receivedCounty = receivedData[i] = data.county;

        // change icon of received markers
        let marker = new google.maps.Marker ({
            position: { lat: receivedLat, lng: receivedLng},
            map,
            icon: icon_normal
        })

        // remove icon_active after clicked on another marker
        google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
              for (var j = 0; j < markers.length; j++) {
                markers[j].setIcon(icon_normal);
              }
              this.setIcon(icon_active)
              infoWindow.open(map, marker);
            }
          })(marker));

        markers.push(marker);
      
        //on icon click populate sidebar with data
        function addInfoWindow(marker) {
          google.maps.event.addListener(marker, 'click', function () {

            //calculate opening hours
            calculateOpeningHours();
            
            //get address data when clicked on marker
            getAddressData(receivedName, receivedAddress, receivedCity, receivedCounty)
            
            //get all weather data
            getWeatherData()
            
          });
        }
        addInfoWindow(marker);
        });  
    })
  .catch((error) => {
      console.log(error)
  })
}