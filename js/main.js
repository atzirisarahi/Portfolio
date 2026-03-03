/**
 * main.js - Lógica del Portafolio Atziri Berrospe
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTIÓN DE MODO OSCURO ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Revisar si el usuario ya tenía una preferencia guardada
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.replace('light-mode', 'dark-mode');
        themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            themeIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- 2. EFECTO NAVBAR AL HACER SCROLL ---
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 3. ANIMACIÓN DE ENTRADA (REEMPLAZO DE FRAMER MOTION) ---
    // Esta parte hace que las secciones "suban" y aparezcan al hacer scroll
    // Reemplaza tu sección 3 de main.js con esto:
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transition = "all 1.2s cubic-bezier(0.2, 1, 0.3, 1)";
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

// Aplicar a más elementos para que la página se sienta "viva"
const animatedElements = document.querySelectorAll('section, .skill-card, .project-img-container');
animatedElements.forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
});

    // Seleccionamos todas las secciones que queremos animar
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-up'); // Clase inicial en CSS
        observer.observe(section);
    });
});

const modal = document.getElementById("galleryModal");
const fullImg = document.getElementById("fullImg");
const cards = document.querySelectorAll(".render-card img");
const closeBtn = document.querySelector(".close-modal");

// Abrir imagen
cards.forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        fullImg.src = img.src; // Usa la imagen real
    });
});

// Cerrar con la X
closeBtn.onclick = () => {
    modal.style.display = "none";
};

// Cerrar si haces clic en el fondo oscuro
modal.onclick = (e) => {
    if (e.target !== fullImg) {
        modal.style.display = "none";
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Una vez que aparece, dejamos de observarlo para ahorrar recursos
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos todos los elementos con la clase fade-in-up
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));
});
document.getElementById('portfolio-contact').addEventListener('submit', function(event) {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación de campos vacíos
    if (nombre === "" || email === "" || mensaje === "") {
        event.preventDefault();
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, llena todos los espacios para poder contactarte.',
            confirmButtonColor: '#9333ea', // Tu color morado
            background: '#0f0a1f', // Tu fondo oscuro
            color: '#f3f3f5'
        });
        return;
    }

    // Validación de formato de email
    if (!emailRegex.test(email)) {
        event.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Email inválido',
            text: 'La estructura del correo no es correcta.',
            confirmButtonColor: '#db2777', // Tu color rosa
            background: '#0f0a1f',
            color: '#f3f3f5'
        });
        return;
    }

    // Alerta de éxito antes de que Formspree procese el envío
    // Nota: No usamos preventDefault aquí para que Formspree reciba el mensaje
    Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Gracias por escribir, Atziri te responderá pronto.',
        showConfirmButton: false,
        timer: 3000,
        background: '#0f0a1f',
        color: '#f3f3f5'
    });
});