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