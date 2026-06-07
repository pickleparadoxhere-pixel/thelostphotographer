document.addEventListener('DOMContentLoaded', () => {
  
  // ===== About Cinematic Slideshow =====
  // Transitions the remaining 3 pictures beautifully in the background
  const aboutSlideshow = (() => {
    const slides = document.querySelectorAll('.about-slide');
    if (slides.length === 0) return;
    
    let currentIdx = 0;
    
    const nextSlide = () => {
      slides[currentIdx].classList.remove('active');
      currentIdx = (currentIdx + 1) % slides.length;
      slides[currentIdx].classList.add('active');
    };
    
    // Auto transition every 4.5 seconds
    setInterval(nextSlide, 4500);
  })();

  // ===== Filter Infrastructure =====
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
    
    // Setup base transition defaults
    galleryItems.forEach(item => {
      item.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  })();

  // ===== Lightbox Framework =====
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
