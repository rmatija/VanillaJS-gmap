function initMap() {

  const infoWindow = new google.maps.InfoWindow; 
  const geo = navigator.geolocation;

  function loadMap(position) {

    // if user click allow set coordinates on user's position
    map = new google.maps.Map(document.getElementById('map'), {
      center: { 
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        },
      zoom: 12
    });

    const marker = new google.maps.Marker({
      position: map.center,
      map
    });

    infoWindow.setPosition(map.center);
    infoWindow.open(map, marker);
  }

  if (geo) {
    geo.getCurrentPosition(position => { loadMap(position) }, fetchData());
  }
}