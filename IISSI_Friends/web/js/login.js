import { authAPI } from './api/auth.js';
import { sessionManager } from './utils/session.js';
import { messageRenderer } from './renderers/messages.js';
 const formInicio = document.getElementById("login-form");
 document.getElementById("errors").innerHTML = " "; 
async function main(formInicio) {
    document.getElementById("errors").innerHTML = " "; //para que el siempre esté limpio de errores y no se acumulen 
    compobador();
    formInicio.addEventListener("submit", envioForm)
}
async function compobador() {
    // si hay una sesio abierta la cierra  (util para pruebas); 
    
    if (sessionManager.isLogged()) {
        sessionManager.logout (); 
     alert("Se ha cerrado la sesión previa");
    }
}
async function envioForm(event) {
    document.getElementById("errors").innerHTML = ""; 
    event.preventDefault();  //paramos el envio del formulario
   let formChulo = new FormData(formInicio);
    try {
        
        let datosInicio =await authAPI.login(formChulo);
        let sessionToken = datosInicio.sessionToken;
        let usuarioIniciado = datosInicio.user;
        sessionManager.login(sessionToken,usuarioIniciado);
        window.location.href = "index.html";
    } catch (error) {document.getElementById("errors").innerHTML = " "; 
        messageRenderer.showErrorAsAlert ("Error al iniciar sesion"+ error.response.data.message );
    }
    
}
 document.addEventListener("DOMContentLoaded" ,main(formInicio));