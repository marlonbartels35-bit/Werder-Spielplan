// Scroll basierender Header; wichtig: muss hier oben stehen
const body = document.body;
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset

    if (currentScroll <= 0) {
        body.classList.remove("scroll-up")
    }

    if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-up")
        body.classList.add("scroll-down")
    }

    if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-down")
        body.classList.add("scroll-up")
    }

    lastScroll = currentScroll;
})


// Neuer selbst aktualisierender Countdown
const Tage = document.getElementById("days");
const Stunden = document.getElementById("hours");
const Minuten = document.getElementById("minutes");
const Sekunden = document.getElementById("seconds");
const countdownLabel = document.getElementById("countdown-label");
const MATCH_DURATION_MINUTES = 120;

function getMatchDates() {
    return [...document.querySelectorAll(".daten[data-kickoff]")]
        .map((el) => new Date(el.dataset.kickoff))
        .filter((d) => !isNaN(d))
        .sort((a, b) => a - b);
}

function updateCountdown() {
    const now = new Date();
    const allMatches = getMatchDates();
    const currentMatch = allMatches.find((matchDate) => {
        const matchEnd = matchDate.getTime() + MATCH_DURATION_MINUTES * 60 * 1000;
        return now.getTime() >= matchDate.getTime() && now.getTime() < matchEnd;
    });

    if (currentMatch) {
        const matchEnd = currentMatch.getTime() + MATCH_DURATION_MINUTES * 60 * 1000;
        const distance = matchEnd - now.getTime();

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor(distance / (1000 * 60)) % 60;
        const seconds = Math.floor(distance / 1000) % 60;

        if (countdownLabel) {
            countdownLabel.textContent = "Gerade wird gespielt.";
        }

        Tage.textContent = "00";
        Stunden.textContent = String(hours).padStart(2, "0");
        Minuten.textContent = String(minutes).padStart(2, "0");
        Sekunden.textContent = String(seconds).padStart(2, "0");
        return;
    }

    const nextMatch = allMatches.find((d) => d > now) || null;

    if (!nextMatch) {
        if (countdownLabel) {
            countdownLabel.textContent = "Die Saison ist zuende.";
        }
        Tage.textContent = "00";
        Stunden.textContent = "00";
        Minuten.textContent = "00";
        Sekunden.textContent = "00";
        return;
    }

    if (countdownLabel) {
        countdownLabel.textContent = "Matchday in:";
    }

    const distance = nextMatch.getTime() - now.getTime();

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(distance / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(distance / (1000 * 60)) % 60;
    const seconds = Math.floor(distance / 1000) % 60;

    Tage.textContent = String(days).padStart(2, "0");
    Stunden.textContent = String(hours).padStart(2, "0");
    Minuten.textContent = String(minutes).padStart(2, "0");
    Sekunden.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* ALTER COUNTDOWN

const Tage = document.getElementById('days');
const Stunden = document.getElementById('hours');
const Minuten = document.getElementById('minutes');
const Sekunden = document.getElementById('seconds');

// Hier nächsten Matchday eingeben
const targetDate = new Date("Februar 28 2026 15:30:00").getTime();

function timer() {
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

    if (distance < 0) {
        Tage.innerHTML = "00"
        Stunden.innerHTML = "00"
        Minuten.innerHTML = "00"
        Sekunden.innerHTML = "00"
    }
}

setInterval(timer, 1000);*/


// Email Feedback
function sendMail(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    const parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_rvvtsjg", "template_w47fijx", parms)
        .then(() => {
            alert("Nachricht gesendet!");
        })
        .catch((error) => {
            console.error("EmailJS error:", error);
            alert("Fehler beim Senden: " + (error.text || error));
        });
}