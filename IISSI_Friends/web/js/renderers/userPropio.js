"use strict";

import { parseHTML } from "/js/utils/parseHTML.js"; 
 const userPropioRenderer = {
    asJumbo:function(user){
        let userContainer = parseHTML(`        <div class="container">
        <h1 class="jumbotron-heading">${user.username}</h1>
        <p class="lead text-muted"> ${user.bio}  </p>
        <a href="userData.html" class="btn btn-warning   my-2" id ="edit-Btn-bio">Editar</a>
        
      </div>`);
      return userContainer;
    }
 }
export{userPropioRenderer};
