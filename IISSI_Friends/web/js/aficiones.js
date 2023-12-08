"use strict";

import { sessionManager } from './utils/session.js';
import {  hobbiesAPI_auto } from "/js/api/_hobbies.js";
import{ userhobbiesAPI_auto } from "/js/api/_userhobbies.js";
import { parseHTML } from "/js/utils/parseHTML.js";

let userId = sessionManager.getLoggedId(); 
async function main(){
    rellenaAficiones();
    let botonadd = document.getElementById("buttonadd");
    botonadd.onclick = onclickbotonadd;
   



};
async function onclickbotonadd(event){
    event.preventDefault();
    let inputaficion1 = document.getElementById("aficion1");
    let formData = new FormData();
    formData.append("name", inputaficion1.value);

    try{
        let resp = await hobbiesAPI_auto.create(formData);
        console.log(resp);
    }catch(err){
        console.log(err);
    }
    window.location.reload();
};
async function onsubmitbotonsave(event){
 
    event.preventDefault();
    let container = document.getElementById("checkboxes");
/*     for(let checkbox of container.childNodes){
       
        if(checkbox.checked == true){
            console.log(checkbox);
            let hobbyId = checkbox.id;
            alert("xd");
            let userId = sessionManager.getLoggedId(); 
            try{
                let formData = new FormData();
                formData.append("userId",userId);
                formData.append("hobbyId",hobbyId.value);
                let resp = await userhobbiesAPI_auto.create(formData);
                console.log(resp);
            }catch(err){
                console.log(err);
            }
        }
    } */
    let  data = [...document.querySelectorAll('.checkVoxe:checked')];

    for(let check of data){
        try{
            let hobbyId = check.id;
            let formData = new FormData();
            formData.append("userId",userId);
            formData.append("hobbyId",hobbyId);
            let resp = await userhobbiesAPI_auto.create(formData);
            console.log(resp);
        }catch(err){
            console.log(err);
        }
    }
    window.location.href ='addPhoto.html';
    console.log(data);
}

async function rellenaAficiones(){
let checkboxContainer = document.getElementById("hobbyCheck");
let html1 = `
<div class="form-group" id="checkboxes">
</div>
`;
let html1parse = parseHTML(html1);
checkboxContainer.appendChild(html1parse);
aux();
};

async function aux(){
    let container = document.getElementById("checkboxes");
    let hobbies = await hobbiesAPI_auto.getAll();
    for (let hobby of hobbies) {
        let html = `
        <div>
        <input type="checkbox" class ="checkVoxe" id="${hobby.hobbyId}" value="${hobby.hobbyId}" name="${hobby.hobbyId}">
        <label for="${hobby.hobbyId}">${hobby.name}</label>
        </div>
        `
        let input = parseHTML(html);
        container.appendChild(input);
    }
};
document.addEventListener("DOMContentLoaded",main);
document.addEventListener("submit",onsubmitbotonsave);
