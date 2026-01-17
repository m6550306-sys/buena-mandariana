const URL_EXCEL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAzq0VBhcH3pZAZl12Ni22MPmWhr8DDkMK2vZlpo5ni7bqdXJENfBv9ppP45PzPaFSpHloFrrKnPSy/pub?output=csv';

document.addEventListener('DOMContentLoaded', () => {
    cargarExcel();
    
    // Botón menú móvil
    const btnMobile = document.getElementById('mobile-menu-button');
    if(btnMobile) btnMobile.onclick = () => document.getElementById('mobile-menu').classList.toggle('hidden');

    // Botón subir
    const btnSubir = document.getElementById('btn-subir');
    window.onscroll = () => {
        btnSubir.style.opacity = window.scrollY > 300 ? "1" : "0";
        btnSubir.style.pointerEvents = window.scrollY > 300 ? "auto" : "none";
    };
    btnSubir.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Función nueva para desplegar categorías en móvil
function toggleSubmenu(id) {
    const sub = document.getElementById(id);
    const icono = sub.parentElement.querySelector('i');
    
    // Cerrar otros abiertos (opcional, para limpieza)
    if (sub.classList.contains('hidden')) {
        sub.classList.remove('hidden');
        icono.classList.replace('fa-plus', 'fa-minus');
    } else {
        sub.classList.add('hidden');
        icono.classList.replace('fa-minus', 'fa-plus');
    }
}

function cargarExcel() {
    Papa.parse(URL_EXCEL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            let datos = results.data;
            datos.sort((a, b) => (parseFloat(a['ART. N°']) || 0) - (parseFloat(b['ART. N°']) || 0));
            renderizar(datos);
        }
    });
}

function renderizar(data) {
    const contenedores = {
        'PUZZLES': 'contenedor-puzzles',
        'DIDACTICOS PRIMERA INFANCIA': 'contenedor-didacticos',
        'JUEGOS DE MESA': 'contenedor-juegos-mesa',
        'LINEA HOGAR': 'contenedor-hogar',
        'LINEA MASAS': 'contenedor-masas',
        'LINEA BLOCKS': 'contenedor-blocks',
        'LINEA MINIS': 'contenedor-minis',
        'RODADOS CHICOS': 'contenedor-rodados-chicos',
        'RODADOS MEDIANOS': 'contenedor-rodados-medianos',
        'RODADOS GRANDES': 'contenedor-rodados-grandes',
        'ESTACION DE SERVICIO Y PISTA': 'contenedor-pistas',
        'LINEA JARDIN': 'contenedor-jardin',
        'NOVEDADES': 'contenedor-novedades',
        'PLAYA': 'contenedor-playa',
        'LINEA TALLER': 'contenedor-taller'
    };

    Object.values(contenedores).forEach(id => {
        const el = document.getElementById(id);
        if(el) el.innerHTML = '';
    });

    data.forEach(item => {
        const cat = (item['CATEGORIA'] || '').trim().toUpperCase();
        const art = (item['ART. N°'] || '').trim();
        const container = document.getElementById(contenedores[cat]);

        if (container && art) {
            container.innerHTML += `
                <div class="product-card" style="display: none;">
                    <img src="bm/${art}.jpg" alt="${item['DESCRIPCION DEL PRODUCTO']}" onload="this.parentElement.style.display='flex'" onerror="this.parentElement.remove()">
                    <div class="card-content">
                        <p class="art-code">ART. ${art}</p>
                        <h3>${item['DESCRIPCION DEL PRODUCTO']}</h3>
                        <p class="price">$${item['PRECIO'] || ''}</p>
                    </div>
                </div>`;
        }
    });
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(id);
    if(target) target.classList.remove('hidden');
    document.getElementById('mobile-menu').classList.add('hidden');
    window.scrollTo({top: 0, behavior: 'smooth'});
}
