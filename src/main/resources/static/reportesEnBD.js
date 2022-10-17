miStorage = window.localStorage;
//Reconociendo el nombre del usuario
var nombre_usuario_recibido = localStorage.getItem('nombre_usuario');
// alert(nombre_usuario_recibido);

//Accediendo a los datos del JSON (por lo pronto de manera local, luego con los datos entregados por el backend con JSON)
const miSolicitud = new Request('datosConsultados.json');

// const url = 'http://irreverente.net/AppWebProyectoSeguridadCiudadana/misDatosConsultados.json';
 
fetch(miSolicitud, {
    method: "GET",
    headers: {"Content-type": "application/json;charset=UTF-8"}
  })
    .then(response => response.json())
    .then(misDatosConsultadosJSON => {
      for (const miDatoConsultado of misDatosConsultadosJSON.misDatosConsultados) {
        // alert(nombre_usuario_recibido==miDatoConsultado.nombreUsuarioDeReporte); 
        // if(nombre_usuario_recibido==miDatoConsultado.nombreUsuarioDeReporte) {
        
        if(miDatoConsultado.tipoReporte == 1) {
          var tipoReporteConsultado = "DESASTRE NATURAL";
          var iconoUrl = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/terremoto.png";
        } else if(miDatoConsultado.tipoReporte == 2) {
          var tipoReporteConsultado = "ACCIDENTE VIAL";
          var iconoUrl = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/choque-de-autos.png";
         } else if(miDatoConsultado.tipoReporte == 3) {
          var tipoReporteConsultado = "ROBO";
          var iconoUrl = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/robo.png";
        }

        if(nombre_usuario_recibido==miDatoConsultado.nombreUsuarioDeReporte) {  

          // Visualizar popup del icono cuando se de click sobre el
          var Icon = L.icon({
            iconUrl: iconoUrl,
            // shadowUrl: sombraIcon,
            iconSize:     [50, 50], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [10, -35] // point from which the popup should open relative to the iconAnchor
          });

          var idReporte = miDatoConsultado.idDeReporte;
  
          var textoPopup = `<span style= "color: transparent;" id="idInvisibleEnMiniPopUP">${idReporte}</span><br><b>${tipoReporteConsultado}</b><br>${miDatoConsultado.detallesDelReporte}</b><br>Fecha :${miDatoConsultado.fechaReporte} <br><button onclick="verDataid" data-id="${idReporte}" data-bs-toggle="modal" data-bs-target="#exampleModal5" style="margin: 5px; padding: 5px; background-color: lightblue;" id="btnEditarOEliminar">Editar o eliminar este reporte</button>`;
  
          //USAR LOS IDENTIFICADORES UNICOS GENERADOS CON LA LIBRERÍA UUID PARA EDITAR EL EVENTO

          var marker = L.marker([miDatoConsultado.latitudReportada, miDatoConsultado.longitudReportada], {icon: Icon, iconId: idReporte, iconTipo: tipoReporteConsultado,  iconDescripcion: miDatoConsultado.detallesDelReporte, iconFecha: miDatoConsultado.fechaReporte, iconLatitud: miDatoConsultado.latitudReportada, iconLongitud: miDatoConsultado.longitudReportada, iconTexto: textoPopup}).addTo(map).on('click', eventoClick);

          var popup = L.popup();
          marker.bindPopup(textoPopup);

          var pathname = window.location.pathname;
          switch(pathname) {
            case "/index.html" :
              // alert("index");
              var marker = L.marker([miDatoConsultado.latitudReportada, miDatoConsultado.longitudReportada], {icon: Icon}).addTo(map);
              var popup = L.popup();
              marker.bindPopup(`<b>${tipoReporteConsultado}</b><br>${miDatoConsultado.detallesDelReporte}</b><br>Fecha :${miDatoConsultado.fechaReporte}`);
              break;
            case "/logueado.html" :
              // alert("logueado");
              break;
          }
          //Reportes hechos por el usuario
          // var circle = L.circle([miDatoConsultado.latitudReportada, miDatoConsultado.longitudReportada], {
          //   color: 'purple',
          //   fillColor: '#fff',
          //   fillOpacity: 0.5,
          //   radius: 1500
          // }).addTo(map);
  
          function eventoClick(e) {
            
            const marker = this;
            // const circle = this;

            var idActual = this.options.iconId;
            var tipoActual = this.options.iconTipo; 
            var descripcionActual = this.options.iconDescripcion;
            var fechaActual = this.options.iconFecha;
            var latitudActual = this.options.iconLatitud;
            var longitudActual = this.options.iconLongitud;
            var textoActual = this.options.iconTexto;
            // alert(textoActual);
  
            var campoid = document.getElementById('idDelReporteSinEdicion');
            var campoSinEdicionTipo = document.getElementById('tipoDelReporteSinEdicion');
            var campoSinEdicionDetalle = document.getElementById('entradaDeLosDetallesEdicion');
            var campoSinEdicionFecha = document.getElementById('fechaReporteEdicion');
  
            campoid.innerHTML = idActual;
            campoSinEdicionTipo.innerHTML = tipoActual;
            campoSinEdicionDetalle.innerHTML = descripcionActual;
            // alert(campoSinEdicionDetalle.innerHTML);
            campoSinEdicionFecha.innerHTML =  fechaActual;
  
            //Editar
            var botonEditar = document.getElementById('botonEditarReporte');
              
            botonEditar.addEventListener('click', enviarEdicionABackEnd);
            
            campoSinEdicionDetalle.value=this.options.iconDescripcion;
            // var contadorEdicion = 0;
            function enviarEdicionABackEnd() {
              // contadorEdicion = contadorEdicion + 1;
              // if(contadorEdicion == 1) {
                var campoDeId = document.getElementById('idDelReporteSinEdicion');
                
                if(campoDeId.innerHTML.includes(idActual)) {
                  alert(`Solicitud de edición del reporte con el id [{
                    "nombreUsuarioDeReporte": "${nombre_usuario_recibido}",
                    "idDeReporte": "${campoDeId.innerHTML}",
                    "TipoDeReporte": "${campoSinEdicionTipo.innerHTML}",
                    "DescripcionDelReporte": "${campoSinEdicionDetalle.value}",
                    "FechaDelReporte": "${campoSinEdicionFecha.value}",
                    "Latitud": "${latitudActual}",
                    "Longitud": "${longitudActual}"
                  }]`);
                }
                // botonEditar.className -= ' visible';
                // botonEditar.className += ' invisible';
              // }
            }
      
            //Eliminar
            var botonEliminar = document.getElementById('botonEliminarReporte');
            
            botonEliminar.addEventListener('click', enviarEliminacionABackEnd);
  
            var modalDeEdicionOEliminacion = document.getElementById('modalEdicionOEliminacion');
  
            var contadorEliminacion = 0;
            function enviarEliminacionABackEnd() {
              contadorEliminacion = contadorEliminacion + 1;
              if(contadorEliminacion == 1) {

                // marker.clearLayers();
                // location.reload();
                var campoDeId = document.getElementById('idDelReporteSinEdicion');
                
                if(campoDeId.innerHTML.includes(idActual)) {
                  alert(`Solicitud de eliminación del reporte con el id [{
                    "idDeReporte": "${campoDeId.innerHTML}",
                  }]`);
                  
                  // if (marker != undefined) {};
  
                  // if (campoDeId.innerHTML==idActual) {};
                  if (campoDeId.innerHTML==idActual) {
                    map.removeLayer(marker);
                    // map.removeLayer(circle);
                  };
                }
              }
            }
          }
  
          // var popup = L.popup();
          // marker.bindPopup(textoPopup);

        } else {
          var pathname = window.location.pathname;
          switch(pathname) {
            case "/index.html" :
              // alert("index");
              break;
            case "/logueado.html" :
              // alert("logueado");
              // alert(nombre_usuario_recibido);
              // if(miDatoConsultado.nombreUsuarioDeReporte) {
                if(miDatoConsultado.tipoReporte == 1) {
                  var tipoReporteConsultado = "DESASTRE NATURAL";
                  var iconoUrl = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/terremoto-sombra.png";
                } else if(miDatoConsultado.tipoReporte == 2) {
                  var tipoReporteConsultado = "ACCIDENTE VIAL";
                  var iconoUrl = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/choque-de-autos-sombra.png";
                } else if(miDatoConsultado.tipoReporte == 3) {
                  var tipoReporteConsultado = "ROBO";
                  var iconoUrl = "https://irreverente.net/AppWebProyectoSeguridadCiudadana/img/robo-sombra.png";
                }
                break;
              // }

          }
          
          var Icon = L.icon({
            iconUrl: iconoUrl,
            iconSize:     [50, 50], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [10, -35] // point from which the popup should open relative to the iconAnchor
          });
          var marker = L.marker([miDatoConsultado.latitudReportada, miDatoConsultado.longitudReportada], {icon: Icon}).addTo(map);
          var popup = L.popup();
          marker.bindPopup(`<b>${tipoReporteConsultado}</b><br>${miDatoConsultado.detallesDelReporte}</b><br>Fecha :${miDatoConsultado.fechaReporte}`);
          // .openPopup()     
        }
      }
    })
    .catch(console.error);











