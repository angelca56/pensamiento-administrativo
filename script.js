let faseActual = 0;
let puntuacion = 0;
let timer;
let tiempoRestante = 30;

const etapas = [
    {
        titulo: "Planificación",
        descripcion: "¿Cuál es el primer paso en la planificación?",
        opciones: [
            { texto: "Comprar insumos", siguienteFase: 1, feedback: "Incorrecto. Eso no forma parte de la planificación inicial.", puntos: 0, color: "red" },
            { texto: "Definir objetivos", siguienteFase: 1, feedback: "¡Correcto! Los objetivos son la base de la planificación.", puntos: 20, color: "green" },
            { texto: "Ver una película", siguienteFase: 1, feedback: "Completamente incorrecto.", puntos: -5, color: "red" },
            { texto: "Contratar personal", siguienteFase: 1, feedback: "Incorrecto. Primero se definen los objetivos.", puntos: 5, color: "yellow" }
        ]
    },
    {
        titulo: "Organización",
        descripcion: "¿Cómo organizas un equipo de trabajo?",
        opciones: [
            { texto: "Hacer que todos trabajen en todo", siguienteFase: 2, feedback: "No es eficiente, genera caos.", puntos: 5, color: "yellow" },
            { texto: "Hacer una fiesta", siguienteFase: 2, feedback: "Esto no tiene nada que ver con organización.", puntos: -5, color: "red" },
            { texto: "Definir roles y responsabilidades", siguienteFase: 2, feedback: "¡Correcto! Así se evita confusión.", puntos: 20, color: "green" },
            { texto: "Dejar que cada uno haga lo que quiera", siguienteFase: 2, feedback: "Incorrecto. Se necesita estructura.", puntos: 0, color: "red" }
        ]
    },
    {
        titulo: "Dirección",
        descripcion: "¿Cómo motivarías al equipo?",
        opciones: [
            { texto: "Ignorar al equipo", siguienteFase: 3, feedback: "Incorrecto. La dirección requiere atención.", puntos: 0, color: "red" },
            { texto: "Brindar incentivos y reconocimiento", siguienteFase: 3, feedback: "¡Bien! Motivar es clave en la dirección.", puntos: 20, color: "green" },
            { texto: "Jugar videojuegos en el trabajo", siguienteFase: 3, feedback: "Completamente fuera de lugar.", puntos: -5, color: "red" },
            { texto: "Dar órdenes sin explicación", siguienteFase: 3, feedback: "No es una buena forma de liderazgo.", puntos: 5, color: "yellow" }
        ]
    },
    {
        titulo: "Control",
        descripcion: "¿Cómo evaluarías el desempeño del equipo?",
        opciones: [
            { texto: "Preguntar cómo se sienten", siguienteFase: -1, feedback: "Útil, pero no suficiente.", puntos: 5, color: "yellow" },
            { texto: "No hacer nada", siguienteFase: -1, feedback: "Incorrecto. Evaluar es fundamental.", puntos: 0, color: "red" },
            { texto: "Hacer una carrera de autos", siguienteFase: -1, feedback: "No tiene nada que ver con control.", puntos: -5, color: "red" },
            { texto: "Revisar KPIs y métricas", siguienteFase: -1, feedback: "¡Correcto! Es la mejor manera de medir resultados.", puntos: 20, color: "green" }
        ]
    }
];

function iniciarSimulador() {
    faseActual = 0;
    puntuacion = 0;
    document.getElementById("resultado").innerHTML = "";
    mostrarFase();
}

function mostrarFase() {
    const fase = etapas[faseActual];
    document.getElementById("fase").innerHTML = `<h2>${fase.titulo}</h2><p>${fase.descripcion}</p>`;
    document.getElementById("opciones").innerHTML = "";
    document.getElementById("temporizador").style.display = "block";
    resetearTemporizador();
    iniciarTemporizador();

    fase.opciones.forEach(opcion => {
        const boton = document.createElement("button");
        boton.innerText = opcion.texto;
        boton.className = "opcion";
        boton.onclick = () => tomarDecision(opcion);
        document.getElementById("opciones").appendChild(boton);
    });

    document.getElementById("feedback").style.display = "none";
    document.getElementById("siguiente").style.display = "none";
}

function tomarDecision(opcion) {
    puntuacion += opcion.puntos;
    clearInterval(timer);
    document.getElementById("temporizador").style.display = "none";

    // Cambiar el texto del feedback
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.innerHTML = `${opcion.feedback} <br>Puntuación actual: ${puntuacion}`;
    feedbackElement.style.display = "block";

    // Limpiar clases de color antes de asignar la nueva
    feedbackElement.classList.remove("correcto", "incorrecto", "media-correcta");

    // Asignar clase según el color de la respuesta
    if (opcion.color === "green") {
        feedbackElement.classList.add("correcto");
    } else if (opcion.color === "red") {
        feedbackElement.classList.add("incorrecto");
    } else if (opcion.color === "yellow") {
        feedbackElement.classList.add("media-correcta");
    }

    document.getElementById("opciones").innerHTML = "";
    document.getElementById("siguiente").style.display = "block";

    // Cambiar color del temporizador según la respuesta
    document.getElementById("temporizador").style.backgroundColor = opcion.color;
}


function siguienteFase() {
    faseActual++;
    if (faseActual >= etapas.length) {
        document.getElementById("resultado").innerHTML = `¡Simulación terminada! Puntuación final: ${puntuacion}`;
    } else {
        mostrarFase();
    }
}

function resetearTemporizador() {
    tiempoRestante = 30;
    document.getElementById("temporizador").style.backgroundColor = "green";  // Inicialmente verde
}

function iniciarTemporizador() {
    timer = setInterval(() => {
        document.getElementById("temporizador").innerHTML = `Tiempo restante: ${tiempoRestante}s`;
        
        // Cambiar el color del temporizador según el tiempo restante
        if (tiempoRestante <= 10) {
            document.getElementById("temporizador").style.backgroundColor = "red";
        } else if (tiempoRestante <= 20) {
            document.getElementById("temporizador").style.backgroundColor = "orange";
        } else {
            document.getElementById("temporizador").style.backgroundColor = "green";
        }

        tiempoRestante--;

        if (tiempoRestante < 0) {
            clearInterval(timer);
            tomarDecision({ texto: "Tiempo agotado", siguienteFase: faseActual, feedback: "¡Se acabó el tiempo!", puntos: 0, color: "red" });
        }
    }, 1000);
}

window.onload = iniciarSimulador;
