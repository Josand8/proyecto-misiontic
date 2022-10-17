package com.example.demo.controladores;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.modelos.Usuario;
import com.example.demo.servicios.UsuarioService;

@RestController
@RequestMapping("/adduser")
public class UsuarioControlador {
    
    @Autowired
    UsuarioService usuarioService;

    @GetMapping()
    public ArrayList<Usuario> getUsuarios() {
        return usuarioService.getUsuarios();
    }

    @PostMapping()
    public Usuario saveUsuario(@RequestBody Usuario usuario){
        return this.usuarioService.saveUsuario(usuario);
    }

    @GetMapping(path ="/{idusuario}")
    public Optional<Usuario> getforId(@PathVariable ("idusuario") Long idusuario){
        return this.usuarioService.getUserforId(idusuario);
    }

    @DeleteMapping(path = "/{idusuario}")
    public String deleteforId(@PathVariable("idusuario") Long idusuario){
        boolean ok = this.usuarioService.deleteUserforid(idusuario);
        if (ok) {
            return "Se eliminó el usuario con id" + idusuario;
        } else {
            return "No pudo eliminar el usuario con id" + idusuario;
        }
    }


    
}
