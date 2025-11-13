// ============================================
// ANIMACIÓN DE CARGA DE PÁGINA
// ============================================
window.addEventListener('load', () => {
  document.body.style.overflow = 'hidden';
  
  // Animación del banner con texto letra por letra
  const bannerContent = document.querySelector('.banner-content');
  if (bannerContent) {
    const h1 = bannerContent.querySelector('h1');
    
    if (h1) {
      const text = h1.textContent;
      h1.textContent = '';
      h1.style.opacity = '1';
      
      // Crear spans para cada letra
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.display = 'inline';
        span.style.transform = 'translateY(-20px)';
        h1.appendChild(span);
        
        // Animar cada letra con delay
        setTimeout(() => {
          span.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        }, 800 + (index * 50));
      });
    }
    
  }
  
  document.body.style.overflow = 'auto';
});

// ============================================
// CARRUSEL PROMOCIONAL CON EFECTOS
// ============================================
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');

if (slides && images.length > 0) {
  let index = 0;
  
  const firstClone = images[0].cloneNode(true);
  slides.appendChild(firstClone);
  
  const totalSlides = images.length + 1;
  const interval = 4000;
  
  // Agregar efecto de zoom a las imágenes
  images.forEach(img => {
    img.style.transform = 'scale(1)';
    img.style.transition = 'transform 4s ease-out';
  });
  
  function moveSlides() {
    // Zoom out de la imagen actual
    if (images[index]) {
      images[index].style.transform = 'scale(1)';
    }
    
    index++;
    slides.style.transition = "transform 1s ease-in-out";
    slides.style.transform = `translateX(-${index * 100}%)`;
    
    // Zoom in de la nueva imagen
    setTimeout(() => {
      const currentImg = index < images.length ? images[index] : images[0];
      currentImg.style.transform = 'scale(1.1)';
    }, 100);
    
    if (index === totalSlides - 1) {
      setTimeout(() => {
        slides.style.transition = "none";
        slides.style.transform = "translateX(0)";
        index = 0;
        images[0].style.transform = 'scale(1.1)';
      }, 1000);
    }
  }
  
  setInterval(moveSlides, interval);
  
  // Iniciar con zoom en primera imagen
  if (images[0]) {
    setTimeout(() => {
      images[0].style.transform = 'scale(1.1)';
    }, 500);
  }
}

// ============================================
// ANIMACIÓN DE PRODUCTOS CON INTERSECTION OBSERVER
// ============================================
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animar tarjetas de productos nuevos
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  card.style.transition = `all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s`;
  fadeInObserver.observe(card);
});

