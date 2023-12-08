"use strict";
import { sessionManager } from "/js/utils/session.js";

function main() {
    muestraUsuario();
    ocultaOpciones(); 
    añadeCierreSesion();
   
}


function muestraUsuario() {
    
    let titulo = document.getElementById("desplegable") ;
    let nombre;
    if (sessionManager.isLogged()) {
        nombre= `  <a class="nav-link dropdown-toggle"  title= "Mi perfil"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fa fa-user" aria-hidden="true"> </i>
        <span id="NombreUserNav"> ${sessionManager.getLoggedUser().username}</span>
        
      </a>
      <div class="dropdown-menu  dropdown-menu-right" aria-labelledby="navbarDropdown" id="divDesplegable" >
          <!-- TO-DO los enlaces-->
        <a class="dropdown-item" id="preferenciasDesplegable" title="Mi perfil" href="perfilPropio.html"> Mi perfil</a>
        <a class="dropdown-item" id="datosDesplegable" title="Mis datos" href="userData.html" >  Mis datos</a>
        <a class="dropdown-item" id="aficionesDesplegable" title="Mis aficiones" href="EditAficiones.html" >  Mis aficiones</a>

        <div class="dropdown-divider"></div>
        <a class= "dropdown-item "  title="Cerrar sesión" href= "#" id="cerrarSesionDesplegable">
          <i class="fa fa-sign-out" aria-hidden="true"></i>  Cerrar sesión
      </a> 
        `
        
    } else {
        
        nombre = ` <span><i class="fa fa-user"></i> Anónimo</span>`;

    }
    titulo.innerHTML = nombre ;

}
function ocultaOpciones(params) {
    // cogeos los elementos
    let iniciaSesion = document.getElementById("navbar-login");
    let register = document.getElementById("navbar-register");
    let conversaciones  = document.getElementById("navbar-Conversaciones"); 
    let subirFotos= document.getElementById("navbar-Foto");
    //decidimos que hacer si el usuario ha iniciado sesión o no 
    if (sessionManager.isLogged()) {
        iniciaSesion.style.display ="none";
        register.style.display = "none";
        
    } else {
            conversaciones.style.display= "none";
            subirFotos.style.display = "none";
    }
   
   
   
}

function  añadeCierreSesion() {
     // 1 seleciona el elemento hatml 
    // añade el escuchador de eventos 
    let botonCierre = document.getElementById("cerrarSesionDesplegable");
    botonCierre.addEventListener("click" ,function(){
        sessionManager.logout();
        alert("Sesión Cerrada");
        window.location.href = "index.html"; 
    });
}


document.addEventListener("DOMContentLoaded", main);