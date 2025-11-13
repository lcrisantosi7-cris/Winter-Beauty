// ============================================
// SISTEMA DE CARRITO DE COMPRAS
// ============================================

// Clase para manejar el carrito
class CarritoCompras {
    constructor() {
        this.items = this.cargarCarrito();
        this.actualizarContador();
    }

    // Cargar carrito desde localStorage
    cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carritoWinterBeauty');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }

    // Guardar carrito en localStorage
    guardarCarrito() {
        localStorage.setItem('carritoWinterBeauty', JSON.stringify(this.items));
        this.actualizarContador();
    }

    // Agregar producto al carrito
    agregarProducto(producto) {
        const itemExistente = this.items.find(item => 
            item.id === producto.id && item.talla === producto.talla
        );

        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            this.items.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                talla: producto.talla || 'S.5',
                cantidad: 1
            });
        }

        this.guardarCarrito();
        this.mostrarNotificacion('Producto agregado al carrito');
    }

    // Eliminar producto del carrito
    eliminarProducto(id, talla) {
        this.items = this.items.filter(item => 
            !(item.id === id && item.talla === talla)
        );
        this.guardarCarrito();
        this.renderizarCarrito();
    }

    // Actualizar cantidad de un producto
    actualizarCantidad(id, talla, nuevaCantidad) {
        const item = this.items.find(item => 
            item.id === id && item.talla === talla
        );

        if (item) {
            if (nuevaCantidad <= 0) {
                this.eliminarProducto(id, talla);
            } else {
                item.cantidad = nuevaCantidad;
                this.guardarCarrito();
                this.renderizarCarrito();
            }
        }
    }

    // Calcular subtotal
    calcularSubtotal() {
        return this.items.reduce((total, item) => 
            total + (item.precio * item.cantidad), 0
        );
    }

    // Calcular total (con envío si aplica)
    calcularTotal() {
        const subtotal = this.calcularSubtotal();
        const costoEnvio = 0; // Gratis por ahora
        return subtotal + costoEnvio;
    }

    // Obtener cantidad total de items
    obtenerCantidadTotal() {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    }

    // Actualizar contador del badge
    actualizarContador() {
        const badge = document.getElementById('carrito-count');
        if (badge) {
            const cantidad = this.obtenerCantidadTotal();
            badge.textContent = cantidad;
            if (cantidad > 0) {
                badge.classList.add('active');
            } else {
                badge.classList.remove('active');
            }
        }
    }

    // Renderizar carrito en la página
    renderizarCarrito() {
        const carritoLista = document.getElementById('carrito-lista');
        const carritoVacio = document.getElementById('carrito-vacio');
        
        if (!carritoLista) return;

        // Limpiar contenido
        carritoLista.innerHTML = '';

        if (this.items.length === 0) {
            carritoVacio.style.display = 'block';
            this.actualizarResumen();
            return;
        }

        carritoVacio.style.display = 'none';

        // Renderizar cada producto
        this.items.forEach(item => {
            const itemHTML = this.crearItemHTML(item);
            carritoLista.appendChild(itemHTML);
        });

        this.actualizarResumen();
    }

    // Crear HTML para un item del carrito
    crearItemHTML(item) {
        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <div class="item-imagen">
                <img src="${item.imagen}" alt="${item.nombre}">
            </div>
            <div class="item-info">
                <h3 class="item-nombre">${item.nombre}</h3>
                <p class="item-precio">S/. ${item.precio.toFixed(2)}</p>
            </div>
            <div class="item-controles">
                <div class="cantidad-control">
                    <button class="cantidad-btn" onclick="carrito.actualizarCantidad('${item.id}', '${item.talla}', ${item.cantidad - 1})">
                        <i class="bi bi-dash"></i>
                    </button>
                    <input type="text" class="cantidad-input" value="${item.cantidad}" readonly>
                    <button class="cantidad-btn" onclick="carrito.actualizarCantidad('${item.id}', '${item.talla}', ${item.cantidad + 1})">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
                <button class="btn-eliminar" onclick="carrito.eliminarProducto('${item.id}', '${item.talla}')">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        return div;
    }

    // Actualizar resumen del pedido
    actualizarResumen() {
        const subtotal = this.calcularSubtotal();
        const total = this.calcularTotal();

        const subtotalEl = document.getElementById('subtotal');
        const totalEl = document.getElementById('total');
        const btnPagar = document.getElementById('btn-pagar');

        if (subtotalEl) subtotalEl.textContent = `S/. ${subtotal.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `S/. ${total.toFixed(2)}`;
        
        if (btnPagar) {
            btnPagar.disabled = this.items.length === 0;
        }
    }

    // Mostrar notificación
    mostrarNotificacion(mensaje) {
        // Crear elemento de notificación
        const notif = document.createElement('div');
        notif.className = 'notificacion-carrito';
        notif.innerHTML = `
            <i class="bi bi-check-circle"></i>
            <span>${mensaje}</span>
        `;
        
        // Agregar estilos
        notif.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notif);

        // Remover después de 3 segundos
        setTimeout(() => {
            notif.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    // Vaciar carrito
    vaciarCarrito() {
        this.items = [];
        this.guardarCarrito();
        this.renderizarCarrito();
    }
}

// Instanciar carrito
const carrito = new CarritoCompras();

// ============================================
// INICIALIZACIÓN DE LA PÁGINA DEL CARRITO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Solo actualizar contador en todas las páginas
    carrito.actualizarContador();
    
    // Renderizar carrito SOLO si estamos en la página del carrito
    if (document.getElementById('carrito-lista')) {
        carrito.renderizarCarrito();
    }

    // Selector de método de envío
    const metodoEnvio = document.getElementById('metodo-envio');
    const envioInfo = document.getElementById('envio-info');

    if (metodoEnvio && envioInfo) {
        metodoEnvio.addEventListener('change', (e) => {
            const valor = e.target.value;
            
            if (valor === 'envio-lima') {
                envioInfo.innerHTML = `
                    <p class="direccion-status">Dirección no configurada</p>
                    <a href="#" class="ver-detalles">Ver detalles del envío</a>
                `;
            } else {
                const tiendas = {
                    'recojo-miraflores': 'Avenida Larco 101, tda 206 (2do piso)',
                    'recojo-plaza-norte': 'CC. Plaza Norte, tda 1108',
                    'recojo-san-miguel': 'CC. Plaza San Miguel, tda 213 (2do piso)'
                };
                
                envioInfo.innerHTML = `
                    <p class="direccion-status" style="color: #27ae60; font-weight: 600;">
                        <i class="bi bi-check-circle"></i> Recojo en tienda
                    </p>
                    <p style="font-size: 14px; color: #666; margin-top: 8px;">
                        ${tiendas[valor]}
                    </p>
                `;
            }
        });
    }

    // Botón ir a pagar
    const btnPagar = document.getElementById('btn-pagar');
    if (btnPagar) {
        btnPagar.addEventListener('click', () => {
            if (carrito.items.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
            // Aquí iría la lógica de pago
            alert('Funcionalidad de pago en desarrollo. Total: S/. ' + carrito.calcularTotal().toFixed(2));
        });
    }
});

// ============================================
// ANIMACIONES CSS PARA NOTIFICACIONES
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notificacion-carrito i {
        font-size: 20px;
    }
`;
document.head.appendChild(style);