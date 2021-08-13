const calculateOpeningHours = function(){
  const date = new Date();
  const hours = date.getHours();

  document.querySelector('.time').innerHTML =`
    <div class="time-data">
      <div class="time-icon">
        <img src="./assets/ic_bet_shop_hours.png" alt="clock_icon"></img>
      </div>
      <div class="clock-text">
        ${(hours >= 8 && hours <= 16) ? "Open now until 16h." : "Opens tomorrow at 8h."}
      </div>
    </div>
  `;
  }