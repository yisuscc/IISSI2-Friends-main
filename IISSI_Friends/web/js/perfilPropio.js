"use strict";

import{usersAPI_auto} from "/js/api/_users.js";
import{messageRenderer} from "/js/renderers/messages.js";
import {parseHTML}from "/js/utils/parseHTML.js";
import{picturesAPI_auto} from "/js/api/_pictures.js";
import { galleryPropiaAlbumRenderer} from "/js/renderers/galleryPropio.js";
import{userPropioRenderer} from "/js/renderers/userPropio.js";
import {sessionManager} from "/js/utils/session.js";
import {aficionPropioRender} from "/js/renderers/aficionesPropio.js";

async function main() {
    if(sessionManager.isLogged()) {

        await loadUserPropio(sessionManager.getLoggedId());
        await loadFotosPropias(sessionManager.getLoggedId());
    } else {
        alert("Debes haber iniciado sesión antes");
        window.location="/login.html";
    }  

}

async function loadUserPropio(userPropioId) {
    let userPropioContainer = document.querySelector("#jumboUserPropio");
    let aficionesPropioContainer= document.querySelector("#aficionesUserPropioJumbo");
    try {
        let usuarioPropio=  await usersAPI_auto.getById(userPropioId);
        let  UserRenderizado = userPropioRenderer.asJumbo(usuarioPropio);
        userPropioContainer.appendChild(UserRenderizado);

        let aficionesPropio= await aficionPropioRender.asPill(userPropioId);
        aficionesPropioContainer.innerHTML= aficionesPropio;
    } catch(error) {
        messageRenderer.showErrorAsAlert("Error a la hora de cargar el usuario", error);
    }
}




async function loadFotosPropias(userPropioId) {
    let picturesPropiasContainer = document.querySelector("#galeriaPropia");
    try {
        let picturesPropias = await picturesAPI_auto.getAll();
        let picturesPropiasFiltradas = (picturesPropias.filter((p)=> p.userId == userPropioId)).reverse();
        let  picturesPropiasGallery = galleryPropiaAlbumRenderer.asCardGallery(picturesPropiasFiltradas);
        picturesPropiasContainer.appendChild(picturesPropiasGallery);
        
    } catch (error) {
        messageRenderer.showErrorAsAlert("Error al cargar las fotos, prueba a recargar la página", error);
    }
}
document.addEventListener("DOMContentLoaded",main);                                             