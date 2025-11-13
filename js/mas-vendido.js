// ============================================
// SISTEMA DE ESTRELLAS - LO MÁS VENDIDO
// ============================================
function inicializarEstrellas(selector) {
  const starGroups = document.querySelectorAll(selector);
  
  starGroups.forEach(group => {
    const stars = group.querySelectorAll('i');
    
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        // Quitar todas las estrellas llenas
        stars.forEach(s => s.classList.remove('filled'));
        
        // Llenar desde la primera hasta la clickeada
        stars.forEach((s, i) => {
          if (i <= index) {
            s.classList.add('filled');
          }
        });
        
        // Guardar rating
        group.dataset.rating = index + 1;
      });
    });
  });
}

// Inicializar estrellas
inicializarEstrellas('.stars-rating');

// ============================================
// ANIMACIÓN AL HACER SCROLL
// ============================================
const observerOptions = {
  threshold: 0.2,
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

// Aplicar animación a productos
const productosItems = document.querySelectorAll('.producto-item');
productosItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = `all 0.6s ease ${index * 0.05}s`;
  observer.observe(item);
});

// ============================================
// EFECTO HOVER EN IMÁGENES
// ============================================
const productosImg = document.querySelectorAll('.producto-img');
productosImg.forEach(img => {
  img.addEventListener('mouseenter', function() {
    this.querySelector('img').style.transform = 'scale(1.1)';
  });
  
  img.addEventListener('mouseleave', function() {
    this.querySelector('img').style.transform = 'scale(1)';
  });
});