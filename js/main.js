// Powder Inn - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.navbar')) {
      if (navMenu) navMenu.classList.remove('active');
    }
  });

  // Set active navigation link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar(); // Check on load

  // Gallery lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (img) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${img.src}" alt="${img.alt}">
          </div>
        `;
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        lightbox.addEventListener('click', function (e) {
          if (e.target === lightbox || e.target.className === 'lightbox-close') {
            lightbox.remove();
            document.body.style.overflow = '';
          }
        });
      }
    });
  });

  // Phone number obfuscation - protect from bots
  const phoneLinks = document.querySelectorAll('a.phone[data-p1]');

  phoneLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const p1 = this.getAttribute('data-p1');
      const p2 = this.getAttribute('data-p2');
      const fullNumber = '+' + p1 + p2;
      const formatted = '+' + p1.substring(0, 3) + ' ' + p1.substring(3) + ' ' + p2;

      // Update the link
      this.href = 'tel:' + fullNumber;
      this.textContent = formatted;
      this.style.pointerEvents = 'auto';

      // Remove data attributes to prevent re-click
      this.removeAttribute('data-p1');
      this.removeAttribute('data-p2');

      // Trigger the call on second click
      setTimeout(() => {
        window.location.href = this.href;
      }, 100);
    });
  });
});

// Add lightbox styles dynamically
const lightboxStyles = `
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
    animation: fadeIn 0.3s;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    animation: zoomIn 0.3s;
  }

  @keyframes zoomIn {
    from { transform: scale(0.8); }
    to { transform: scale(1); }
  }

  .lightbox-content img {
    max-width: 100%;
    max-height: 90vh;
    border-radius: 8px;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
  }

  .lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    line-height: 1;
  }

  .lightbox-close:hover {
    color: var(--primary-color);
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);
