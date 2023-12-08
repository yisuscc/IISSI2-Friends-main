"use strict";
import { messageRenderer } from "/js/renderers/messages.js"; // 5b. Renderizador de mensajes
import { userValidator } from "/js/validators/users.js"; // 6. Validador de la vista de registro de usuarios
import { authAPI } from './api/auth.js';
import { sessionManager } from './utils/session.js';

document.addEventListener ("DOMContentLoaded", async function() { // Al cargar el documento
    document.getElementById("register-form").onsubmit = async function(event) { // manejador del Submit
	console.log(event.target);
        let formData = new FormData (event.target); // Se transforma en formData (Array JSON), por comodidad
        console.log(formData);
		event.preventDefault(); // Inhibir el submit
        let errors = userValidator.validateRegister(formData); // 5b. Ejecutar el validador
        // Si hay errores, se presentan los mensajes
        if ( errors.length > 0) {
            document.getElementById ("errors").innerHTML=""; // Se tiene que añadir a register.html
            messageRenderer.showErrorAsAlert("<small>"+errors.join("; &emsp; ")+"</small>");
            swal("¡Oooops!","No se ha enviado el formulario. Por favor, revise los datos introducidos","error");
        } else  {    // 5a. Se envía el formulario al servidor  messageRenderer.showSuccessAsAlert("Todo Ok!\nSe envía el formulario al servidor!");
                    sendRegister(formData); // 6. Se envía el formulario al servidor.
        }
    };
})

async function sendRegister(formData) { // 6. Registro del nuevo usuario
    try {   
       let data =( new Date).toISOString().replace("T", " ").replace("Z", " ");
       formData.append("registrationDate" ,data);
        let loginData = await authAPI.register(formData);
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "aficiones.html"; // Al inicio para mostrar usuario conectado
    } catch (error) {
        messageRenderer.showErrorAsAlert ("Error while sign Up: "+ error.response.data.message );
    }
}