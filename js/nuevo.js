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
const productosNuevos = document.querySelectorAll('.producto-nuevo-item');
productosNuevos.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = `all 0.6s ease ${index * 0.05}s`;
  observer.observe(item);
});

// ============================================
// EFECTO HOVER EN IMÁGENES
// ============================================
const productosImg = document.querySelectorAll('.producto-nuevo-img');
productosImg.forEach(img => {
  img.addEventListener('mouseenter', function() {
    this.querySelector('img').style.transform = 'scale(1.1)';
  });
  
  img.addEventListener('mouseleave', function() {
    this.querySelector('img').style.transform = 'scale(1)';
  });
});

// ============================================
// ANIMACIÓN DEL BANNER AL CARGAR
// ============================================
window.addEventListener('load', () => {
  const heroRight = document.querySelector('.hero-right-nuevo');
  if (heroRight) {
    heroRight.style.opacity = '0';
    heroRight.style.transform = 'translateX(30px)';
    
    setTimeout(() => {
      heroRight.style.transition = 'all 1s ease';
      heroRight.style.opacity = '1';
      heroRight.style.transform = 'translateX(0)';
    }, 300);
  }
});