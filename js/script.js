const pantallaMusica = document.getElementById("pantallaMusica");
const btnConMusica = document.getElementById("btnConMusica");
const btnSinMusica = document.getElementById("btnSinMusica");
const musicaFondo = document.getElementById("musicaFondo");

const botonAbrir = document.getElementById("btnAbrir");
const portada = document.getElementById("portada");
const invitacion = document.getElementById("invitacion");

const diasElemento = document.getElementById("dias");
const horasElemento = document.getElementById("horas");
const minutosElemento = document.getElementById("minutos");
const segundosElemento = document.getElementById("segundos");

const btnAgenda = document.getElementById("btnAgenda");
const btnCopiarAlias = document.getElementById("btnCopiarAlias");
const aliasMercadoPago = "flor.588";



/* Pantalla inicial: música */

function ingresarALaInvitacion(conMusica) {
    pantallaMusica.style.display = "none";

    if (conMusica) {
        musicaFondo.volume = 0.35;

        musicaFondo.play().catch(function () {
            console.log("No se pudo reproducir la música.");
        });
    }
}

btnConMusica.addEventListener("click", function () {
    ingresarALaInvitacion(true);
});

btnSinMusica.addEventListener("click", function () {
    ingresarALaInvitacion(false);
});

/* Abrir invitación */

botonAbrir.addEventListener("click", function () {
    portada.style.display = "none";
    invitacion.style.display = "flex";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* Contador regresivo */

const fechaEvento = new Date("December 19, 2026 21:00:00").getTime();

function agregarCero(numero) {
    return String(numero).padStart(2, "0");
}

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {
        document.querySelector(".contador").innerHTML =
            "<p>¡El gran día llegó!</p>";

        clearInterval(contador);
        return;
    }

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferencia % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const segundos = Math.floor(
        (diferencia % (1000 * 60)) /
        1000
    );

    diasElemento.textContent = agregarCero(dias);
    horasElemento.textContent = agregarCero(horas);
    minutosElemento.textContent = agregarCero(minutos);
    segundosElemento.textContent = agregarCero(segundos);
}

const contador = setInterval(actualizarContador, 1000);

actualizarContador();

/* Agendar evento */

btnAgenda.addEventListener("click", function () {
    const eventoCalendario =
        "BEGIN:VCALENDAR\r\n" +
        "VERSION:2.0\r\n" +
        "BEGIN:VEVENT\r\n" +
        "DTSTART:20261212T210000\r\n" +
        "DTEND:20261213T010000\r\n" +
        "SUMMARY:Mis XV - Flor\r\n" +
        "LOCATION:Salón Los Jardines\r\n" +
        "DESCRIPTION:Mis XV años de flor\r\n" +
        "END:VEVENT\r\n" +
        "END:VCALENDAR";

    const archivo = new Blob(
        [eventoCalendario],
        { type: "text/calendar;charset=utf-8" }
    );

    const enlace = document.createElement("a");
    const urlArchivo = URL.createObjectURL(archivo);

    enlace.href = urlArchivo;
    enlace.download = "mis-xv-flor.ics";

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(urlArchivo);
});

/* Copiar alias de Mercado Pago */

function cambiarTextoBoton() {
    const textoOriginal = btnCopiarAlias.textContent;

    btnCopiarAlias.textContent = "¡Alias copiado!";

    setTimeout(function () {
        btnCopiarAlias.textContent = textoOriginal;
    }, 2000);
}

btnCopiarAlias.addEventListener("click", function () {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(aliasMercadoPago)
            .then(cambiarTextoBoton)
            .catch(copiarAliasAlternativo);
    } else {
        copiarAliasAlternativo();
    }
});

function copiarAliasAlternativo() {
    const campoTemporal = document.createElement("textarea");

    campoTemporal.value = aliasMercadoPago;
    document.body.appendChild(campoTemporal);

    campoTemporal.select();
    document.execCommand("copy");

    campoTemporal.remove();
    cambiarTextoBoton();
}
