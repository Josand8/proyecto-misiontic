//Abrir correo automático a la empresa
var botonContactar = document.getElementById("contactarPorCorreo");
botonContactar.addEventListener("click",enviarCorreo)

function enviarCorreo () {
    var stringFinalaEnviar = "mailto:appseguridadciudadana@app.net?subject=" + "Solicitud de información para la App de seguridad ciudadana: " + "&body=" + "Quisiera recibir información sobre...";
    window.open(stringFinalaEnviar);
}
