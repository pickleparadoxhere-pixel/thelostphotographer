document.addEventListener('DOMContentLoaded', () => {
  
  // ===== Cinematic Scroll Animation (Hero Zoom Effect) =====
  const heroImage = document.getElementById('heroScrollImg');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrollOffset = window.pageYOffset;
      // Gently scale the image up as the user scrolls down
      const scaleValue = 1 + (scrollOffset * 0.0005);
      
      // Limit max scale to avoid pixelation distortions
      if (scaleValue <= 1.25) {
        heroImage.style.transform = `scale(${scaleValue})`;
      }
    });
  }

  // ===== Gallery Track Manual Navigation Arrow Actions (Mobile Interface Viewports Only) =====
  const track = document.getElementById('galleryTrack');
  const leftArrow = document.getElementById('slideLeftBtn');
  const rightArrow = document.getElementById('slideRightBtn');

  if (track && leftArrow && rightArrow) {
    // Scroll track distance matched to mobile card scale metrics
    const scrollDistance = window.innerWidth * 0.8;

    rightArrow.addEventListener('click', () => {
      track.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    });

    leftArrow.addEventListener('click', () => {
      track.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    });
  }

  // ===== Dynamic Floating Go To Top Interface Interaction =====
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== About Cinematic Background Slideshow Action =====
  const aboutSlideshow = (() => {
    const slides = document.querySelectorAll('.about-slide');
    if (slides.length === 0) return;
    
    let currentIdx = 0;
    
    const nextSlide = () => {
      slides[currentIdx].classList.remove('active');
      currentIdx = (currentIdx + 1) % slides.length;
      slides[currentIdx].classList.add('active');
    };
    
    setInterval(nextSlide, 4500);
  })();

  // ===== Filter Infrastructure Architecture =====
  const galleryFilter = (() => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    const runFilter = (filterValue) => {
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.dataset.category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        runFilter(btn.dataset.filter);
      });
    });
    
    galleryItems.forEach(item => {
      item.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  })();

  // ===== Lightbox Core Modules Framework =====
  const lightboxGallery = (() => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentIdx = 0;
    let pool = [];

    const updatePool = () => {
      pool = Array.from(galleryItems).filter(el => el.style.display !== 'none');
    };

    const displayIndex = (index) => {
      if(index < 0 || index >= pool.length) return;
      currentIdx = index;
      const targetSrc = pool[currentIdx].querySelector('img').src;
      lightboxImg.src = targetSrc;
    };

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        updatePool();
        const activeIndex = pool.indexOf(item);
        if(activeIndex !== -1) {
          lightbox.classList.add('active');
          displayIndex(activeIndex);
        }
      });
    });

    closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
    prevBtn.addEventListener('click', () => displayIndex((currentIdx - 1 + pool.length) % pool.length));
    nextBtn.addEventListener('click', () => displayIndex((currentIdx + 1) % pool.length));

    lightbox.addEventListener('click', (e) => {
      if(e.target === lightbox) lightbox.classList.remove('active');
    });
  })();
});
