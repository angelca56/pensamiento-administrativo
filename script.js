let faseActual = 0;
let puntuacion = 0;
let timer;
let tiempoRestante = 30;

const etapas = [
    {
        titulo: "Planificación",
        descripcion: "¿Cuál es el primer paso en la planificación?",
        opciones: [
            { texto: "Definir objetivos", siguienteFase: 1, feedback: "¡Correcto! Los objetivos son la base de la planificación.", puntos: 20, color: "green" },
            { texto: "Analizar el entorno externo e interno", siguienteFase: 1, feedback: "¡Correcto! Es necesario conocer el entorno para una buena planificación.", puntos: 20, color: "green" },
            { texto: "Establecer una estrategia sin analizar riesgos", siguienteFase: 1, feedback: "Incorrecto. Se deben evaluar oportunidades y riesgos.", puntos: -5, color: "red" },
            { texto: "No predefinir objetivos", siguienteFase: 1, feedback: "Incorrecto. Sin objetivos claros no hay rumbo en la planificación.", puntos: -5, color: "red" }
        ]
    },
    {
        titulo: "Organización",
        descripcion: "¿Qué función es crucial en la organización para evitar la duplicidad de funciones?",
        opciones: [
            { texto: "División del trabajo", siguienteFase: 2, feedback: "¡Correcto! La división del trabajo mejora la eficiencia.", puntos: 20, color: "green" },
            { texto: "Jerarquización", siguienteFase: 2, feedback: "Esto ayuda a establecer niveles de autoridad, pero la división del trabajo es clave.", puntos: 3, color: "yellow" },
            { texto: "Falta de roles definidos", siguienteFase: 2, feedback: "Incorrecto. No tener roles claros genera caos en la organización.", puntos: -5, color: "red" },
            { texto: "Unificar todas las tareas en un solo departamento", siguienteFase: 2, feedback: "Esto no es efectivo, crea confusión y reduce la especialización.", puntos: -5, color: "red" }
        ]
    },
    {
        titulo: "Integración",
        descripcion: "¿Cuál es una función clave de la integración en la organización?",
        opciones: [
            { texto: "Reclutamiento y selección de personal", siguienteFase: 3, feedback: "¡Correcto! Elegir el perfil adecuado es crucial para el éxito organizacional.", puntos: 20, color: "green" },
            { texto: "Asignación de recursos materiales", siguienteFase: 3, feedback: "¡Correcto! Los recursos materiales son fundamentales para el rendimiento.", puntos: 20, color: "green" },
            { texto: "Reemplazar a personal sin evaluar su desempeño", siguienteFase: 3, feedback: "Incorrecto. El personal debe ser evaluado y entrenado, no simplemente reemplazado.", puntos: -5, color: "red" },
            { texto: "Dejar de capacitar al personal", siguienteFase: 3, feedback: "Incorrecto. La capacitación es clave para un buen desempeño.", puntos: -5, color: "red" }
        ]
    },
    {
        titulo: "Dirección",
        descripcion: "¿Qué característica de la dirección administrativa es esencial para garantizar el éxito organizacional?",
        opciones: [
            { texto: "Conducción de la organización", siguienteFase: 4, feedback: "¡Correcto! Los gerentes deben tomar decisiones claves para cumplir con los objetivos.", puntos: 20, color: "green" },
            { texto: "Evaluación del desempeño constante", siguienteFase: 4, feedback: "Esto es importante, pero la dirección efectiva empieza con la toma de decisiones.", puntos: 3, color: "yellow" },
            { texto: "No tomar decisiones importantes", siguienteFase: 4, feedback: "Incorrecto. La dirección sin decisiones no tiene rumbo.", puntos: -5, color: "red" },
            { texto: "No contar con un liderazgo claro", siguienteFase: 4, feedback: "Incorrecto. El liderazgo es clave para guiar al equipo hacia los objetivos.", puntos: -5, color: "red" }
        ]
    },
    {
        titulo: "Control",
        descripcion: "¿Cuál es una etapa importante en el proceso de control?",
        opciones: [
            { texto: "Establecimiento de estándares", siguienteFase: -1, feedback: "¡Correcto! Los estándares definen lo que se espera en términos de rendimiento.", puntos: 20, color: "green" },
            { texto: "Revisión de los reportes sin compararlos con los estándares", siguienteFase: -1, feedback: "Incorrecto. Comparar el desempeño con los estándares es esencial para el control.", puntos: -5, color: "red" },
            { texto: "Tomar decisiones sin medir el desempeño", siguienteFase: -1, feedback: "Incorrecto. La medición es fundamental antes de tomar decisiones correctivas.", puntos: -5, color: "red" },
            { texto: "Monitoreo constante de los recursos", siguienteFase: -1, feedback: "Correcto, es necesario mantener un seguimiento continuo.", puntos: 3, color: "yellow" }
        ]
    }
];

function mezclarRespuestas(opciones) {
    for (let i = opciones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
    }
}

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

    // Mezclamos las respuestas
    mezclarRespuestas(fase.opciones);

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

    const feedbackElement = document.getElementById("feedback");
    feedbackElement.innerHTML = `${opcion.feedback} <br>Puntuación actual: ${puntuacion}`;
    feedbackElement.style.display = "block";

    feedbackElement.classList.remove("correcto", "incorrecto", "media-correcta");

    if (opcion.color === "green") {
        feedbackElement.classList.add("correcto");
    } else if (opcion.color === "red") {
        feedbackElement.classList.add("incorrecto");
    } else if (opcion.color === "yellow") {
        feedbackElement.classList.add("media-correcta");
    }

    document.getElementById("opciones").innerHTML = "";
    document.getElementById("siguiente").style.display = "block";

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
    document.getElementById("temporizador").style.backgroundColor = "green";
}

function iniciarTemporizador() {
    timer = setInterval(() => {
        document.getElementById("temporizador").innerHTML = `Tiempo restante: ${tiempoRestante}s`;

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
