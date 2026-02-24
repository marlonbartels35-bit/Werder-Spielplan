const Tage = document.getElementById('days');
const Stunden = document.getElementById('hours');
const Minuten = document.getElementById('minutes');
const Sekunden = document.getElementById('seconds');

// Hier nächsten Matchday eingeben
const targetDate = new Date("Februar 28 2026 15:30:00").getTime();

function timer () {
    const currentDate = new Date().getTime();
    const distance = targetDate - currentDate;

    const days = Math.floor(distance / 1000 / 60 / 60 / 24);
    const hours = Math.floor(distance / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(distance / 1000 / 60) % 60;
    const seconds = Math.floor(distance / 1000) % 60;

    Tage.innerHTML = days;
    Stunden.innerHTML = hours;
    Minuten.innerHTML = minutes;
    Sekunden.innerHTML = seconds;

    if(distance < 0){
        Tage.innerHTML = "00"
        Stunden.innerHTML = "00"
        Minuten.innerHTML = "00"
        Sekunden.innerHTML ="00"
    }
}

setInterval(timer, 1000);