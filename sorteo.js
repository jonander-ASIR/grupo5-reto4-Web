const logoLink = document.getElementById('logo-link');
const logoImg = document.getElementById('logo-img');

    if (logoLink && logoImg) {
        // Agrandar la imagen al pasar el raton
        logoLink.addEventListener('mouseover', () => {
            logoImg.style.transform = 'scale(1.1)'; // Aumenta 10%
        });

        // Volver al tamaño original al quitar el raton
        logoLink.addEventListener('mouseout', () => {
            logoImg.style.transform = 'scale(1.0)';
    });
}

$(document).ready(function() {
    // Oculta todos los submenús al cargar la página (si no está en CSS)
    $('nav ul li ul').hide(); 

    // Al pasar el ratón sobre un elemento de menú principal (li)
    $('nav > ul > li').hover(
        function() {
            // Despliega el primer submenú (ul) encontrado dentro del li
            $(this).find('ul:first').stop(true, true).slideDown(200);
        },
        function() {
            // Pliega el submenú al quitar el ratón
            $(this).find('ul:first').stop(true, true).slideUp(200);
        }
    );
});





// 1. Configuración de Pilotos, Premios e Imágenes
const pilotos = [
    "Max Verstappen", "Lando Norris", "Gabriel Bortoleto", "Isack Hadjar", 
    "Jack Doohan", "Pierre Gasly", "Andrea Kimi Antonelli", "Fernando Alonso", 
    "Charles Leclerc", "Lance Stroll", "Yuki Tsunoda", "Alex Albon", 
    "Nico Hulkenberg", "Liam Lawson", "Esteban Ocon", "Franco Colapinto", 
    "Lewis Hamilton", "Carlos Sainz", "George Russell", "Oscar Piastri", 
    "Oliver Bearman"
];

const premios = {
    '1º Puesto': 5000,
    '2º Puesto': 2000,
    '3º Puesto': 1000
};

// Objeto que mapea nombres de pilotos a URLs de imágenes (reemplazar con las rutas reales)
const pilotosImages = {
    "Max Verstappen": "imagenes/pilotos/max-verstappen.webp",
    "Lewis Hamilton": "imagenes/pilotos/lewis-hamilton.webp",
    "Charles Leclerc": "imagenes/pilotos/charles-leclerc.webp",
    "Fernando Alonso": "imagenes/pilotos/fernando-alonso.webp",
    "Lando Norris": "imagenes/pilotos/lando-norris.webp",
    "Carlos Sainz": "imagenes/pilotos/carlos-sainz.webp",
    "George Russell": "imagenes/pilotos/george-russell.webp",
    "Oscar Piastri": "imagenes/pilotos/oscar-piastri.webp",
    "Pierre Gasly": "imagenes/pilotos/pierre-gasly.webp",
    "Lance Stroll": "imagenes/pilotos/lance-stroll.webp",
    "Yuki Tsunoda": "imagenes/pilotos/yuki-tsunoda.webp",
    "Gabriel Bortoleto": "imagenes/pilotos/gabriel-bortoleto.webp", 
    "Isack Hadjar": "imagenes/pilotos/isack-hadjar.webp",
    "Jack Doohan": "imagenes/pilotos/jack-doohan.webp",
    "Andrea Kimi Antonelli": "imagenes/pilotos/andrea-kimi-antonelli.webp",
    "Alex Albon": "imagenes/pilotos/alex-albon.webp",
    "Nico Hulkenberg": "imagenes/pilotos/nico-hulkenberg.webp",
    "Liam Lawson": "imagenes/pilotos/liam-lawson.webp",
    "Esteban Ocon": "imagenes/pilotos/esteban-ocon.webp",
    "Franco Colapinto": "imagenes/pilotos/franco-colapinto.webp",
    "Oliver Bearman": "imagenes/pilotos/oliver-bearman.webp",
};

const selectores = document.querySelectorAll('.piloto-select');
const OPCION_INICIAL = "Selecciona...";

// 2. Funciones de Llenado Dinámico y Evitar Repetición (Uso de DOM)

function llenarSelect(selectElement, pilotosDisponibles, valorSeleccionado = "") {
    selectElement.innerHTML = ''; 

    // 1. Añade la opción inicial "Selecciona..."
    const defaultOption = document.createElement('option');
    defaultOption.value = OPCION_INICIAL;
    defaultOption.textContent = OPCION_INICIAL;
    defaultOption.disabled = true;
    if (valorSeleccionado === OPCION_INICIAL || valorSeleccionado === "") {
        defaultOption.selected = true;
    }
    selectElement.appendChild(defaultOption); // Añade el nodo al DOM

    // 2. Añade los pilotos disponibles
    pilotosDisponibles.forEach(piloto => {
        const option = document.createElement('option'); // Creación de nodos
        option.value = piloto;
        option.textContent = piloto;
        
        if (piloto === valorSeleccionado) {
            option.selected = true;
        }
        selectElement.appendChild(option);
    });
}

function actualizarDesplegables() {
    // Obtiene los valores actuales (Selectores del DOM)
    const seleccionados = Array.from(selectores)
        .map(select => select.value)
        .filter(val => val !== OPCION_INICIAL);

    selectores.forEach(currentSelect => {
        const valorActual = currentSelect.value;
        
        const pilotosParaEsteSelect = pilotos.filter(piloto => 
            !seleccionados.includes(piloto) || 
            piloto === valorActual 
        );

        llenarSelect(currentSelect, pilotosParaEsteSelect, valorActual);
    });
}

// 3. Lógica de Sorteo y Visualización del Podio (Uso de DOM)

