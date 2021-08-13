const getAddressData = function(receivedName, receivedAddress, receivedCity, receivedCounty) {
  document.querySelector('.address').innerHTML =`
    <div class="address-data">
      <div class="icon">
        <img src="./assets/ic_bet_shop_location.png" alt="place_icon"></img>
      </div>
      <div>
        <span>${receivedName}</span>
        <span>${receivedAddress}</span>
        <span>${receivedCity} - ${receivedCounty}</span>
      </div>
    </div>                    
  `;
}