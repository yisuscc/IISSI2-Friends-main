"use strict";
 import {parseHTML}from "/js/utils/parseHTML.js";

 const pictureAjenaRenderer={
     asCard: function(picture) {
         let html = `<div class="col-md-4">
         <div class="card mb-4 box-shadow">
           <img class="card-img-top img-thumbnail card-image embed-responsive-item"" id="photo-card"  src ="${picture.pictureURL}" alt="${picture.description}" title="${picture.name}"> </img>
           <div class="card-body">
           <p class ="card-title text-center" id ="name-card"><h5>${picture.name} </h5> </p>
             <p class="card-text" id ="description-photo">${picture.description}</p>
             <div class="d-flex justify-content-between align-items-center">
           
             </div>
           </div>
         </div>
       </div>
         `;
let card = parseHTML(html);
return card;
        
     }
 };
 export {pictureAjenaRenderer};