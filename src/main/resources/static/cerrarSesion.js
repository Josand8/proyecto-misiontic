function cerrarSesion() {
    var nameRegistro = "";
    var passwordRegistro = "";
    localStorage.removeItem('nombre_usuario_recibido');
    localStorage.clear();
    location.reload();
}