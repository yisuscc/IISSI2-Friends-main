"use strict";
import{picturesAPI_auto} from "/js/api/_pictures.js";
import { messageRenderer } from "/js/renderers/messages.js";
// import { sessionManager } from "/js/utils/session.js";
import { pictureAjenaRenderer } from "/js/renderers/picturesAjenas.js";
const urlParams = new URLSearchParams(window.location.search); // Objeto query de la ventana
const pictureId = urlParams.get('pictureId'); // Extrae el parámetro

async function main () {
 
    cargaFoto(pictureId);
    let buttonDelete = document.getElementById("btnBorrar");
    buttonDelete.addEventListener("click",async function(){
     let answer = confirm("¿Seguro que desea eliminar la foto?");
     if (answer) {
     try {
     await picturesAPI_auto.delete(pictureId);
     window.location = "/perfilPropio.html";
     } catch (err) {
     messageRenderer.showErrorAsAlert(err.response.data.message);
     }
  }
    });
    handledelete(pictureId);

}
async function cargaFoto(pId){
    try {
        let  fotoContainer=   document.getElementById("cardPhotoDelete");
        let  foto = await picturesAPI_auto.getById(pId);
         fotoContainer.appendChild(pictureAjenaRenderer.asCard(foto));
    } catch (error) {
        messageRenderer.showErrorAsAlert(error.response.data.message);
    }


}






document.addEventListener("DOMContentLoaded", main())
