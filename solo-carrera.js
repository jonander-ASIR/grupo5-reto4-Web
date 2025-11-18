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






$(document).ready(function() {

    // --- 1. Funciones de Validación ---
    // Función para validar DNI (ej: 12345678A)
    function validarDNI(dni) {
        const regexDNI = /^\d{8}[a-zA-Z]$/;
        return regexDNI.test(dni);
    }

    // Función para validar Email
    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    // --- 2. Regla de Edad en Tiempo Real y Bloqueo de Botones ---
    function validarReglaEdadEnTiempoReal() {
        const edad = parseInt($('#edad').val());
        const tipo = $('#tipo_entrada').val(); 
        let errorRegla = false;
        // let mensaje = ''; // Esta variable no se usa para mostrar mensajes, solo para la lógica

        // Regla Adulto: edad < 18 (y edad > 0 para evitar error al inicio)
        if (tipo === 'adulto' && edad > 0 && edad < 18) {
            errorRegla = true;
            // mensaje = "ERROR: Una entrada 'Adulto' requiere tener 18 años o más.";
        // Regla Infantil: edad >= 18
        } else if (tipo === 'infantil' && edad >= 18) {
            errorRegla = true;
            // mensaje = "ERROR: Una entrada 'Infantil' requiere tener menos de 18 años.";
        }
        
        const $btnCalcular = $('#btn-calcular-precio'); 
        const $btnComprar = $('#btn-comprar'); 
        const condicionesAceptadas = $('#acepta_condiciones').is(':checked'); 

        if (errorRegla) {
            // Si hay error de regla, se deshabilitan Calcular y Comprar
            $btnCalcular.prop('disabled', true);
            $btnComprar.prop('disabled', true);
            $('#precio').val('Error de Edad');
        } else {
            // Si no hay error, se habilitan Calcular y Comprar (dependiendo de condiciones)
            $btnCalcular.prop('disabled', false);
            $btnComprar.prop('disabled', !condicionesAceptadas);
        }
    }
    
    // Eventos que disparan la validación en tiempo real
    $('#edad, #tipo_entrada').on('change blur', validarReglaEdadEnTiempoReal);

    // --- 3. Cálculo de Precio (Botón) ---
    $('#btn-calcular-precio').on('click', function() { 
        // Primero, aseguramos que no haya un error de edad
        if ($(this).prop('disabled')) {
             $('#precio').val('Error de Edad');
             return;
        }
        
        const tipo = $('#tipo_entrada').val(); 
        const zona = $('#zona').val(); 
        let precio = 0;

        if (tipo === 'infantil') {
            precio = 30; 
        } else if (tipo === 'adulto') {
            if (zona === 'zona1') {
                precio = 80; 
            } else if (zona === 'zona2') {
                precio = 60; 
            }
        }
        
        if (precio > 0) {
            $('#precio').val(precio + '€'); 
        } else {
            $('#precio').val('Incompleto');
        }
    });

    // --- 4. Activación del Botón Comprar (Acepto Condiciones) ---
    $('#acepta_condiciones').on('change', function() { 
        const errorDeReglaActivo = $('#btn-calcular-precio').prop('disabled');
        
        if ($(this).is(':checked') && !errorDeReglaActivo) {
             $('#btn-comprar').prop('disabled', false); 
        } else {
             $('#btn-comprar').prop('disabled', true); 
        }
    });

    // --- 5. Validación Final y Envío (Con Alerta Detallada) ---
    $('#form-entradas').on('submit', function(e) {
        e.preventDefault(); 

        const dni = $('#dni').val().trim();
        const email = $('#email').val().trim();
        const edadStr = $('#edad').val().trim(); 
        const tipoEntrada = $('#tipo_entrada').val(); 
        const precioFinal = $('#precio').val(); 
        const aceptoCondiciones = $('#acepta_condiciones').is(':checked'); 

        let errores = [];
        const edadNum = parseInt(edadStr);

        // Validación de campos obligatorios
        const requiredFields = ['#dni', '#email', '#edad', '#tipo_entrada', '#zona']; 
        requiredFields.forEach(selector => {
            if (!$(selector).val()) {
                // Se capitaliza el nombre del campo para el mensaje
                const campoNombre = selector.substring(1).replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                errores.push(`El campo '${campoNombre}' es obligatorio.`);
            }
        });

        // Solo validamos formatos y reglas si los campos obligatorios están rellenos
        if (errores.length === 0) { 
            // Validación de formato DNI
            if (!validarDNI(dni)) {
                errores.push("El campo 'DNI' debe tener el formato adecuado (Ej: 12345678A).");
            }
            
            // Validación de formato Email
            if (!validarEmail(email)) {
                errores.push("El campo 'Email' debe tener un formato adecuado.");
            }

            // Validación de Edad y Reglas
            if (isNaN(edadNum) || edadNum <= 0) {
                errores.push("La 'Edad' debe ser un número válido mayor a cero.");
            } else {
                // Validación de Regla de Edad (Infantil vs Adulto)
                if (tipoEntrada === 'infantil' && edadNum >= 18) {
                    errores.push("Si ha elegido entrada '**Infantil**', la edad debe ser 'menor de 18 años'.");
                }
                else if (tipoEntrada === 'adulto' && edadNum < 18) {
                    errores.push("Si ha elegido entrada '**Adulto**', la edad debe ser mayor de edad (18 años o más).");
                }
            }

            // Validación de Precio Calculado
            if (precioFinal === 'Incompleto' || precioFinal === '' || precioFinal === 'Error de Edad' || precioFinal === '0') {
                errores.push("Por favor, pulsa 'Calcular Precio' antes de comprar y corrige cualquier error de edad.");
            }
        }

        // Validación de Aceptación de Condiciones
        if (!aceptoCondiciones) {
            errores.push("Debe 'aceptar las condiciones' del contrato para continuar.");
        }
        
        // --- MOSTRAR ERRORES O ENVIAR FORMULARIO ---
        if (errores.length > 0) {
            // Construye un mensaje con todos los errores detallados
            let mensajeError = "Error en la Compra \n\nPor favor, revisa los siguientes problemas:\n\n- ";
            
            // Une los errores del array con un salto de línea y un guion
            mensajeError += errores.join("\n- "); 

            alert(mensajeError); // Muestra el mensaje detallado de errores
            
            return false; // Previene el envío del formulario
        } else {
            // Envío si todo es correcto
            alert("Todos los datos son correctos. Procediendo al envío.");
            this.submit();
        }
    });
});