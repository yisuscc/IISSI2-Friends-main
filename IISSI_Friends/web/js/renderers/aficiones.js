"use strict";
import { parseHTML } from "/js/utils/parseHTML.js"; 
import{userswithhobbiesAPI_auto} from "/js/api/_userswithhobbies.js";
const aficionRender = {
    asPill:  async function(userAjenoId ){
        let todasAficionesUser = await userswithhobbiesAPI_auto.getAll();
        let soloUser =  todasAficionesUser.filter((u) => u.userId == userAjenoId);// creo que el === porque el userID de la base de datos lo da conmo un string o alreves
        let todo= "";
        
         for (let hobby of soloUser) {
          
            let afi = `<span  class="badge badge-pill badge-info" >${hobby.name}</span>`;
            todo +=afi;
        }
        let aficionContainer =todo;
        

        return aficionContainer;
        
    }

}
export{aficionRender};