/* --- CONFIGURACIÓN GENERAL --- */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f9fafb;
    color: #1f2937;
    line-height: 1.5;
}

/* --- BARRA DE NAVEGACIÓN --- */
.nav-link {
    color: white;
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    border-radius: 8px;
    cursor: pointer;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

/* --- MEJORA DEL DESPLEGABLE --- */
.dropdown {
    position: relative;
    padding-bottom: 15px; /* Crea un puente invisible para que no se cierre al bajar el mouse */
    margin-bottom: -15px;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    min-width: 240px; /* Un poco más ancho para mayor comodidad */
    display: none;
    flex-direction: column;
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    border-radius: 12px;
    padding: 8px 0;
    z-index: 100;
    border: 1px solid #eee;
}

.dropdown:hover .dropdown-menu {
    display: flex;
    animation: slideUp 0.3s ease;
}

/* Hacemos que CADA opción sea un botón grande y fácil de tocar */
.dropdown-menu a {
    padding: 12px 20px;
    color: #4b5563;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    display: block; /* Ocupa todo el ancho */
    border-bottom: 1px solid #f9fafb;
}

.dropdown-menu a:hover {
    background-color: #ea580c; /* Fondo naranja al pasar el mouse */
    color: white !important; /* Letra blanca */
    padding-left: 28px; /* Pequeño efecto de movimiento */
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* --- TÍTULOS DE SECCIÓN --- */
.section-title {
    font-size: 2.2rem;
    font-weight: 900;
    color: #9a3412;
    margin-bottom: 3rem;
    text-transform: uppercase;
    font-style: italic;
    border-bottom: 5px solid #f97316;
    display: inline-block;
    padding-bottom: 8px;
}

/* --- GRILLA DE PRODUCTOS (CAMBIO A 4 COLUMNAS) --- */
.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 por fila en móviles para que no sean mini */
    gap: 1.5rem; /* Espacio entre tarjetas */
    padding: 10px;
}

/* Tablets (3 columnas) */
@media (min-width: 768px) {
    .grid-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* PC (Exactamente 4 por fila para que se vean más grandes) */
@media (min-width: 1024px) {
    .grid-container {
        grid-template-columns: repeat(4, 1fr); 
        gap: 2rem;
    }
}

/* --- TARJETA DE PRODUCTO --- */
.product-card {
    background: white;
    border-radius: 20px;
    padding: 20px;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    height: 100%;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: #fdba74;
}

.product-card img {
    height: 240px; /* Aumentado de 160px a 240px para que se luzca el juguete */
    width: 100%;
    object-fit: contain;
    margin-bottom: 15px;
}

.card-content {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.product-card h3 {
    font-size: 1rem;
    font-weight: 800;
    color: #374151;
    margin-bottom: 8px;
    text-transform: uppercase;
    min-height: 2.4em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.art-code {
    color: #9ca3af;
    font-size: 0.75rem;
    font-weight: bold;
    margin-bottom: 12px;
}

.price {
    font-size: 1.8rem;
    font-weight: 900;
    color: #ea580c;
    margin-top: auto;
    background: #fff7ed;
    padding: 8px;
    border-radius: 10px;
}

/* --- ESTADOS --- */
.section { animation: fadeIn 0.5s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.hidden { display: none; }

/* Estilo extra para el botón de subir */
#btn-subir {
    cursor: pointer;
    border: none;
    outline: none;
    /* Evitamos que moleste si está oculto */
    pointer-events: none; 
}

/* Efecto de rebote suave al aparecer */
#btn-subir[style*="opacity: 1"] {
    animation: bounceIn 0.5s ease;
}

@keyframes bounceIn {
    0% { transform: scale(0); }
    70% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
