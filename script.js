// Navigation active state
const updateActiveNav = () => {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
};

// Smooth scroll for navigation
const setupNavigation = () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};

// Helper function for smooth scroll
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Scroll to contact section when service card is clicked
function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Generate big twinkling star animation in the animation space
const generateStarAnimation = () => {
  const animationSpace = document.getElementById('animationSpace');
  if (!animationSpace) return;

  // Clear any existing stars
  animationSpace.innerHTML = '';

  // Create larger star SVG elements (fewer of them)
  const numberOfStars = 3;
  const positions = [
    { top: '20%', left: '15%' },
    { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    { top: '75%', left: '80%' }
  ];

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    star.setAttribute('viewBox', '0 0 24 24');
    const size = 60 + i * 20;
    star.setAttribute('width', size);
    star.setAttribute('height', size);
    star.style.position = 'absolute';
    star.style.left = positions[i].left;
    star.style.top = positions[i].top;
    if (positions[i].transform) {
      star.style.transform = positions[i].transform;
    }
    star.style.animation = `twinkle-star ${2 + i * 0.5}s ease-in-out infinite`;
    star.style.animationDelay = `${i * 0.3}s`;
    star.innerHTML = `
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
            fill="#a78bfa" stroke="none"/>
    `;
    animationSpace.appendChild(star);
  }

  // Add twinkle-star animation if it doesn't exist
  if (!document.getElementById('twinkle-star-style')) {
    const style = document.createElement('style');
    style.id = 'twinkle-star-style';
    style.innerHTML = `
      @keyframes twinkle-star {
        0%, 100% { opacity: 0.3; transform: scale(0.95); }
        50% { opacity: 0.9; transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);
  }
}

// Load portfolio from backend
const loadPortfolio = async () => {
  try {
    const response = await fetch('/api/portfolio');
    const projects = await response.json();
    
    const container = document.getElementById('portfolio-container');
    const emptyState = document.getElementById('portfolio-empty');
    
    if (projects.length > 0) {
      emptyState.style.display = 'none';
      container.innerHTML = projects.map(project => `
        <div class="portfolio-item" onclick="openPortfolioDetail('${project.id}')">
          ${project.image ? `<img src="data:image/jpeg;base64,${project.image}" alt="${project.title}">` : '<div style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(91, 33, 182, 0.05)); height: 200px;"></div>'}
          <div class="portfolio-item-content">
            <div class="portfolio-item-category">${project.category}</div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading portfolio:', error);
  }
};

// Open portfolio detail modal
const openPortfolioDetail = (id) => {
  // Can implement modal or redirect to detail page
  console.log('Opening portfolio item:', id);
};

// Intersection Observer for reveal animations
const setupRevealAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .portfolio-item, .contact-card').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  updateActiveNav();
  setupRevealAnimations();
  loadPortfolio();
  generateStarAnimation();
});
