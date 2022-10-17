miStorage = window.localStorage;
//Reconociendo el nombre del usuario
// var nombreUsuario = document.getElementById('nameInicioSesion').innerHTML;
// alert(nombreUsuario);
// window.onload = alert(localStorage.getItem("nombre_usuario"));

//Usar esto
// var nombre_usuario_recibido = localStorage.getItem('nombre_usuario');
// alert(nombre_usuario_recibido);

var map = L.map('map').setView([4.62971, -74.12000], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '© OpenStreetMap'
}).addTo(map);


var coordenadasDelReporte = document.getElementById('coordenadasReportadas');
var Longitud = document.getElementById('Longitud');
var Latitud = document.getElementById('Latitud');

function onMapClick(e) {
    
    var coordenadas = e.latlng;
    var latitud = coordenadas.lat;
    var coordenadas = e.latlng;
    var longitud = coordenadas.lng;

    Longitud.innerHTML = longitud
    Latitud.innerHTML = latitud
    coordenadasDelReporte.innerHTML = latitud + "," + longitud;
}
map.on('click', onMapClick);

//Limitando la fecha del reporte a máximo hoy
var hoy = new Date();
var dia = hoy.getDate();
var mes = hoy.getMonth() + 1; //January is 0!
var ano = hoy.getFullYear();

if (mes < 10) {
    mes = '0' + mes;
    if (dia < 10) {
        dia = '0' + dia;
     }
 }
    
hoy = ano + '-' + mes + '-' + dia;

document.getElementById("fechaReporte").setAttribute("max", hoy);
document.getElementById("fechaReporte").setAttribute("value", hoy);

document.getElementById("fechaReporteEdicion").setAttribute("max", hoy);
document.getElementById("fechaReporteEdicion").setAttribute("value", hoy);

var IDUnicoReporte = document.getElementById('IDReportado');
var eleccionTipoReporte = document.getElementById('selectorTipoReporte');
var detallesDelReporte = document.getElementById('entradaDeLosDetalles');
var fechaReporte = document.getElementById('fechaReporte');
var botonEnviarElReporte = document.getElementById('botonEnviarReporte');

botonEnviarElReporte.addEventListener('click',enviarReporteABackEnd);


function enviarReporteABackEnd() {

    var coordenadasFinalesReportadas = coordenadasDelReporte.textContent.split(",");
    var latitudReportada = coordenadasFinalesReportadas[0];
    var longitudReportada = coordenadasFinalesReportadas[1];

    IDUnicoReporte = uuid.v4();

    if(eleccionTipoReporte.value == 1) {
        var tipoReporte = "DESASTRE NATURAL";
        var iconoUrl = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/terremoto.png";
        // var sombraIcon = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/terremoto-sombra.png"; 
        alert(`[{
            "nombreUsuarioDeReporte": "${nombre_usuario_recibido}",
            "idDeReporte": "${IDUnicoReporte}",
            "TipoDeReporte": "${tipoReporte}",
            "DescripcionDelReporte": "${detallesDelReporte.value}",
            "FechaDelReporte": "${fechaReporte.value}",
            "Latitud": "${latitudReportada}",
            "Longitud": "${longitudReportada}"
        }]`);
    } else if(eleccionTipoReporte.value == 2) {
        var tipoReporte = "ACCIDENTE VIAL";
        var iconoUrl = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/choque-de-autos.png";
        // var sombraIcon = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/choque-de-autos-sombra.png";
        alert(`[{
            "nombreUsuarioDeReporte": "${nombre_usuario_recibido}",
            "idDeReporte": "${IDUnicoReporte}",
            "TipoDeReporte": "${tipoReporte}",
            "DescripcionDelReporte": "${detallesDelReporte.value}",
            "FechaDelReporte": "${fechaReporte.value}",
            "Latitud": "${latitudReportada}",
            "Longitud": "${longitudReportada}"
        }]`);
    } else if(eleccionTipoReporte.value == 3) {
        var tipoReporte = "ROBO";
        var iconoUrl = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/robo.png";
        // var sombraIcon = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/robo-sombra.png";
        alert(`[{
            "nombreUsuarioDeReporte": "${nombre_usuario_recibido}",
            "idDeReporte": "${IDUnicoReporte}",
            "TipoDeReporte": "${tipoReporte}",
            "DescripcionDelReporte": "${detallesDelReporte.value}",
            "FechaDelReporte": "${fechaReporte.value}",
            "Latitud": "${latitudReportada}",
            "Longitud": "${longitudReportada}"
        }]`);
    };

    var Icon = L.icon({
        iconUrl: iconoUrl,
        // shadowUrl: sombraIcon,
        iconSize:     [50, 50], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [10, -35] // point from which the popup should open relative to the iconAnchor
    });
    
    // var circle = L.circle([latitudReportada, longitudReportada], {
    //     color: 'purple',
    //     fillColor: '#fff',
    //     fillOpacity: 0.5,
    //     radius: 1500
    // }).addTo(map);

    var textoPopupDen = `<br><b>${tipoReporte}</b><br>${detallesDelReporte.value}</b><br>Fecha :${fechaReporte.value}`;

    // var marker = L.marker([latitudReportada, longitudReportada], {icon: Icon}).addTo(map);
    var marker = L.marker([latitudReportada, longitudReportada], {icon: Icon}).addTo(map);
    var popup = L.popup();
    marker.bindPopup(textoPopupDen).openPopup();
    // alert("pillar");

    // function eventoClickDen(e) {
            
    //     // var idActual = this.options.iconId;
    //     // var tipoActual = this.options.iconTipo; 
    //     // var descripcionActual = this.options.iconDescripcion;
    //     // var fechaActual = this.options.iconFecha;
    //     // var latitudActual = this.options.iconLatitud;
    //     // var longitudActual = this.options.iconLongitud;
    //     // var textoActual = this.options.iconTexto;
    //     // alert(textoActual);

    //     var campoidDen = document.getElementById('idDelReporteSinEdicion');
    //     var campoSinEdicionTipoDen = document.getElementById('tipoDelReporteSinEdicion');
    //     var campoSinEdicionDetalleDen = document.getElementById('entradaDeLosDetallesEdicion');
    //     var campoSinEdicionFechaDen = document.getElementById('fechaReporteEdicion');

    //     campoidDen.innerHTML = IDUnicoReporte;
    //     campoSinEdicionTipoDen.innerHTML = tipoReporte;
    //     campoSinEdicionDetalleDen.innerHTML = detallesDelReporte.value;
    //     campoSinEdicionFechaDen.innerHTML =  fechaReporte.value;
    // }
}


// var popupReporte = document.getElementById('popupReporteUsuario');
var clicksEnMapa = document.getElementById('map');
// alert(clicksEnMapa);

clicksEnMapa.addEventListener('click', noHacerNada);
clicksEnMapa.addEventListener('dblclick', mostrarPopupDeReporte);

function noHacerNada() {
    // alert("noHacerNada");
    clicksEnMapa.removeAttribute('data-bs-toggle');
    clicksEnMapa.removeAttribute('data-bs-target');
}

function mostrarPopupDeReporte() {
    alert("Da click sobre un punto aproximado a la ubicación deseada");
    clicksEnMapa.setAttribute('data-bs-toggle', 'modal');
    clicksEnMapa.setAttribute('data-bs-target', '#exampleModal4');
}
