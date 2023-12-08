"use strict";
import {cp_municipios_provincias} from "/js/data/cpmunicipiosProvincias.js";
const ProvinciaSet = new Set (cp_municipios_provincias.map ( (p)=> p.provincia));

function main() {

    renderProvincias();
    renderMunicipios([ ...ProvinciaSet.keys() ][0]   );
    renderCodigopostal();
    document.getElementById("selectProvincia").onchange=function() {
        renderMunicipios(this.value);
    }
    document.getElementById("selectMunicipios").onchange=function() {
        renderCodigopostal(this.value);
    }
    
}


//Extraer provincia 
let MunicipioSet;

function renderProvincias() {
    let provincias = document.getElementById("selectProvincia");
    let html="";
     html += `<option value="" selected>Ninguno</option>`;
    for (let p of ProvinciaSet){
        html += `<option value="${p}">${p}</option>`;
    }
    provincias.innerHTML=html;
}
function renderMunicipios(provinciaSelected) {
    let municipios = document.getElementById("selectMunicipios");
   let MunicipioArray = cp_municipios_provincias.filter (m=> m.provincia === provinciaSelected);
    let MunicipioSet =[ ...new Set(MunicipioArray.map(m => m.municipio))];
    let html="";
    html += `<option value="" selected>Ninguno</option>`;
    for (let m of MunicipioSet){
        html += `<option value="${m}">${m}</option>`;
    }
    municipios.innerHTML=html;
}
let  CodigoPostalSet;
function renderCodigopostal(municipioSelected){
    let CodigoPostals = document.getElementById("selectPostcode");
    CodigoPostalSet = cp_municipios_provincias.filter (c=> c.municipio === municipioSelected);
    let html="";
    html += `<option value="" selected>Ninguno</option>`;
    for (let c of CodigoPostalSet){
        html += `<option value="${c.codigo_postal}">${c.codigo_postal}</option>`;
    }
    CodigoPostals.innerHTML=html;
}
document.addEventListener("DOMContentLoaded",main);