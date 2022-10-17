package com.example.demo.modelos;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idusuario", unique = true, nullable = true)
    private Long idusuario;

    @Column(name="username", unique = true)
    private String username;

    @Column(name="password")
    private String password;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Long getIdusuario(){
        return idusuario;
    }
    
    public void setIdusuario(Long idusuario) {
        this.idusuario = idusuario;
    }
    
}
