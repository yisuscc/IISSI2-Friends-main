"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js"; 
import {preferencecardAPI_auto} from "/js/api/_preferencecard.js";
import { sessionManager } from './utils/session.js';

document.addEventListener ("DOMContentLoaded", async function() { // Al cargar el documento
    document.getElementById("preferences-form").onsubmit = async function(event) { // manejador del Submit
	console.log(event.target);
        let formData = new FormData (event.target); // Se transforma en formData (Array JSON), por comodidad
        console.log(formData); // Inhibir el submit
        event.preventDefault(); 
        let errors = userValidator.validatePreferences(formData); // 5b. Ejecutar el validador
        // Si hay errores, se presentan los mensajes
        if ( errors.length > 0) {
            document.getElementById ("errors").innerHTML=""; // Se tiene que añadir a preferencias.html
            messageRenderer.showErrorAsAlert("<small>"+errors.join("; &emsp; ")+"</small>");
            swal("¡Oooops!","No se ha enviado su ficha de preferencias. Por favor, revise los datos introducidos","error");
        } else  { 
            sendPreferences(formData);
        }
    };
})
async function sendPreferences(formData) { // 6. Registro del nuevo usuario
    try {   let loginData = await authAPI.register(formData);
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "index.html"; // Al inicio para mostrar usuario conectado
    } catch (error) {
        messageRenderer.showErrorAsAlert ("Error while sign Up: "+ error.response.data.message );
    }
}