// ============================================
// EFECTO HOVER MEJORADO EN TARJETAS
// ============================================
cards.forEach(card => {
  card.addEventListener('mouseenter', function(e) {
    this.style.transform = 'translateY(-15px) scale(1.02)';
    
    // Efecto de brillo
    const shine = document.createElement('div');
    shine.style.position = 'absolute';
    shine.style.top = '0';
    shine.style.left = '-100%';
    shine.style.width = '100%';
    shine.style.height = '100%';
    shine.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)';
    shine.style.transition = 'left 0.5s';
    shine.style.pointerEvents = 'none';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(shine);
    
    setTimeout(() => {
      shine.style.left = '100%';
    }, 10);
    
    setTimeout(() => {
      shine.remove();
    }, 520);
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ============================================
// SISTEMA DE ESTRELLAS ANIMADO
// ============================================
function inicializarEstrellas(selector) {
  const starGroups = document.querySelectorAll(selector);
  
  starGroups.forEach(group => {
    const stars = group.querySelectorAll('i');
    
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        // Animación de llenado
        stars.forEach(s => s.classList.remove('filled'));
        
        stars.forEach((s, i) => {
          if (i <= index) {
            setTimeout(() => {
              s.classList.add('filled');
              s.style.transform = 'scale(1.3)';
              setTimeout(() => {
                s.style.transform = 'scale(1)';
              }, 200);
            }, i * 50);
          }
        });
        
        group.dataset.rating = index + 1;
      });
      
      // Hover con escala
      star.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.3) rotate(10deg)';
      });
      
      star.addEventListener('mouseleave', function() {
        if (!this.classList.contains('filled')) {
          this.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  });
}

inicializarEstrellas('.stars');
inicializarEstrellas('.stars-producto');

// ============================================
// CARRUSEL DE PRODUCTOS - TODOS NUESTROS PRODUCTOS
// ============================================
const track = document.querySelector('.carrusel-track');
const productos = document.querySelectorAll('.producto-carrusel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carrusel-dots');

if (track && productos.length > 0 && prevBtn && nextBtn && dotsContainer) {
  let currentIndex = 0;
  let productosVisibles = 4;
  
  // Calcular productos visibles según ancho de pantalla
  function calcularProductosVisibles() {
    const width = window.innerWidth;
    if (width <= 480) {
      productosVisibles = 1;
    } else if (width <= 768) {
      productosVisibles = 2;
    } else if (width <= 1024) {
      productosVisibles = 3;
    } else {
      productosVisibles = 4;
    }
  }
  
  // Calcular total de slides
  function getTotalSlides() {
    return Math.ceil(productos.length / productosVisibles);
  }
  
  // Crear dots indicadores
  function crearDots() {
    dotsContainer.innerHTML = '';
    const totalSlides = getTotalSlides();
    
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => irASlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  // Actualizar posición del carrusel
  function actualizarCarrusel() {
    const anchoProducto = productos[0].offsetWidth;
    const gap = 25;
    const desplazamiento = currentIndex * (anchoProducto + gap) * productosVisibles;
    
    track.style.transform = `translateX(-${desplazamiento}px)`;
    
    // Actualizar dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Ir a slide específico
  function irASlide(slideIndex) {
    const totalSlides = getTotalSlides();
    currentIndex = Math.max(0, Math.min(slideIndex, totalSlides - 1));
    actualizarCarrusel();
  }
  
  // Botón anterior
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      actualizarCarrusel();
    }
  });
  
  // Botón siguiente
  nextBtn.addEventListener('click', () => {
    const totalSlides = getTotalSlides();
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      actualizarCarrusel();
    }
  });
  
  // Variables para arrastre
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  
  // Eventos de arrastre
  track.addEventListener('mousedown', dragStart);
  track.addEventListener('touchstart', dragStart);
  track.addEventListener('mouseup', dragEnd);
  track.addEventListener('touchend', dragEnd);
  track.addEventListener('mouseleave', dragEnd);
  track.addEventListener('mousemove', drag);
  track.addEventListener('touchmove', drag);
  
  function dragStart(e) {
    isDragging = true;
    startPos = getPositionX(e);
    track.style.transition = 'none';
  }
  
  function drag(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
  
  function dragEnd() {
    isDragging = false;
    track.style.transition = 'transform 0.5s ease-in-out';
    
    const movedBy = currentTranslate - prevTranslate;
    
    // Cambiar slide si se arrastró más de 50px
    if (movedBy < -50 && currentIndex < getTotalSlides() - 1) {
      currentIndex++;
    } else if (movedBy > 50 && currentIndex > 0) {
      currentIndex--;
    }
    
    actualizarCarrusel();
    prevTranslate = currentTranslate;
  }
  
  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }
  
  // Auto-play
  let autoplayInterval;
  
  function iniciarAutoplay() {
    autoplayInterval = setInterval(() => {
      const totalSlides = getTotalSlides();
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      actualizarCarrusel();
    }, 4000);
  }
  
  function detenerAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  // Pausar autoplay al hover
  track.addEventListener('mouseenter', detenerAutoplay);
  track.addEventListener('mouseleave', iniciarAutoplay);
  
  // Responsive: recalcular al redimensionar
  window.addEventListener('resize', () => {
    calcularProductosVisibles();
    currentIndex = 0;
    crearDots();
    actualizarCarrusel();
  });
  
  // Inicializar carrusel
  calcularProductosVisibles();
  crearDots();
  iniciarAutoplay();
}

// ============================================
// ANIMACIÓN DE TESTIMONIOS
// ============================================
const testimonios = document.querySelectorAll('.testimonio-card');
testimonios.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  card.style.transition = `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15}s`;
  fadeInObserver.observe(card);
});

// ============================================
// ANIMACIÓN DE ICONOS DE PROPÓSITO
// ============================================
const propositoItems = document.querySelectorAll('.proposito-item');
propositoItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(50px) scale(0.9)';
  item.style.transition = `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s`;
  fadeInObserver.observe(item);
});

const iconos = document.querySelectorAll('.icono-proposito img');
iconos.forEach(icono => {
  icono.addEventListener('mouseenter', () => {
    icono.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    icono.style.transform = 'scale(1.2) rotate(10deg)';
  });
  
  icono.addEventListener('mouseleave', () => {
    icono.style.transform = 'scale(1) rotate(0deg)';
  });
});

// ============================================
// EFECTO DE BOTONES CON ONDA
// ============================================
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');
  
  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }
  
  button.appendChild(circle);
}

const buttons = document.querySelectorAll('button, .btn-banner, .btn-carrito, .btn-comprar, .btn-comprar2');
buttons.forEach(button => {
  button.addEventListener('click', createRipple);
  button.style.position = 'relative';
  button.style.overflow = 'hidden';
});

// ============================================
// CONTADOR DE SCROLL SUAVE
// ============================================
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

// ============================================
// ANIMACIÓN DEL TÍTULO DE SECCIONES
// ============================================
const sectionTitles = document.querySelectorAll('.productos h2, .todos-productos h2, .testimonios h2, .proposito h2');
sectionTitles.forEach(title => {
  title.style.opacity = '0';
  title.style.transform = 'translateY(-30px)';
  title.style.transition = 'all 0.8s ease';
  fadeInObserver.observe(title);
});