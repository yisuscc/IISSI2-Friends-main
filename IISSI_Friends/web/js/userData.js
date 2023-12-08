"use strict";
import { messageRenderer } from "/js/renderers/messages.js"; // 5b. Renderizador de mensajes
import { userValidator } from "./validators/users.js"; // 6. Validador de la vista de registro de usuarios

import { sessionManager } from './utils/session.js';
import { usersAPI_auto } from "/js/api/_users.js ";
import { pictureswithusersAPI_auto } from "/js/api/_pictureswithusers.js ";
import { userswithhobbiesAPI_auto } from "/js/api/_userswithhobbies.js ";
import {cp_municipios_provincias} from "/js/data/cpmunicipiosProvincias.js";
const ProvinciaSet = new Set (cp_municipios_provincias.map ( (p)=> p.provincia));


let currentUser;
let userId;

async function main() {
	renderProvincias();
    document.getElementById("selectProvincia").onchange=function() {
        renderMunicipios(this.value);
    }
    document.getElementById("selectMunicipios").onchange=function() {
        renderCodigopostal(this.value);
    }
	userId = sessionManager.getLoggedId(); // Extrae el parámetro
	try {
		currentUser = await usersAPI_auto.getById(userId);
	} catch (error) {
		messageRenderer.showErrorAsAlert(error.message);
	}

	// Edición del user
	
	if (userId !== null) { loadCurrentUser(currentUser) };

	// Controlar el Submit del formulario
	let registerForm = document.getElementById("register-form");
	registerForm.onsubmit = handleSubmitUser; // Controlar submit

	//borrar
	let deleteBtn = document.getElementById("borro");
	deleteBtn.onclick = handleDeleteUser;

}


async function loadCurrentUser(currentUser) {
	let pageTitle = document.getElementById("page-title");  // Apuntar al título de la vista
	pageTitle.textContent = "Edita tus datos"; // Cambia el título
	// Recuperar inputs del formulario
	let usernameInput = document.getElementById("username-input");
	let emailInput = document.getElementById("email-input");
//	let dateOfBirthInput = document.getElementById("birthdate-input");
	let genderInput = document.getElementById("gender-input");
	let wheightInput = document.getElementById("wheight-input");
	let heightInput = document.getElementById("height-input");
	let selectColorPelo = document.getElementById("selectColorPelo");
	let selectColorOjo = document.getElementById("selectColorOjo");
	let bioInput = document.getElementById("bio-input");
	let streetInput = document.getElementById("street-input");
	let selectProvincia = document.getElementById("selectProvincia");
	let selectMunicipios = document.getElementById("selectMunicipios");
	let selectPostcode = document.getElementById("selectPostcode");

	// Recuperar datos del user con API_REST


	usernameInput.value = currentUser.username;
	emailInput.value = currentUser.email;
	//dateOfBirthInput.value = currentUser.dateOfBirth;
	genderInput.value = currentUser.gender;
	wheightInput.value = currentUser.wheight;
	heightInput.value = currentUser.height;
	selectColorPelo.value = currentUser.hairColor;
	selectColorOjo.value = currentUser.eyeColor;
	bioInput.value = currentUser.bio;
	streetInput.value = currentUser.address;
	selectProvincia.value = currentUser.province;
	renderMunicipios( currentUser.province );
	selectMunicipios.value = currentUser.municipality;
	renderCodigopostal(currentUser.municipality);
	selectPostcode.value = currentUser.postcode;

}

async function handleSubmitUser(event) {
	event.preventDefault(); // Cancelar submit
	let form = event.target;// Recuperar form
	let formData = new FormData(form); // Convertir en formData


	// Fecha de creación en formato mariaDB o bien poner DEFAULT en el CREATE TABLE
	// API REST para insertar nueva foto
	if (currentUser !== null) { // Editing a user
		formData.append("userId", currentUser.userId); // Updating an existing user
		formData.append("dateOfBirth", currentUser.dateOfBirth); // Mantiene la fecha de nacimiento
		formData.append("email", currentUser.email); // Mantiene el email
		formData.append("password", currentUser.password);
		formData.append("isActive", currentUser.isActive);
		try {
			await usersAPI_auto.update(formData, userId); // API REST para actualizar el user
			window.location.href = 'perfilPropio.html';
		} catch (err) { messageRenderer.showErrorAsAlert(err.message); }
	}
}

