import {obtenerJugadores} from './api.js'
document.addEventListener('DOMContentLoaded', async ()=>{
    const player1 = document.querySelector("#player1");
    const player2 = document.querySelector("#player2");
    const player3 = document.querySelector("#player3");
    const player4 = document.querySelector("#player4");
    const player5 = document.querySelector("#player5");
    
    const puntaje1 = document.querySelector("#puntaje1");
    const puntaje2 = document.querySelector("#puntaje2");
    const puntaje3 = document.querySelector("#puntaje3");
    const puntaje4 = document.querySelector("#puntaje4");
    const puntaje5 = document.querySelector("#puntaje5");
    console.log(player1);
    obtenerJugadores();
/*     const [nombre1, nombre2, nombre3, nombre4, nombre5] = top5Jugadores.map(jugador => jugador.usuario);
    const [puntajeMax1, puntajeMax2, puntajeMax3, puntajeMax4, puntajeMax5] = top5Jugadores.map(jugador => jugador.puntaje); */

/*     console.log(nombre1, nombre2, nombre3, nombre4, nombre5);
    console.log(puntajeMax1, puntajeMax2, puntajeMax3, puntajeMax4, puntajeMax5); */
})


