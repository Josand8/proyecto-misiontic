package com.example.demo.controladores;

import java.util.List;
// import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.modelos.Reporte;
import com.example.demo.modelos.Usuario;
import com.example.demo.repositorios.ReporteRepo;
import com.example.demo.repositorios.UsuarioRepo;

@Controller
public class Controlador {

    @Autowired
    private UsuarioRepo urp;

    @Autowired
    private ReporteRepo rp;

    @GetMapping("/allusers")
    public String allusers(Model modelo){
        List<Usuario> lista_usuarios= (List<Usuario>) urp.findAll();
        modelo.addAttribute("lista_usuarios", lista_usuarios);
        return "allusers";
    }

    @RequestMapping(value="/guardaruser", method = RequestMethod.POST)
    public String guardar_usuario(@ModelAttribute("usuario_n") Usuario usuario){
        urp.save(usuario);
        return "redirect:/iniciosesion";
    }

    @GetMapping("/allusers/{idusuario}")
    public ModelAndView editar(@PathVariable(name = "idusuario") Long idusuario){
        ModelAndView modelo = new ModelAndView("editar");
        Usuario usuario = urp.getReferenceByIdusuario(idusuario);
        modelo.addObject("usuario", usuario);
        return modelo;
    }

    @Transactional
    @GetMapping("/allusers/eliminar/{idusuario}")
    public String eliminar(@PathVariable(name="idusuario") Long idusuario){
        urp.deleteByIdusuario(idusuario);
        return "redirect:/allusers";
    }

    @GetMapping("/allreports")
    public String allreports(Model modelo){
        List<Reporte> lista_reportes= (List<Reporte>) rp.findAll();
        modelo.addAttribute("lista_reportes", lista_reportes);
        return "allreports";
    }

    @RequestMapping(value="/guardarreport", method = RequestMethod.POST)
    public String guardar_reporte(@ModelAttribute("reporte_n") Reporte reporte){
        rp.save(reporte);
        return "redirect:/allreports";
    }

    @GetMapping("/allreports/{idreporte}")
    public ModelAndView editarreporte(@PathVariable(name = "idreporte") Long idreporte){
        ModelAndView modelo = new ModelAndView("editarreporte");
        Reporte reporte = rp.getReferenceByIdreporte(idreporte);
        modelo.addObject("reporte", reporte);
        return modelo;
    }

    @Transactional
    @GetMapping("/allreports/eliminarreporte/{idreporte}")
    public String eliminarreporte(@PathVariable(name="idreporte") Long idreporte){
        rp.deleteByIdreporte(idreporte);
        return "redirect:/allreports";
    }

    // @RequestMapping("/iniciosesion")
    // public String inicio_sesion(@ModelAttribute(name="username")String username, String password){
    //     var u=urp.findByUsername(username);
    //     Usuario us;
    //     try {
    //         us=u.get();
    //     } catch (Exception e) {
    //         us=new Usuario();
    //     }

    //     if(us.getUsername()==null){
    //         //error
    //         return "error_usuario";
    //     }
    //     else if(password.equals(us.getPassword())){
    //         // vista usuario
    //         return "vista_usuario";
    //     }
    //     else{
    //         //error
    //         return "error_usuario";
    //     }

    // }

    @RequestMapping("/login")
    public ModelAndView login(@ModelAttribute(name="username") String username, String password){
        var u=urp.findByUsername(username);
        Usuario us;
        ModelAndView modelo;
        try {
            us=u.get();
        } catch (Exception e) {
            us=new Usuario();
        }

        if(us.getUsername()==null){
            //error
            modelo=new ModelAndView("error_usuario");
            //return "redirect:/error_usuario";
        }
        else if(password.equals(us.getPassword())){
            // vista usuario
            modelo=new ModelAndView("logueado");
            modelo.addObject("username", us);
            //return "redirect:/logueado";
        }
        else{
            //error
            modelo=new ModelAndView("error_usuario");
            //return "redirect:/error_usuario";
        }
        return modelo;
    }

    @GetMapping("/index")
    public String index(){
        return "index";
    }
    
    @GetMapping("/iniciosesion")
    public String iniciosesion(){
        return "iniciosesion";
    }

    @GetMapping("/instrucciones")
    public String instrucciones(){
        return "instrucciones";
    }
    
    @GetMapping("/logueado")
    public String logueado(){
        return "logueado";
    }

    @GetMapping("/nosotros")
    public String nosotros(){
        return "nosotros";
    }

    @GetMapping("/registroUsuario")
    public String registroUsuario(){
        return "registroUsuario";
    }

    @GetMapping("/registro")
    public String registro(){
        return "registro";
    }

    @GetMapping("/logueadoIndex")
    public String logueadoIndex(){
        return "logueadoIndex";
    }

    @GetMapping("/logueadoNosotros")
    public String logueadoNosotros(){
        return "logueadoNosotros";
    }

    @GetMapping("/error_usuario")
    public String error_usuario(){
        return "error_usuario";
    }

    @GetMapping("/vista_usuario")
    public String vista_usuario(){
        return "vista_usuario";
    }

}
