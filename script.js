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
    // Verificamos si los elementos del carrusel existen
    if ($('#carrusel-img').length && $('#carrusel-title').length) { 
        const carruselData = [
            { img: "imagenes/recta-principal.png", title: "Emoción en la recta principal" },
            { img: "imagenes/panoramica.png", title: "Panorámica de la Ría de Bilbao" },
            { img: "imagenes/coche.jpg", title: "Coche de F1 en acción" },
            { img: "imagenes/museo-guggenheim.png", title: "El icónico Museo Guggenheim" },
            { img: "imagenes/podio.png", title: "Celebración en el podio" },
            { img: "imagenes/vistas-aereas.png", title: "Vistas aéreas de la ciudad" },
            { img: "imagenes/boxes.jpg", title: "Preparativos en boxes" },
            { img: "imagenes/gastronomia-pais-vasco.webp", title: "Degustando la gastronomía vasca" },
            { img: "imagenes/parrilla-de-salida.jpg", title: "La parrilla de salida" },
            { img: "imagenes/amanecer.jpg", title: "Atardecer en Bilbao" }
        ];

        let currentIndex = 0; 

        function updateCarousel() {
            const currentItem = carruselData[currentIndex];
            
            $('#carrusel-img').fadeOut(300, function() {
                $(this).attr('src', currentItem.img);
                $('#carrusel-title').text(currentItem.title);
                $(this).fadeIn(300);
            });
            
            currentIndex = (currentIndex + 1) % carruselData.length;
        }
        updateCarousel();
        setInterval(updateCarousel, 3000); 
    }
});