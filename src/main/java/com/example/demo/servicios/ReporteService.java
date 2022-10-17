package com.example.demo.servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modelos.Reporte;
import com.example.demo.repositorios.ReporteRepo;

@Service
public class ReporteService {
    @Autowired
    ReporteRepo reporteRepo;

    public ArrayList<Reporte> getReportes() {
        return (ArrayList<Reporte>)reporteRepo.findAll();
    }

    public Reporte saveReporte(Reporte reporte){
        return reporteRepo.save(reporte);
    }

    public Optional<Reporte> getReportforId(Long idreporte){
        return reporteRepo.findByIdreporte(idreporte);
    }

    public boolean deleteReportforid(Long idreporte){
        try {
            reporteRepo.deleteByIdreporte(idreporte);
            return true;
        } catch (Exception err) {
            return false;
        }
    }
    
}

