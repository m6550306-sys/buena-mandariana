const URL_EXCEL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAzq0VBhcH3pZAZl12Ni22MPmWhr8DDkMK2vZlpo5ni7bqdXJENfBv9ppP45PzPaFSpHloFrrKnPSy/pub?output=csv';

document.addEventListener('DOMContentLoaded', () => {
    cargarExcel();
    
    // Abrir/Cerrar menú móvil
    const btnMobile = document.getElementById('mobile-menu-button');
    if(btnMobile) {
        btnMobile.onclick = () => {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        };
    }
});

function cargarExcel() {
    Papa.parse(URL_EXCEL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            renderizar(results.data);
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
            
            // LÓGICA DE FOTOS: Busca .jpg, si falla busca .JPG
            container.innerHTML += `
                <div class="product-card">
                    <img src="bm/${art}.jpg" 
                         alt="${nombre}" 
                         onerror="this.onerror=function(){this.src='bm/${art}.JPG'};this.src='bm/${art}.jpg';">
                    <div class="card-content">
                        <p class="art-code">ART. ${art}</p>
                        <h3>${nombre}</h3>
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
    
    // Cerrar menú móvil al navegar
    document.getElementById('mobile-menu').classList.add('hidden');
    window.scrollTo({top: 0, behavior: 'smooth'});
}
