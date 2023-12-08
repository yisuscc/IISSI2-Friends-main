"use strict ";
import{picturesAPI_auto} from "/js/api/_pictures.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";

// Captura el parámetro pictureId de la URL que figura en el link de cada foto
const urlParams = new URLSearchParams(window.location.search); // Objeto query de la ventana
const pictureId = urlParams.get('pictureId'); // Extrae el parámetro
let currentPhoto = null; // Para controlar Inserción o edición

async function main() {
	document.getElementById ("errors").innerHTML=""; 
	if (!sessionManager.isLogged()) {
		alert ("No puede añadir fotos si no está autorizado!");
		window.location.href = `index.html`; // Cancelar edición si no está autorizado
	} 
	
	if (pictureId !== null) {
		document.getElementById ("errors").innerHTML=""; 
		 loadCurrentPhoto(); } // Edición de la foto
	
	let registerForm = document.getElementById("formulario-foto");
	registerForm.onsubmit = handleSubmitPhoto;
}

async function loadCurrentPhoto() {
	let titulo = document.getElementById("titulo"); 
	let myURL = document.getElementById("myURL");
	let comment = document.getElementById("comment");
	
	titulo.textContent = "Editando una foto";
	try {
		currentPhoto = await picturesAPI_auto.getById(pictureId);
		myURL.value = currentPhoto.pictureURL;
		titulo.value = currentPhoto.name;
		comment.value = currentPhoto.description;

	} 	catch (err) {
		document.getElementById ("errors").innerHTML=" "; 
		messageRenderer.showErrorAsAlert(err.response.data.message);
		}
}

async function handleSubmitPhoto(event) {
	event.preventDefault(); // Cancelar submit
	let form = event.target; // Recuperar form
	let formData = new FormData(form); // Convertir en formData
	if (currentPhoto === null) { // Creating a new photo
		formData.append("userId", sessionManager.getLoggedUser().userId); // Add the current user ID
		let ahora = (new Date()).toISOString().replace("T"," ").replace("Z"," "); // Fecha de creación en formato mariaDB
		formData.append("date", ahora); // Add the current date
		try { 	let resp = await picturesAPI_auto.create(formData); // API REST para insertar nueva foto
				let newId = resp.lastId; // Id de la foto añadida
				window.location.href = `perfilPropio.html`; // Ver la foto añadida
		} catch (err) { 
			document.getElementById ("errors").innerHTML=""; 
			messageRenderer.showErrorAsAlert(err.response.data.message); }
	} else { 	
		formData.append("userId", currentPhoto.userId); // Updating an existing photo
		formData.append("date", currentPhoto.date); // Mantiene la fecha de creación
		try {	
			await picturesAPI_auto.update(formData, pictureId); // API REST para actualizar la foto
			window.location.href = `perfilPropio.html`;
		} catch (err) { 
			document.getElementById ("errors").innerHTML=""; 
			messageRenderer.showErrorAsAlert(err.response.data.message); }
	}
}

document.addEventListener ("DOMContentLoaded", main ); // Manejador de eventos. Cuando se carga totalmente