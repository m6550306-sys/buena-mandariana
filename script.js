const URL_EXCEL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAzq0VBhcH3pZAZl12Ni22MPmWhr8DDkMK2vZlpo5ni7bqdXJENfBv9ppP45PzPaFSpHloFrrKnPSy/pub?output=csv';

document.addEventListener('DOMContentLoaded', () => {
    cargarExcel();
    
    // Menú móvil
    const btnMobile = document.getElementById('mobile-menu-button');
    if(btnMobile) {
        btnMobile.onclick = () => {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        };
    }

    // Botón subir
    const btnSubir = document.getElementById('btn-subir');
    window.onscroll = () => {
        btnSubir.style.opacity = window.scrollY > 300 ? "1" : "0";
        btnSubir.style.pointerEvents = window.scrollY > 300 ? "auto" : "none";
    };
    btnSubir.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Función para submenús móvil (acordeón)
function toggleSubmenu(id) {
    const sub = document.getElementById(id);
    const icono = sub.parentElement.querySelector('i');
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

    // Limpiar contenedores
    Object.values(contenedores).forEach(id => {
        const el = document.getElementById(id);
        if(el) el.innerHTML = '';
    });

    data.forEach(item => {
        const cat = (item['CATEGORIA'] || '').trim().toUpperCase();
        const art = (item['ART. N°'] || '').trim();
        const container = document.getElementById(contenedores[cat]);

        if (container && art) {
            const nombre = item['DESCRIPCION DEL PRODUCTO'] || 'Producto Duravit';
            
            // Corrección del signo de pesos (evita el $$)
            let precioRaw = (item['PRECIO'] || '').toString().trim();
            let precioFinal = precioRaw.startsWith('$') ? precioRaw : '$' + precioRaw;

            // Lógica de carga de fotos inteligente
            container.innerHTML += `
                <div class="product-card">
                    <img src="bm/${art}.jpg" 
                         alt="${nombre}" 
                         onerror="this.onerror=function(){this.src='bm/${art}.JPG'};this.src='bm/${art}.jpg';">
                    <div class="card-content">
                        <p class="art-code">ART. ${art}</p>
                        <h3>${nombre}</h3>
                        <p class="price">${precioFinal}</p>
                    </div>
                </div>`;
        }
    });
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(id);
    if(target) target.classList.remove('hidden');
    
    // Cerrar menús al navegar
    document.getElementById('mobile-menu').classList.add('hidden');
    document.querySelectorAll('[id^="sub-"]').forEach(sub => sub.classList.add('hidden'));
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}
