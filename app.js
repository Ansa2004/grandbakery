// Grand Bakery Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation Elements
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            console.log('Mobile menu toggled');
        });
    }
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            
            // Handle smooth scrolling
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href);
            }
        });
    });
    
    // Smooth scrolling function
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            console.log('Scrolling to:', targetId);
        }
    }
    
    // Handle View Products button
    const viewProductsBtn = document.querySelector('a[href="#products"]');
    if (viewProductsBtn) {
        viewProductsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('#products');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navToggle) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
    
    // Header Scroll Effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        if (!header) return;
        
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (currentScrollTop > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = currentScrollTop;
    });
    
    // Active Navigation Link Highlighting
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = header ? header.offsetHeight : 80;
        const scrollPosition = window.scrollY + headerHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    // Add active class styling
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            background-color: var(--bakery-light-brown) !important;
            color: var(--bakery-brown) !important;
            font-weight: 600 !important;
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', highlightActiveNavLink);
    
    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(`
        .section-header,
        .product-category,
        .service-item,
        .highlight-item,
        .contact-item,
        .about-content > *
    `);
    
    // Set initial styles and observe elements
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Special animation for hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 500); // Start after 500ms, then 200ms intervals
    });
    
    // Hover Effects for Product Cards
    const productCards = document.querySelectorAll('.product-category');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
    
    // Hover Effects for Service Items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.03)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)';
        });
    });
    
    // Phone Number Click Tracking and Functionality
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Phone number clicked:', this.href);
            // The browser will handle the tel: link automatically
            // No need to prevent default - let it open dialer
        });
    });
    
    // Loading Animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add loaded class styling
        const loadedStyle = document.createElement('style');
        loadedStyle.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            body.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(loadedStyle);
    });
    
   
    // const scrollToTopBtn = document.createElement('button');
    // scrollToTopBtn.innerHTML = '↑';
    // scrollToTopBtn.className = 'scroll-to-top';
    // scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    // scrollToTopBtn.style.cssText = `
    //     position: fixed;
    //     bottom: 30px;
    //     right: 30px;
    //     width: 50px;
    //     height: 50px;
    //     background-color: var(--bakery-brown);
    //     color: white;
    //     border: none;
    //     border-radius: 50%;
    //     font-size: 20px;
    //     font-weight: bold;
    //     cursor: pointer;
    //     opacity: 0;
    //     visibility: hidden;
    //     transition: all 0.3s ease;
    //     z-index: 1000;
    //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    // `;
    
    // document.body.appendChild(scrollToTopBtn);
    
    // scrollToTopBtn.addEventListener('click', function() {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // });
    
   
    // window.addEventListener('scroll', function() {
    //     if (window.scrollY > 500) {
    //         scrollToTopBtn.style.opacity = '1';
    //         scrollToTopBtn.style.visibility = 'visible';
    //     } else {
    //         scrollToTopBtn.style.opacity = '0';
    //         scrollToTopBtn.style.visibility = 'hidden';
    //     }
    // });
    
  
    // scrollToTopBtn.addEventListener('mouseenter', function() {
    //     this.style.transform = 'scale(1.1)';
    //     this.style.backgroundColor = 'var(--bakery-dark-brown)';
    // });
    
    // scrollToTopBtn.addEventListener('mouseleave', function() {
    //     this.style.transform = 'scale(1)';
    //     this.style.backgroundColor = 'var(--bakery-brown)';
    // });
    
    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    });
    
    // Focus management for accessibility
    if (navToggle) {
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Initialize highlight on page load
    setTimeout(highlightActiveNavLink, 100);
    
    // Ensure all images are loaded properly
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
        });
        
        img.addEventListener('load', function() {
            console.log('Image loaded successfully:', this.src);
        });
    });
    
    console.log('Grand Bakery website loaded successfully!');
    console.log('Found', navLinks.length, 'navigation links');
    console.log('Found', phoneLinks.length, 'phone links');
});