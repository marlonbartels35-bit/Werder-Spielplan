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

setInterval(timer, 1000);


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



// Scroll basierender Header
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