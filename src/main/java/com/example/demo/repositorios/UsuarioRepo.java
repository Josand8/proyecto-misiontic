package com.example.demo.repositorios;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modelos.Usuario;

@Repository
public interface UsuarioRepo extends JpaRepository<Usuario, String> {

    Optional<Usuario> findByIdusuario(Long idusuario);
    void deleteByIdusuario(Long idusuario);
    Usuario getReferenceByIdusuario(Long idusuario);
    Optional<Usuario> findByUsername(String username);
    
}
