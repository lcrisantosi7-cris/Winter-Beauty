
const imagenPrincipal = document.getElementById('imagenPrincipal');
const miniaturas = document.querySelectorAll('.miniatura');

miniaturas.forEach(miniatura => {
    miniatura.addEventListener('click', function() {
 
        miniaturas.forEach(m => m.classList.remove('active'));
        
    
        this.classList.add('active');
        
     
        imagenPrincipal.style.opacity = '0';
        imagenPrincipal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            imagenPrincipal.src = this.dataset.imagen;
            imagenPrincipal.style.opacity = '1';
            imagenPrincipal.style.transform = 'scale(1)';
        }, 200);
    });
});


const coloresOpciones = document.querySelectorAll('.color-opcion');
const colorNombre = document.getElementById('colorNombre');


if (coloresOpciones.length > 0) {
    coloresOpciones[0].classList.add('active');
}

coloresOpciones.forEach(color => {
    color.addEventListener('click', function() {

        coloresOpciones.forEach(c => c.classList.remove('active'));

        this.classList.add('active');

        colorNombre.style.opacity = '0';
        colorNombre.style.transform = 'translateY(-5px)';
        
        setTimeout(() => {
            colorNombre.textContent = this.dataset.color;
            colorNombre.style.opacity = '1';
            colorNombre.style.transform = 'translateY(0)';
        }, 150);

        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
    

    color.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'scale(1.15)';
        }
    });
    
    color.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'scale(1)';
        }
    });
});


const btnMenos = document.getElementById('btnMenos');
const btnMas = document.getElementById('btnMas');
const cantidadInput = document.getElementById('cantidad');

btnMenos.addEventListener('click', function() {
    let cantidad = parseInt(cantidadInput.value);
    if (cantidad > 1) {
        cantidad--;
        cantidadInput.value = cantidad;

        cantidadInput.style.transform = 'scale(0.9)';
        setTimeout(() => {
            cantidadInput.style.transform = 'scale(1)';
        }, 100);
    }
});

btnMas.addEventListener('click', function() {
    let cantidad = parseInt(cantidadInput.value);
    cantidad++;
    cantidadInput.value = cantidad;
    
    // Animación
    cantidadInput.style.transform = 'scale(1.1)';
    setTimeout(() => {
        cantidadInput.style.transform = 'scale(1)';
    }, 100);
});



function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.background = 'rgba(255, 255, 255, 0.6)';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple-effect 0.6s ease-out';
    circle.style.pointerEvents = 'none';
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 600);
}


const buttons = document.querySelectorAll('button, .btn-comprar-ahora, .btn-añadir-carrito');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
});


const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cantidad-selector input {
        transition: transform 0.2s ease;
    }
    
    .imagen-principal img {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    #colorNombre {
        transition: opacity 0.2s ease, transform 0.2s ease;
    }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    const productoInfo = document.querySelector('.producto-info');
    const productoGaleria = document.querySelector('.producto-galeria');
    
    if (productoGaleria) {
        productoGaleria.style.opacity = '0';
        productoGaleria.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            productoGaleria.style.transition = 'all 0.8s ease';
            productoGaleria.style.opacity = '1';
            productoGaleria.style.transform = 'translateX(0)';
        }, 100);
    }
    
    if (productoInfo) {
        productoInfo.style.opacity = '0';
        productoInfo.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            productoInfo.style.transition = 'all 0.8s ease';
            productoInfo.style.opacity = '1';
            productoInfo.style.transform = 'translateX(0)';
        }, 200);
    }
});


const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const cardsRelacionados = document.querySelectorAll('.card-relacionado');
cardsRelacionados.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


cardsRelacionados.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});