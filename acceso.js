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
    const formAcceso = $('#form-acceso');
    const inputUsuario = $('#usuario');
    const inputPassword = $('#password');
    const togglePassword = $('#toggle-password');

    // 1. Funcionalidad de Mostrar/Ocultar Contraseña (Toggle)
    togglePassword.on('click', function() {
        // Obtiene el tipo actual del campo (text o password)
        const type = inputPassword.attr('type') === 'password' ? 'text' : 'password';
        
        // Cambia el tipo del campo
        inputPassword.attr('type', type);
        
        // Opcional: Cambia el icono para reflejar el estado (👁️ visible, 🙈 oculto)
        if (type === 'text') {
            $(this).text('🙈').attr('title', 'Ocultar contraseña');
        } else {
            $(this).text('👁️').attr('title', 'Mostrar contraseña');
        }
    });

    // 2. Validación y Verificación de Acceso al enviar el formulario
    formAcceso.on('submit', function(event) {
        // Previene el envío por defecto del formulario para realizar las validaciones
        event.preventDefault(); 
        
        const usuario = inputUsuario.val().trim(); // .trim() elimina espacios en blanco
        const password = inputPassword.val().trim();

        // 2.1. Validación: Obligatorio NO dejar AMBOS campos vacíos
        if (usuario === '' && password === '') {
            alert('ERROR: El formulario no puede ser enviado con ambos campos (Usuario y Contraseña) vacíos.');
            
            // Opcional: Puedes enfocar el campo de usuario para mejor UX
            inputUsuario.focus(); 
            return; // Detiene la ejecución si la validación falla
        }

        // 2.2. Verificación de Credenciales
        const USUARIO_CORRECTO = 'alumno';
        const PASSWORD_CORRECTA = 'sanluis';
        const URL_DESTINO = 'tratarDatos.php'; // URL de la página a cargar

        if (usuario === USUARIO_CORRECTO && password === PASSWORD_CORRECTA) {
            // Credenciales CORRECTAS
            
            // Mostrar la alerta de que todo es correcto
            alert('¡Acceso correcto! Las credenciales son válidas. Redirigiendo a ' + URL_DESTINO);
            
            // El enunciado pide que, si es correcto, se "envía y carga una página". 
            // La forma más simple de simular el envío y carga de una nueva página
            // es forzar la navegación después de la alerta.
            window.location.href = URL_DESTINO;
            
        } else {
            // Credenciales INCORRECTAS (Al menos uno es incorrecto, o solo uno está vacío)
            alert('ERROR: Usuario o Contraseña incorrectos.');
            
            // Opcional: Limpiar el campo de contraseña por seguridad
            inputPassword.val('');
            inputUsuario.focus();
        }
    });
});