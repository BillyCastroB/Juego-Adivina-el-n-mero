import { agregarUsuario, obtenerJugadores } from "./api";

(() => {
    let numeroRandom; 
    let numeroJugador = document.querySelector("#numeroJuego");
    const form = document.querySelector("#formulario");
    const divResultado = document.querySelector("#box-resultado");
    let puntaje = 0;
    let intentos = 2;
    const btnIntento = document.querySelector("#intento");
    const btnReinicioJuego = document.querySelector("#reinciarJuego");
    const mensajeJuego = document.querySelector(".mensajeJuego");
    const JugadorActual = document.querySelector(".jugadorActual");
    const JugadorActualenTabla = document.querySelector("#jugador1");
    const puntajejugador = document.querySelector("#puntajejugador1");
    const panel = document.querySelector("#panelJuego");

    btnReinicioJuego.addEventListener('click', reiniciarJuego);

    form.addEventListener('submit', async e => { 

        e.preventDefault();
        const usuario = document.querySelector("#usuario").value;
        const panelInicio = document.querySelector("#panelInicio");
        const panelJuego = document.querySelector("#panelJuego");
        const alerta = document.querySelector(".alerta");

        //validando usuario
        if (usuario === "") {
            if (!alerta) {
                //creando mensaje de alerta si no pasa validacion
                const alerta = document.createElement('div');
                alerta.classList.add('text-2xl', 'alerta', 'text-white', 'my-2', 'px-3', 'rounded-lg', 'bg-red-700', 'font-bold');
                alerta.textContent = "usuario no valido";
                form.appendChild(alerta);
                setTimeout(() => {
                    alerta.remove();
                }, 2000)
            }
            return;
        }

        const jugador = {
            usuario,
            puntaje: 0
        }

        JugadorActual.innerHTML = jugador.usuario;
        JugadorActualenTabla.innerHTML = jugador.usuario;
        puntajejugador.innerHTML= jugador.puntaje;

        //funcionamiento de juego==

        //crear un numero random
        generarNumero();


        //verificar dificultad
        if (document.querySelector("#opcion1").checked) {
            panel.classList.add('borde-verde');
            panel.classList.remove('border-cyan-700');
            btnIntento.addEventListener('click', () => {
                comprobarResultadoEnFacil(jugador);
            })
        } else if (document.querySelector("#opcion2").checked) {
            panel.classList.add('borde-azul');
            panel.classList.remove('border-cyan-700');
            btnIntento.addEventListener('click', () => {
                comprobarResultadoEnMedio(jugador);
            })
        } else {
            panel.classList.add('borde-rojo');
            panel.classList.remove('border-cyan-700');
            btnIntento.addEventListener('click', () => {
                comprobarResultadoEnDificil(jugador);
            })
        }

        panelInicio.classList.add("hidden");
        panelJuego.classList.remove("hidden");

/*         //imprimir lista de jugadores
        const listaJugadores = await obtenerJugadores();
        console.log(listaJugadores); */
    })

    function generarNumero() {
        numeroRandom = parseInt((Math.random() * 9) + 1); 
    }

    function comprobarResultadoEnFacil(jugador) {
        if (numeroRandom === parseInt(numeroJugador.value)) {
            limpiarMensaje();
            const mensajeJuego = document.createElement('div');
            mensajeJuego.classList.add('font-kaushan' ,'text-2xl', 'text-white', 'font-bold', 'text-center');
            mensajeJuego.textContent = "FELICIDADES ACERTASTE!!";
            divResultado.appendChild(mensajeJuego);
            deshabilitarBtnIntento();
            habilitarReinicio();
            aumentarPuntajeNivelFacil(jugador);
            imprimirPuntaje(jugador);
        }else{
            mensajeDesaciertoEnFacil();
        }
        numeroJugador.value = "";
        numeroJugador.focus();
    }
    function comprobarResultadoEnMedio(jugador) {
        limpiarMensaje();
        if(numeroRandom === parseInt(numeroJugador.value)) {
            mensajeAcierto();
            deshabilitarBtnIntento();
            habilitarReinicio();
            aumentarPuntajeMedio(jugador);
            imprimirPuntaje(jugador);
        }else{
            mensajeDesaciertoEnMedio();
        }
        numeroJugador.value="";
        numeroJugador.focus();
    }
    function comprobarResultadoEnDificil(jugador) {
        if (numeroRandom == numeroJugador.value) {
            limpiarMensaje();
            mensajeAcierto();
            habilitarReinicio();
            aumentarPuntajeDificil(jugador);
            imprimirPuntaje(jugador);
        }else{
            mensajeDesaciertoEnDificil();
        }
        numeroJugador.value="";
        numeroJugador.focus();
    }
    function deshabilitarBtnIntento(){
        btnIntento.disabled = true;
        btnIntento.classList.add('opacity-20', 'bg-red-400', 'text-lg');
        btnIntento.classList.remove('bg-indigo-700', 'hover:bg-indigo-500');
        btnIntento.textContent = "sin intentos";
    }
    function deshabilitarReinicio(){
        btnReinicioJuego.disabled = true;
        btnReinicioJuego.classList.add('opacity-10');
    }
    function habilitarReinicio(){
        btnReinicioJuego.removeAttribute('disabled');
        btnReinicioJuego.classList.remove('opacity-10');
        deshabilitarBtnIntento();
    }
    function habilitarBtnIntento(){
        btnIntento.disabled = false;
        btnIntento.classList.add('bg-indigo-700');
        btnIntento.classList.remove('opacity-20', 'bg-red-400');
        btnIntento.textContent = "intentar";
    }
    function reiniciarJuego(){
        generarNumero();
        deshabilitarReinicio();
        habilitarBtnIntento();
        limpiarMensaje();
        intentos = 2;
    }
    function mensajeAcierto(){
        const mensajeJuego = document.createElement('div');
            mensajeJuego.classList.add('font-kaushan' ,'text-2xl', 'text-white', 'font-bold', 'text-center');
            mensajeJuego.textContent = "correcto!! adivinaste el número secreto";
            divResultado.appendChild(mensajeJuego);
    }
    function mensajeDesaciertoEnFacil(){

        if(numeroJugador.value > numeroRandom){
            limpiarMensaje();
            const textoDesaciertoEnFacil = document.createElement('div');
            textoDesaciertoEnFacil.classList.add('text-white', 'text-center', 'text-2xl');
            textoDesaciertoEnFacil.textContent = "el número es menor!";
            divResultado.appendChild(textoDesaciertoEnFacil);
        }else{
            limpiarMensaje();
            const textoDesaciertoEnFacil = document.createElement('div');
            textoDesaciertoEnFacil.classList.add('text-white', 'text-center', 'text-2xl');
            textoDesaciertoEnFacil.textContent = "el número es mayor!";
            divResultado.appendChild(textoDesaciertoEnFacil);
        } 
        
    }
    function mensajeDesaciertoEnMedio(){
        if(intentos === 0){
            limpiarMensaje();
            deshabilitarBtnIntento();
            const textoDesaciertoEnFacil = document.createElement('div');
            textoDesaciertoEnFacil.innerHTML = `<p class="texto-rojo font-bold text-center text-2xl">Te quedaste sin intentos :( </p>`;
            divResultado.appendChild(textoDesaciertoEnFacil);
            habilitarReinicio();
            return;
        }
        if(numeroJugador.value > numeroRandom){
            limpiarMensaje();
            intentos--;
            const textoDesaciertoEnFacil = document.createElement('div');
            textoDesaciertoEnFacil.textContent = `el número es menor! le quedan ${intentos +1} intentos`;
            textoDesaciertoEnFacil.classList.add('text-white', 'text-center', 'text-2xl');
            divResultado.appendChild(textoDesaciertoEnFacil);
            
        }else{
            limpiarMensaje();
            intentos--;
            const textoDesaciertoEnFacil = document.createElement('div');
            textoDesaciertoEnFacil.textContent = `el número es mayor! le quedan ${intentos+1} intentos`;
            textoDesaciertoEnFacil.classList.add('text-white', 'text-center', 'text-2xl');
            divResultado.appendChild(textoDesaciertoEnFacil);
            
        } 
    }
    
    function mensajeDesaciertoEnDificil(){
        if(intentos === 0){
            limpiarMensaje();
            habilitarReinicio();
            deshabilitarBtnIntento();
            const textoDesaciertoEnFacil = document.createElement('div');
            textoDesaciertoEnFacil.innerHTML = `<p class="texto-rojo font-bold text-center text-2xl">Te quedaste sin intentos :( </p>`;
            divResultado.appendChild(textoDesaciertoEnFacil);
            return;
        }
        intentos = intentos - 1;
        if(parseInt(numeroJugador.value) > numeroRandom){  
            if(parseInt(numeroJugador.value)-numeroRandom===1 ||parseInt(numeroJugador.value)-numeroRandom===2){
                limpiarMensaje();
                const textoDesaciertoEnFacil = document.createElement('div');
                textoDesaciertoEnFacil.classList.add('text-white', 'text-center');
                textoDesaciertoEnFacil.innerHTML = `el número es menor, le queda 1 <span class="texto-verde">intento</span>`;
                divResultado.appendChild(textoDesaciertoEnFacil);
                intentos--;
            }else if(parseInt(numeroJugador.value)-numeroRandom===3 || parseInt(numeroJugador.value)-numeroRandom===4){
                limpiarMensaje();
                const textoDesaciertoEnFacil = document.createElement('div');
                textoDesaciertoEnFacil.classList.add('text-white', 'text-center');
                textoDesaciertoEnFacil.innerHTML = `el número es menor, le queda 1 <p class="text-blue-600">intento</p>`;
                divResultado.appendChild(textoDesaciertoEnFacil);
                intentos--;
            }else{
                limpiarMensaje();
                const textoDesaciertoEnFacil = document.createElement('div');
                textoDesaciertoEnFacil.classList.add('text-white', 'text-center');
                textoDesaciertoEnFacil.innerHTML = `el número es menor, le queda 1 <p class="texto-rojo">intento</p>`;
                divResultado.appendChild(textoDesaciertoEnFacil);
                intentos--;
            }
        }else{
            if(numeroRandom-parseInt(numeroJugador.value)===1 || numeroRandom-parseInt(numeroJugador.value)===2){
                limpiarMensaje();
                const textoDesaciertoEnFacil = document.createElement('div');
                textoDesaciertoEnFacil.classList.add('text-white', 'text-center');
                textoDesaciertoEnFacil.innerHTML = `el número es mayor, le queda 1 <p class="texto-verde">intento</p>`;
                divResultado.appendChild(textoDesaciertoEnFacil);
                intentos--;
            }else if(numeroRandom-parseInt(numeroJugador.value)===3 || numeroRandom-parseInt(numeroJugador.value)===4){
                limpiarMensaje();
                const textoDesaciertoEnFacil = document.createElement('div');
                textoDesaciertoEnFacil.classList.add('text-white', 'text-center');
                textoDesaciertoEnFacil.innerHTML = `el número es mayor, le queda 1 <p class="text-blue-600">intento</p>`;
                divResultado.appendChild(textoDesaciertoEnFacil);
                intentos--;
            }else{
                limpiarMensaje();
                const textoDesaciertoEnFacil = document.createElement('div');
                textoDesaciertoEnFacil.classList.add('text-white', 'text-center');
                textoDesaciertoEnFacil.innerHTML = `el número es mayor, le queda 1 <p class="texto-rojo">intento</p>`;
                divResultado.appendChild(textoDesaciertoEnFacil);
                intentos--;
            }
        }
    }
    //limpiar mensajes 
    function limpiarMensaje(){
        while(divResultado.firstChild){
            divResultado.removeChild(divResultado.firstChild);
        }
    }

    //aumentar puntaje
    function aumentarPuntajeNivelFacil(jugador){
        puntaje+=2;
        actualizarPuntaje(jugador, puntaje);
    }
    function aumentarPuntajeMedio(jugador){
        puntaje+=5;
        actualizarPuntaje(jugador, puntaje);
    }
    function aumentarPuntajeDificil(jugador){
        puntaje+=8;
        actualizarPuntaje(jugador, puntaje);
    }
    async function actualizarPuntaje(jugador, nuevoPuntaje) {
        // Verificar si el jugador existe y si el nuevo puntaje es un número
        if (jugador) {
            // Actualizar el puntaje del jugador
            jugador.puntaje = nuevoPuntaje;
        } else {
            console.log('Error al actualizar el puntaje del jugador.');
        }
        await agregarUsuario(jugador);
        await obtenerJugadores();
    }
    function imprimirPuntaje(jugador){
        puntajejugador.textContent = jugador.puntaje;
    }
    //enviar puntajes al objeto y al archivo json

})()