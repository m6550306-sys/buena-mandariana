const URL_EXCEL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAzq0VBhcH3pZAZl12Ni22MPmWhr8DDkMK2vZlpo5ni7bqdXJENfBv9ppP45PzPaFSpHloFrrKnPSy/pub?output=csv';

document.addEventListener('DOMContentLoaded', () => {
    cargarExcel();
    
    // Configuración Menú Móvil
    const btnMobile = document.getElementById('mobile-menu-button');
    if(btnMobile) {
        btnMobile.onclick = () => document.getElementById('mobile-menu').classList.toggle('hidden');
    }

    // Configuración Botón Subir (se inicializa al cargar el DOM)
    const btnSubir = document.getElementById('btn-subir');
    if(btnSubir) {
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                btnSubir.style.opacity = "1";
                btnSubir.style.pointerEvents = "auto";
            } else {
                btnSubir.style.opacity = "0";
                btnSubir.style.pointerEvents = "none";
            }
        };

        btnSubir.onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }
});

function cargarExcel() {
    Papa.parse(URL_EXCEL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            let datos = results.data;

            // ORDENAR DE MENOR A MAYOR POR ARTÍCULO (Usando parseFloat para lógica exacta)
            datos.sort((a, b) => {
                const artA = parseFloat(a['ART. N°']) || 0;
                const artB = parseFloat(b['ART. N°']) || 0;
                return artA - artB;
            });

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
        const idContenedor = contenedores[cat];
        const container = document.getElementById(idContenedor);

        if (container && art) {
            let precioLimpio = (item['PRECIO'] || '').toString().replace('$', '').trim();
            const nombre = item['DESCRIPCION DEL PRODUCTO'] || 'Producto Duravit';
            
            container.innerHTML += `
                <div class="product-card" style="display: none;">
                    <img src="bm/${art}.jpg" 
                         alt="${nombre}"
                         onload="this.parentElement.style.display='flex'"
                         onerror="this.parentElement.remove()">
                    <div class="card-content">
                        <h3>${nombre}</h3>
                        <p class="art-code">ARTÍCULO: ${art}</p>
                        <p class="price">$${precioLimpio}</p>
                    </div>
                </div>
            `;
        }
    });
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(id);
    if(target) target.classList.remove('hidden');
    
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenu) mobileMenu.classList.add('hidden');
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}
