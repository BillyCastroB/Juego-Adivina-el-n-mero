const url = 'http://localhost:4000/jugadores';

export const agregarUsuario = async usuario =>{
    try {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            }
        })        
    } catch (error) {
        console.log(error)
    }

    console.log(usuario);
}


//obtener lista de jugadores
export const obtenerJugadores = async function(){
    try {
        const resultado = await fetch(url);
        const jugadores = await resultado.json();
        jugadores.sort((a, b) => b.puntaje - a.puntaje);

        // Tomar los primeros 5 jugadores con puntajes más altos y nombres diferentes
        const top5Jugadores = [];
        const nombresUtilizados = new Set();
        for (const jugador of jugadores) {
            if (top5Jugadores.length === 5) {
                break;
            }
            if (!nombresUtilizados.has(jugador.usuario)) {
                top5Jugadores.push(jugador);
                nombresUtilizados.add(jugador.usuario);
            }
        }

        console.log("Los 5 jugadores con puntajes más altos y nombres diferentes son:", top5Jugadores);

        // Extraer los nombres y los puntajes de los jugadores
        const [nombre1, nombre2, nombre3, nombre4, nombre5] = top5Jugadores.map(jugador => jugador.usuario);
        const [puntajeMax1, puntajeMax2, puntajeMax3, puntajeMax4, puntajeMax5] = top5Jugadores.map(jugador => jugador.puntaje);
        console.log(nombre1, nombre2, nombre3, nombre4, nombre5);
        console.log(puntajeMax1, puntajeMax2, puntajeMax3, puntajeMax4, puntajeMax5);

        console.log(player1);
        player1.textContent = nombre1;
        puntaje1.textContent = puntajeMax1;
        player2.textContent = nombre2;
        puntaje2.textContent = puntajeMax2;
        player3.textContent = nombre3;
        puntaje3.textContent = puntajeMax3;
        player4.textContent = nombre4;
        puntaje4.textContent = puntajeMax4;
        player5.textContent = nombre5;
        puntaje5.textContent = puntajeMax5;



        return top5Jugadores;
    } catch (error) {
        console.log(error);
    }
}
