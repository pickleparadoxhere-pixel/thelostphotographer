// ===== Hero Slideshow =====
const heroSlideshow = (() => {
  const images = document.querySelectorAll('.hero-image');
  let currentIndex = 0;

  const showImage = (index) => {
    images.forEach((img, i) => {
      img.classList.remove('active');
      if (i === index) {
        img.classList.add('active');
      }
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  };

  // Auto-rotate every 5 seconds
  setInterval(nextSlide, 5000);

  return { nextSlide, showImage };
})();

// ===== Gallery Filter =====
const galleryFilter = (() => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  const filterGallery = (filter) => {
    galleryItems.forEach((item) => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      // Filter gallery
      const filter = btn.dataset.filter;
      filterGallery(filter);
    });
  });

  // Initialize gallery items with transition
  galleryItems.forEach((item) => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
  });

  return { filterGallery };
})();

// ===== Lightbox Gallery =====
const lightboxGallery = (() => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const closeBtn = document.querySelector('.close-lightbox');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  let currentImageIndex = 0;
  let visibleImages = [];

  const getVisibleImages = () => {
    return Array.from(galleryItems).filter(
      (item) => item.style.display !== 'none'
    );
  };

  const updateVisibleImages = () => {
    visibleImages = getVisibleImages();
  };

  const openLightbox = (imageElement) => {
    updateVisibleImages();
    const img = imageElement.querySelector('img');
    lightboxImage.src = img.src;
    lightbox.classList.add('active');
    
    // Find index in visible images
    const imageIndex = visibleImages.findIndex(
      (item) => item.querySelector('img').src === img.src
    );
    currentImageIndex = imageIndex !== -1 ? imageIndex : 0;
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
  };

  const showPrevImage = () => {
    if (visibleImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    const img = visibleImages[currentImageIndex].querySelector('img');
    lightboxImage.src = img.src;
  };

  const showNextImage = () => {
    if (visibleImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    const img = visibleImages[currentImageIndex].querySelector('img');
    lightboxImage.src = img.src;
  };

  // Add click listeners to gallery items
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      openLightbox(item);
    });
  });

  // Lightbox controls
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'Escape') closeLightbox();
  });

  return { openLightbox, closeLightbox };
})();

// ===== Scroll Animations =====
const scrollAnimations = (() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  const elements = document.querySelectorAll(
    '.gallery-item, .testimonial-card, .team-content, .contact-content'
  );
  
  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();

// ===== Back to Top Button =====
const backToTopButton = (() => {
  const btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.className = 'back-to-top';
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #d4a5a5 0%, #a8947a 100%);
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(212, 165, 165, 0.3);
  `;

  document.body.appendChild(btn);

  const toggleButton = () => {
    if (window.pageYOffset > 300) {
      btn.style.opacity = '1';
      btn.style.visibility = 'visible';
    } else {
      btn.style.opacity = '0';
      btn.style.visibility = 'hidden';
    }
  };

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('scroll', toggleButton);
})();

// ===== Smooth Scroll for Navigation Links =====
const smoothScroll = (() => {
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    });
  });
})();

// ===== Testimonials Carousel Auto-Scroll =====
const testimonialsCarousel = (() => {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;

  const cards = document.querySelectorAll('.testimonial-card');
  let currentCardIndex = 0;

  // For larger screens, show multiple cards
  // For smaller screens, we'll rely on grid auto-fit

  const rotateCards = () => {
    cards.forEach((card, index) => {
      card.style.opacity = '1';
    });
  };

  rotateCards();
})();

// ===== Page Load Animation =====
const pageLoadAnimation = (() => {
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
  });
})();

// ===== Counter Animation for Numbers =====
const counterAnimation = (() => {
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 30;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 50);
  };
  
  // Optional: Add counters to specific elements if needed
  // Example: animateCounter(element, 100);
})();

// ===== Lazy Loading Images =====
const lazyLoadImages = (() => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => imageObserver.observe(img));
  }
})();

// ===== Initialize on DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
  // Add any additional initialization here
  console.log('The Lost Photographer - Website Loaded');
  
  // Animate hero title and subtitle
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  
  if (heroTitle) {
    heroTitle.style.animation = 'fadeInUp 0.8s ease-out';
  }
  if (heroSubtitle) {
    heroSubtitle.style.animation = 'fadeInUp 0.8s ease-out 0.2s backwards';
  }
});

// ===== Performance Optimization =====
// Throttle scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Any scroll-based logic
}, 200));
