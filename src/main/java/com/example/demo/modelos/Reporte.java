package com.example.demo.modelos;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "reporte")
public class Reporte implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_reporte" ,unique = true, nullable = true)
    private Long idreporte;

    @Column(name="tipo_delito")
    private String tipodelito;

    @Column(name="descripcion_acontecimiento")
    private String des_acontecimiento;

    @Column(name="longitud")
    private Long longitud;

    @Column(name="latitud")
    private Long latitud;

    @Column(name="fecha")
    private String fecha;

    @Column(name="usuario_idusuario")
    private Long usuario_idusuario;

    public void setIdreporte(Long idreporte) {
        this.idreporte = idreporte;
    }

    public Long getIdreporte() {
        return idreporte;
    }

    public void setTipo_delito(String tipo_delito){
        this.tipodelito = tipo_delito;
    }

    public String getTipo_delito(){
        return tipodelito;
    }

    public void setDes_acontecimiento(String des_acontecimiento) {
        this.des_acontecimiento = des_acontecimiento;
    }

    public String getDes_acontecimiento(){
        return des_acontecimiento;
    }

    public void setLongitud(Long longitud) {
        this.longitud = longitud;
    }

    public Long getLongitud(){
        return longitud;
    }

    public void setLatitud(Long latitud){
        this.latitud = latitud;
    }

    public Long getLatitud(){
        return latitud;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getFecha(){
        return fecha;
    }

    public void setUsuario_idusuario(Long usuario_idusuario) {
        this.usuario_idusuario = usuario_idusuario;
    }

    public Long getUsuario_idusuario(){
        return usuario_idusuario;
    }
    
}
