let sonido1 = new Audio('./src/sounds/sound1.mp3');
let sonido2 = new Audio('./src/sounds/sound2.mp3');
let sonido3 = new Audio('./src/sounds/sound3.mp3');
let sonido4 = new Audio('./src/sounds/sound4.mp3');

const btnFacil = document.querySelector("#facil");
const btnMedio = document.querySelector("#medio");
const btnDificil = document.querySelector("#dificil");

const inputFacil = document.querySelector("#opcion1");
const inputMedio = document.querySelector("#opcion2");
const inputDificil = document.querySelector("#opcion3");

const inputNombre = document.querySelector("#usuario");
inputNombre.addEventListener('click', ()=>{
    sonido1.play();
})
btnFacil.addEventListener('click', ()=>{
    inputFacil.checked = true;
    sonido2.play();
})
btnMedio.addEventListener('click', ()=>{
    inputMedio.checked = true;
    sonido3.play();
})
btnDificil.addEventListener('click', ()=>{
    inputDificil.checked = true;
    sonido4.play();
})