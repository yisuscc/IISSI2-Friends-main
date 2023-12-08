"use strict";
import { parseHTML } from "/js/utils/parseHTML.js"; 
import{userswithhobbiesAPI_auto} from "/js/api/_userswithhobbies.js";
const aficionPropioRender = {
    asPill:  async function(userPropioId ){
        let todasAficionesUser = await userswithhobbiesAPI_auto.getAll();
        let soloUserPropio =  todasAficionesUser.filter((u) => u.userId == userPropioId);
        let todo= "";
        
         for (let hobby of soloUserPropio) {
          
            let afi = `<span  class="badge badge-pill badge-info" >${hobby.name}</span>`;
            todo +=afi;
        }
        let boton  =  `<a href="EditAficiones.html" class="btn btn-warning btn-sm  badge-pill badge-warning my-2" id ="edit-Btn-bio">Editar</a>`
        todo += boton;
        let aficionContainer =todo;

        

        return aficionContainer;
        
    }

}
export{aficionPropioRender};