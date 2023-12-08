import { galleryAlbumRenderer } from '/js/renderers/gallery_album.js';
import{messageRenderer} from "/js/renderers/messages.js";
import {pictureswithusersAPI_auto} from "/js/api/_pictureswithusers.js"
async function main() {
    loadAllPhotos();
    
}


async function loadAllPhotos() {
    let galleryContainer = document.querySelector("#recientes");
    try {
    let photosOrden = await pictureswithusersAPI_auto.getAll();
    console.log(photosOrden);
   let  pictures =   photosOrden.reverse();
   console.log(pictures);
    let cardGallery = galleryAlbumRenderer.asCardGallery(pictures);
    galleryContainer.appendChild(cardGallery);
    } catch (err) {
    messageRenderer.showErrorAsAlert("Error while loading photos", err);
    }
}
    document.addEventListener("DOMContentLoaded",main);