async function handleDeleteUser(event) {
	let allPhotosUser = await pictureswithusersAPI_auto.getAll();
	let allHobbiesUser = await userswithhobbiesAPI_auto.getAll();
	let soloPhotos = allPhotosUser.filter((u) => u.userId == userId);
	let soloHobbies = allHobbiesUser.filter((u) => u.userId == userId);
	console.log(( Object.keys(soloHobbies).length == 0));
	console.log(( Object.keys(soloPhotos).length == 0) );
	if ( ( Object.keys(soloHobbies).length == 0)&&( Object.keys(soloPhotos).length == 0) ) {
		try {
			await usersAPI_auto.delete(userId);
			sessionManager.logout();
			window.location = "/index.html"; //no sé
		} catch (err) {
			messageRenderer.showErrorAsAlert(err.message);
		}
	} else {
		let withdrawalDate = (new Date()).toISOString().replace("T", " ").replace("Z", " ");
console.log(withdrawalDate.valueOf() );
		let FormDataEliminar = new FormData();
		/*
		data.append("data", JSON.stringify(formData)) 
		*/

		console.log(currentUser);
		for (var key in currentUser) {
			if (key == "withdrawalDate") {
				FormDataEliminar.append("withdrawalDate", withdrawalDate);
			} else if (key == "isActive") {

				FormDataEliminar.append("isActive", 0);
			}
			else if (key == "registrationDate"|| key == "dateOfBirth") {
				// 
				console.log(currentUser[key]);
				let formatedDate =currentUser[key].replace("T", " ").replace("Z", " ");
				FormDataEliminar.append(key, formatedDate);
			}
			else {
				FormDataEliminar.append(key, currentUser[key]);
			}

		}
		 for (var pair of FormDataEliminar.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		} 


		try {
			await usersAPI_auto.update(FormDataEliminar, userId); // API REST para actualizar el user
			sessionManager.logout();
			window.location = "/index.html"; //no sé

		} catch (err) { messageRenderer.showErrorAsAlert(err.response.data.message); }



		//pone la withdrawalDate al dia actual y el isActive a false y cierra la sesíón
	} 
}
let MunicipioSet;

function renderProvincias() {
    let provincias = document.getElementById("selectProvincia");
    let html="";
     html += `<option value="" selected>Ninguno</option>`;
    for (let p of ProvinciaSet){
        html += `<option value="${p}">${p}</option>`;
    }
    provincias.innerHTML=html;
}
function renderMunicipios(provinciaSelected) {
    let municipios = document.getElementById("selectMunicipios");
   let MunicipioArray = cp_municipios_provincias.filter (m=> m.provincia === provinciaSelected);
    let MunicipioSet =[ ...new Set(MunicipioArray.map(m => m.municipio))];
    let html="";
    html += `<option value="" selected>Ninguno</option>`;
    for (let m of MunicipioSet){
        html += `<option value="${m}">${m}</option>`;
    }
    municipios.innerHTML=html;
}
let  CodigoPostalSet;
function renderCodigopostal(municipioSelected){
    let CodigoPostals = document.getElementById("selectPostcode");
    CodigoPostalSet = cp_municipios_provincias.filter (c=> c.municipio === municipioSelected);
    let html="";
    html += `<option value="" selected>Ninguno</option>`;
    for (let c of CodigoPostalSet){
        html += `<option value="${c.codigo_postal}">${c.codigo_postal}</option>`;
    }
    CodigoPostals.innerHTML=html;
}

document.addEventListener("DOMContentLoaded", main);
