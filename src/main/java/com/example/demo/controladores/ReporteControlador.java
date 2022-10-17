package com.example.demo.controladores;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.modelos.Reporte;
import com.example.demo.servicios.ReporteService;

@RestController
@RequestMapping("/addreport")
public class ReporteControlador {

    @Autowired
    ReporteService reporteService;

    @GetMapping()
    public ArrayList<Reporte> getReportes() {
        return reporteService.getReportes();
    }

    @PostMapping()
    public Reporte saveReporte(@RequestBody Reporte reporte){
        return this.reporteService.saveReporte(reporte);
    }

    @GetMapping(path ="/{idreporte}")
    public Optional<Reporte> getforId(@PathVariable ("idreporte") Long idreporte){
        return this.reporteService.getReportforId(idreporte);
    }

    @DeleteMapping(path = "/{idreporte}")
    public String deleteforId(@PathVariable("idreporte") Long idreporte){
        boolean ok = this.reporteService.deleteReportforid(idreporte);
        if (ok) {
            return "Se eliminó el usuario con id" + idreporte;
        } else {
            return "No pudo eliminar el usuario con id" + idreporte;
        }
    }


    
}
