// ===== MOBILE MENU TOGGLE =====
let menuVisible = false;

function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    if (menuVisible) {
        nav.classList.remove("responsive");
        menuVisible = false;
    } else {
        nav.classList.add("responsive");
        menuVisible = true;
    }
}

function seleccionar() {
    // Ocultar el menú al seleccionar una opción
    document.getElementById("nav").classList.remove("responsive");
    menuVisible = false;
}

// ===== SMOOTH SCROLL ENHANCEMENT =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todas las secciones
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
});

// ===== SKILLS ANIMATION ON SCROLL =====
function efectoHabilidades() {
    const skills = document.getElementById("skills");
    if (!skills) return;
    
    const distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    
    if (distancia_skills >= 300) {
        const habilidades = document.getElementsByClassName("progreso");
        if (habilidades.length > 0 && !habilidades[0].classList.contains('animated')) {
            // Technical Skills
            habilidades[0]?.classList.add("javascript");
            habilidades[1]?.classList.add("htmlcss");
            habilidades[2]?.classList.add("photoshop");
            habilidades[3]?.classList.add("wordpress");
            habilidades[4]?.classList.add("drupal");
            
            // Professional Skills
            habilidades[5]?.classList.add("comunicacion");
            habilidades[6]?.classList.add("trabajo");
            habilidades[7]?.classList.add("creatividad");
            habilidades[8]?.classList.add("dedicacion");
            habilidades[9]?.classList.add("proyect");
            
            // Mark as animated to prevent re-triggering
            habilidades[0]?.classList.add('animated');
        }
    }
}

// ===== SCROLL EVENT HANDLER WITH DEBOUNCE =====
let scrollTimeout;
window.addEventListener('scroll', () => {
    // Clear the timeout if it exists
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    // Use requestAnimationFrame for better performance
    scrollTimeout = window.requestAnimationFrame(() => {
        efectoHabilidades();
        updateHeaderOnScroll();
    });
});

// ===== HEADER BACKGROUND ON SCROLL =====
function updateHeaderOnScroll() {
    const header = document.querySelector('.contenedor-header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.8)';
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
    }
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.inicio');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.backgroundPositionY = `${scrolled * speed}px`;
    });
});

// ===== HOVER ANIMATION FOR CARDS =====
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.interes, .item, .proyecto');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// ===== FORM VALIDATION AND ENHANCEMENT =====
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', () => {
                input.parentElement?.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement?.classList.remove('focused');
                }
            });
        });
        
        // Form submission feedback
        form.addEventListener('submit', (e) => {
            const button = form.querySelector('button');
            if (button) {
                button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
                button.disabled = true;
            }
        });
    }
});

// ===== COPY TO CLIPBOARD FUNCTIONALITY (for future use) =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copiado al portapapeles');
    });
}

// ===== CONSOLE EASTER EGG =====
console.log('%c¡Hola! 👋', 'color: #1CB698; font-size: 24px; font-weight: bold;');
console.log('%c¿Interesado en el código? Visita mi GitHub:', 'color: #A020F0; font-size: 14px;');
console.log('%chttps://github.com/GonzaJCalderon', 'color: #1CB698; font-size: 14px;');

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images if needed in the future
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}