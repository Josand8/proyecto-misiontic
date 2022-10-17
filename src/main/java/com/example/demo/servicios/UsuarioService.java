package com.example.demo.servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modelos.Usuario;
import com.example.demo.repositorios.UsuarioRepo;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepo usuarioRepo;

    public ArrayList<Usuario> getUsuarios() {
        return (ArrayList<Usuario>) usuarioRepo.findAll();
    }

    public Optional<Usuario> getUserforUsername(String username){
        return usuarioRepo.findByUsername(username);
    }
    
    public Usuario saveUsuario(Usuario usuario){
        return usuarioRepo.save(usuario);
    }
    
    public Optional<Usuario> getUserforId(Long idusuario){
        return usuarioRepo.findByIdusuario(idusuario);
    }

    public boolean deleteUserforid(Long idusuario){
        try {
            usuarioRepo.deleteByIdusuario(idusuario);
            return true;
        } catch (Exception err) {
            return false;
        }
    }
}