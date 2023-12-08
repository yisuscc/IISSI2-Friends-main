"use strict";
import {parseHTML}from "/js/utils/parseHTML.js";
import{userAjenoRenderer} from "/js/renderers/userAjeno.js";
import{usersAPI_auto} from "/js/api/_users.js";
import{messageRenderer} from "/js/renderers/messages.js";
import{picturesAPI_auto} from "/js/api/_pictures.js";
import { galleryAjenaAlbumRenderer} from "/js/renderers/galleryAjena.js";
import {userswithhobbiesAPI_auto}from "/js/api/_userswithhobbies.js";
import { aficionRender } from "./renderers/aficiones.js";
import { sessionManager } from "/js/utils/session.js";
 
async function main(){
  
    let urlParams = new URLSearchParams(window.location.search);
    let userAjenoId = urlParams.get("userId");
    let userLogged = sessionManager.getLoggedId();
    if(userAjenoId == userLogged){
        window.location.href = 'perfilPropio.html';
    }
    await loadUserAjeno(userAjenoId);
    await loadFotosAjenas(userAjenoId);
}
async function loadUserAjeno(userAjenoId){
    let userAjenoContainer = document.querySelector("#jumboUserAjeno");
    let aficionesContainer = document.querySelector("#aficionesUserJumbo");

    try {
         let usuarioAjeno=  await usersAPI_auto.getById(userAjenoId);

      let  UserRenderizado =    userAjenoRenderer.asJumbo(usuarioAjeno);
      userAjenoContainer.appendChild(UserRenderizado );
   

      let aficiones =  await aficionRender.asPill(userAjenoId);
      aficionesContainer.innerHTML = aficiones;


    } catch (error) {
        messageRenderer.showErrorAsAlert("Error a la hora de cargar el usuario", error);
        
    }

}
async function loadFotosAjenas(userAjenoId){
    let picturesAjenasContainer = document.querySelector("#galeriaAjena");
    try {
        let picturesAjenas = await picturesAPI_auto.getAll();
        let picturesAjenasFiltradas = (picturesAjenas.filter((p)=> p.userId == userAjenoId)).reverse();
        let  picturesAjenasGallery = galleryAjenaAlbumRenderer.asCardGallery(picturesAjenasFiltradas);
        picturesAjenasContainer.appendChild(picturesAjenasGallery);


    } catch (error) {
        messageRenderer.showErrorAsAlert("Error al cargar las fotos, prueba a recargar la página", error);
    }

    
}
document.addEventListener("DOMContentLoaded",main);