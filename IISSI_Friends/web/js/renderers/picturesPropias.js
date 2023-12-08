"use strict";
 import {parseHTML}from "/js/utils/parseHTML.js";

 const picturePropiaRenderer={
     asCard: function(picture) {
         let html = `<div class="col-md-4">
         <div class="card mb-4 box-shadow">
           <img class="card-img-top img-thumbnail card-image" id="photo-card"  src ="${picture.pictureURL}" alt="${picture.description}" title="${picture.name}"> </img>
           <div class="card-body">
           <p class ="card-title text-center" id ="name-card"><h5>${picture.name} </h5> </p>
             <p class="card-text" id ="description-photo">${picture.description}</p>
             <div class="d-flex justify-content-between align-items-center">
             <button id="button-edit" class="btn btn-primary" onclick=" window.location.href = 'editPhoto.html?pictureId=' + ${picture.pictureId};">Editar</button>

             <button id="button-delete" class="btn btn-danger" onclick="window.location.href = 'deletePhoto.html?pictureId=' + ${picture.pictureId};">Borrar</button>

             
             </div>
           </div>
         </div>
       </div>
         `;
let card = parseHTML(html);
return card;      
     }
 };
 export {picturePropiaRenderer};