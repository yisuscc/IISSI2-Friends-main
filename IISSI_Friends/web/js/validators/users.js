"use strict";
const userValidator= {
    validateRegister: function(fData) {
        let errors=[];
        document.getElementById("errors").innerHTML=" ";
        console.log(fData);
        if(fData.get("height")<0 || fData.get("wheight")<0) {
            errors.push("[Err_01] El peso y la altura no pueden adquirir valores negativos");
        }


        if(fData.get("password")!== fData.get("password2")) {
            errors.push("[Err_02] Las contraseñas deben coincidir");
        }
        let dAñoActual=new Date();
        let  nacimiento1= fData.get("dateOfBirth");
        let nacimiento = new Date(nacimiento1);
        //console.log(nacimiento1.valueOf());
        //console.log(nacimiento.getFullYear());
        console.log(dAñoActual.getFullYear());
        let  age= dAñoActual.getFullYear()-nacimiento.getFullYear();
     //   console.log(age.valueOf());
        let mes= dAñoActual.getMonth()-nacimiento.getMonth();
        if(age <18){
            errors.push("[Err_03] Tienes que ser mayor de edad para registrarte");
        }


        return errors;
    },
    validatePreferences:function(fData) {
        let errors=[];
        document.getElementById("errors").innerHTML=" ";
        console.log(fData);
        if (fData.get("min_age")<18) {
            errors.push("[Err_01] La edad mínima de preferencia ha de ser 18 años");
        
        }

        if(fData.get("min_height")> fData.get("max_height")) {
            errors.push("[Err_02] La estatura mínima no puede ser mayor a la estatura máxima");
        }

        if(fData.get("min_weight")> fData.get("max_weight")) {
            errors.push("[Err_03] El peso mínimo no puede ser mayor al peso máximo");
        }

        return errors;
    
    }   
};
 
export {userValidator } ;