function realizarSorteo() {
    let pilotosSorteo = [...pilotos];
    const podio = {};
    
    for (let i = 1; i <= 3; i++) {
        const indiceAleatorio = Math.floor(Math.random() * pilotosSorteo.length);
        const ganador = pilotosSorteo.splice(indiceAleatorio, 1)[0]; 
        podio[`puesto${i}`] = ganador;
    }
    return podio;
}

function mostrarPodio(podio) {
    // Uso del selector y manipulación del contenido (como se explica en el PDF)
    const podioRealDiv = document.getElementById('ganadores-oficiales'); 
    podioRealDiv.innerHTML = '';

    for (let i = 1; i <= 3; i++) {
        const puesto = `puesto${i}`;
        const piloto = podio[puesto];
        
        const puestoDiv = document.createElement('div');
        puestoDiv.style.flex = '1';
        puestoDiv.style.maxWidth = '150px';
        
        const h4 = document.createElement('h4');
        h4.textContent = `${i}º Puesto`;
        h4.style.color = i === 1 ? 'gold' : i === 2 ? 'silver' : '#cd7f32';
        
        const img = document.createElement('img');
        img.src = pilotosImages[piloto] || 'placeholder.png'; 
        img.alt = piloto;
        img.style.width = '100%';
        img.style.maxWidth = '100px'; 
        img.style.height = '100px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '50%';
        img.style.border = '3px solid';
        img.style.borderColor = h4.style.color;

        const p = document.createElement('p');
        p.textContent = piloto;
        p.style.fontWeight = 'bold';
        
        puestoDiv.appendChild(h4);
        puestoDiv.appendChild(img);
        puestoDiv.appendChild(p);
        podioRealDiv.appendChild(puestoDiv);
    }
}

// 4. Inicialización y Event Listeners (Uso de DOM)

document.addEventListener('DOMContentLoaded', () => {
    actualizarDesplegables();

    // Listener para la funcionalidad "sin repetición"
    selectores.forEach(select => {
        select.addEventListener('change', actualizarDesplegables);
    });

    // Listener del botón de Comprobar Sorteo
    document.getElementById('btn-comprobar-sorteo').addEventListener('click', () => {
        // Acceso a las propiedades del nodo del DOM (value)
        const p1Usuario = document.getElementById('puesto1').value;
        const p2Usuario = document.getElementById('puesto2').value;
        const p3Usuario = document.getElementById('puesto3').value;

        // Comprobación de selección inicial
        if (p1Usuario === OPCION_INICIAL || p2Usuario === OPCION_INICIAL || p3Usuario === OPCION_INICIAL) {
            alert("Por favor, selecciona un piloto para cada uno de los 3 puestos antes de comprobar el sorteo.");
            return;
        }

        // 1. Realizar el sorteo
        const podioOficial = realizarSorteo();
        
        // 2. Comprobar aciertos y calcular premios
        let aciertos = [];
        let fallos = [];
        let premioTotal = 0;

        const puestosOficiales = {
            'puesto1': podioOficial.puesto1,
            'puesto2': podioOficial.puesto2,
            'puesto3': podioOficial.puesto3
        };

        // Comprobación de los puestos
        if (p1Usuario === puestosOficiales.puesto1) {
            aciertos.push({ puesto: '1º Puesto', piloto: p1Usuario, premio: premios['1º Puesto'] });
            premioTotal += premios['1º Puesto'];
        } else {
            fallos.push('1º Puesto');
        }

        if (p2Usuario === puestosOficiales.puesto2) {
            aciertos.push({ puesto: '2º Puesto', piloto: p2Usuario, premio: premios['2º Puesto'] });
            premioTotal += premios['2º Puesto'];
        } else {
            fallos.push('2º Puesto');
        }

        if (p3Usuario === puestosOficiales.puesto3) {
            aciertos.push({ puesto: '3º Puesto', piloto: p3Usuario, premio: premios['3º Puesto'] });
            premioTotal += premios['3º Puesto'];
        } else {
            fallos.push('3º Puesto');
        }
        
        // 3. Mostrar el podio oficial
        mostrarPodio(podioOficial);
        document.getElementById('resultado-sorteo').style.display = 'block';

        // 4. Generar y mostrar el mensaje de aciertos/premios
        const mensajeDiv = document.getElementById('mensaje-aciertos');
        let htmlMensaje = '<h4>Resultado de tu pronóstico:</h4>';
        
        if (aciertos.length > 0) {
            htmlMensaje += '<p style="color: #008000; font-weight: bold;">¡Felicidades! Has acertado:</p><ul>';
            aciertos.forEach(acierto => {
                htmlMensaje += `<li>✅ ${acierto.puesto} con ${acierto.piloto}. Premio: ${acierto.premio.toLocaleString('es-ES')} €</li>`;
            });
            htmlMensaje += `</ul><p style="margin-top: 10px; font-size: 1.1em; font-weight: bold; background-color: #5f5f5fff; padding: 5px; border-radius: 3px;">🏆 PREMIO TOTAL ACUMULADO: ${premioTotal.toLocaleString('es-ES')} € 🏆</p>`;
        } else {
            htmlMensaje += '<p style="color: #cc0000; font-weight: bold;"> Lo sentimos, no has acertado ningún puesto.</p>';
        }

        if (fallos.length > 0 && fallos.length < 3) {
            htmlMensaje += `<p style="margin-top: 15px;">❌ Puestos no acertados: ${fallos.join(', ')}.</p>`;
        }

        // Modificación del nodo mensaje-aciertos (innerHTML)
        mensajeDiv.innerHTML = htmlMensaje;
    });
});