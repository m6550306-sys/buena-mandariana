// Lógica para mostrar las secciones y ocultar menús
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        activeSection.classList.add('active');
        
        // Desplazamiento suave para evitar que el menú fijo cubra el contenido
        window.scrollTo({ top: 64, behavior: 'smooth' });
    }
    
    // Ocultar el menú móvil después de hacer clic en un enlace
    document.getElementById('mobile-menu').classList.add('hidden');
    
    // Ocultar todos los submenús después de hacer clic en un enlace
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.add('hidden');
    });
}

// Lógica para el menú móvil
document.getElementById('mobile-menu-button').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Lógica para los menús desplegables de escritorio
document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdownMenu = e.target.closest('.dropdown').querySelector('.dropdown-menu');
        if (dropdownMenu.classList.contains('hidden')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.add('hidden');
            });
            dropdownMenu.classList.remove('hidden');
        } else {
            dropdownMenu.classList.add('hidden');
        }
    });
});

// Cierra el menú desplegable si se hace clic fuera de él
window.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.add('hidden');
        });
    }
});