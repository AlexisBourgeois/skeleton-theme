/**
 * Transparent Header Controller
 * Handles transparent header overlay functionality with scroll detection
 */
class TransparentHeader {
  constructor() {
    this.headerWrapper = document.querySelector('.header-wrapper--transparent');
    this.sectionHeader = document.querySelector('.section-header');
    this.scrollThreshold = 100;
    this.isScrolled = false;
    
    if (this.headerWrapper) {
      this.init();
    }
  }

  init() {
    this.handleScroll();
    this.bindEvents();
    this.checkFirstSection();
  }

  bindEvents() {
    // Use throttled scroll handler for better performance
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    
    // Handle window resize
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 100));
    
    // Handle menu interactions
    this.bindMenuEvents();
  }

  handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const shouldBeScrolled = scrollY > this.scrollThreshold;
    
    if (shouldBeScrolled !== this.isScrolled) {
      this.isScrolled = shouldBeScrolled;
      this.updateHeaderState();
    }
  }

  updateHeaderState() {
    if (this.isScrolled) {
      this.headerWrapper.classList.add('header-wrapper--scrolled');
      
      // Add transparent section class to maintain proper positioning
      if (this.sectionHeader) {
        this.sectionHeader.classList.add('section-header--scrolled');
      }
    } else {
      this.headerWrapper.classList.remove('header-wrapper--scrolled');
      
      if (this.sectionHeader) {
        this.sectionHeader.classList.remove('section-header--scrolled');
      }
    }
  }

  handleResize() {
    // Recalculate any size-dependent values if needed
    this.updateHeaderHeight();
  }

  updateHeaderHeight() {
    if (this.sectionHeader && this.headerWrapper) {
      const headerHeight = this.headerWrapper.offsetHeight;
      document.documentElement.style.setProperty('--transparent-header-height', `${headerHeight}px`);
    }
  }

  bindMenuEvents() {
    // Handle menu dropdowns and ensure they have proper styling
    const menuItems = this.headerWrapper?.querySelectorAll('.header__menu-item');
    
    menuItems?.forEach(item => {
      item.addEventListener('mouseenter', () => {
        // Ensure dropdown menus have proper background when header is transparent
        const submenu = item.querySelector('.header__submenu, .mega-menu__content');
        if (submenu && !this.isScrolled) {
          submenu.style.background = 'rgba(var(--color-background), 0.95)';
          submenu.style.backdropFilter = 'blur(20px)';
        }
      });
    });
  }

  checkFirstSection() {
    // Check if the first section after header should trigger transparent mode
    const firstSection = document.querySelector('.section-header + .shopify-section');
    
    if (firstSection) {
      const banner = firstSection.querySelector('.banner');
      const videoBanner = firstSection.querySelector('[class*="video"]');
      const imageBanner = firstSection.querySelector('.banner__media');
      
      // Add class to banner if it should work with transparent header
      if (banner && (videoBanner || imageBanner)) {
        banner.classList.add('banner--with-transparent-header');
      }
    }
  }

  // Throttle function for performance optimization
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  // Public method to manually trigger state update
  update() {
    this.handleScroll();
  }

  // Public method to force transparent state
  forceTransparent(transparent = true) {
    if (transparent) {
      this.headerWrapper?.classList.add('header-wrapper--transparent');
    } else {
      this.headerWrapper?.classList.remove('header-wrapper--transparent');
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.transparentHeader = new TransparentHeader();
});

// Handle theme editor updates
document.addEventListener('shopify:section:load', () => {
  // Reinitialize if header section is reloaded
  setTimeout(() => {
    window.transparentHeader = new TransparentHeader();
  }, 100);
});

// Export for manual usage
window.TransparentHeader = TransparentHeader;
