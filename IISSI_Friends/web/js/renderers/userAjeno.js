"use strict";

import { parseHTML } from "/js/utils/parseHTML.js"; 
 const userAjenoRenderer = {
    asJumbo:function(user){
        let userContainer = parseHTML(`        <div class="container">
        <h1 class="jumbotron-heading">${user.username}</h1>
        <p class="lead text-muted"> ${user.bio}  </p>
      </div>`);
      return userContainer;
    }
 }
export{userAjenoRenderer};
