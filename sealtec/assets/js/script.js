/*===== MOBILE NAVIGATION =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove menu mobile
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*===== STICKY HEADER =====*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/*===== SMOOTH SCROLLING =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*===== SCROLL ANIMATIONS =====*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service__card, .about__feature, .testimonial__card, .portfolio__item, .hero__content');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

/*===== ACTIVE NAVIGATION LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active-link');
        } else {
            navLink?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*===== CONTACT FORM HANDLING =====*/
const contactForm = document.getElementById('contact-form');

// Form validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s+/g, ''));
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.form__error') || document.createElement('div');
    
    input.classList.add('error');
    input.classList.remove('success');
    
    if (!formGroup.querySelector('.form__error')) {
        error.className = 'form__error show';
        error.textContent = message;
        formGroup.appendChild(error);
    } else {
        error.textContent = message;
        error.classList.add('show');
    }
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.form__error');
    
    input.classList.remove('error');
    input.classList.add('success');
    
    if (error) {
        error.classList.remove('show');
    }
}

function validateForm() {
    let isValid = true;
    
    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    
    // Validate name
    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    } else {
        showSuccess(name);
    }
    
    // Validate email
    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        showSuccess(email);
    }
    
    // Validate phone
    if (phone.value.trim() === '') {
        showError(phone, 'Phone number is required');
        isValid = false;
    } else if (!validatePhone(phone.value.trim())) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    } else {
        showSuccess(phone);
    }
    
    // Validate message
    if (message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    } else {
        showSuccess(message);
    }
    
    return isValid;
}

// Real-time validation
document.getElementById('name')?.addEventListener('blur', function() {
    if (this.value.trim() !== '') {
        if (this.value.trim().length < 2) {
            showError(this, 'Name must be at least 2 characters');
        } else {
            showSuccess(this);
        }
    }
});

document.getElementById('email')?.addEventListener('blur', function() {
    if (this.value.trim() !== '') {
        if (!validateEmail(this.value.trim())) {
            showError(this, 'Please enter a valid email address');
        } else {
            showSuccess(this);
        }
    }
});

document.getElementById('phone')?.addEventListener('blur', function() {
    if (this.value.trim() !== '') {
        if (!validatePhone(this.value.trim())) {
            showError(this, 'Please enter a valid phone number');
        } else {
            showSuccess(this);
        }
    }
});

document.getElementById('message')?.addEventListener('blur', function() {
    if (this.value.trim() !== '') {
        if (this.value.trim().length < 10) {
            showError(this, 'Message must be at least 10 characters');
        } else {
            showSuccess(this);
        }
    }
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Show success message
                showFormSuccess();
                
                // Reset form
                this.reset();
                
                // Remove validation classes
                const inputs = this.querySelectorAll('.form__input');
                inputs.forEach(input => {
                    input.classList.remove('success', 'error');
                    const error = input.parentElement.querySelector('.form__error');
                    if (error) {
                        error.classList.remove('show');
                    }
                });
                
            }, 2000); // Simulate 2 second processing time
        }
    });
}

function showFormSuccess() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--emerald-green);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
            width: 90%;
        ">
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem; color: white;"></i>
            <h3 style="margin: 0 0 1rem 0; color: white;">Thank You!</h3>
            <p style="margin: 0; color: white;">Your message has been sent successfully. We'll get back to you within 24 hours.</p>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        "></div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove success message after 4 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 4000);
    
    // Remove on click
    successMessage.addEventListener('click', () => {
        successMessage.remove();
    });
}

/*===== SCROLL TO TOP BUTTON =====*/
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background-color: var(--emerald-green);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(80, 200, 120, 0.3);
    `;
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

/*===== LAZY LOADING FOR IMAGES =====*/
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

/*===== PERFORMANCE OPTIMIZATIONS =====*/
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedScrollActive = debounce(scrollActive, 10);

window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollActive);
window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedScrollActive);

/*===== ACCESSIBILITY ENHANCEMENTS =====*/
// Keyboard navigation for mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            document.getElementById('nav-toggle').focus();
        }
    }
});

// Focus management for mobile menu
const navToggleBtn = document.getElementById('nav-toggle');
const navCloseBtn = document.getElementById('nav-close');

if (navToggleBtn) {
    navToggleBtn.addEventListener('click', () => {
        setTimeout(() => {
            navCloseBtn?.focus();
        }, 100);
    });
}

/*===== PRELOADER (OPTIONAL) =====*/
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid var(--emerald-green);
                border-top: 3px solid transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
}

// Uncomment to enable preloader
// document.addEventListener('DOMContentLoaded', initPreloader);

/*===== ANALYTICS TRACKING (PLACEHOLDER) =====*/
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, properties);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, properties);
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', () => {
    // Track CTA clicks
    document.querySelectorAll('.btn--primary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            trackEvent('cta_click', {
                button_text: btn.textContent.trim(),
                button_location: btn.closest('section')?.id || 'unknown'
            });
        });
    });
    
    // Track phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('phone_click', {
                phone_number: link.href.replace('tel:', '')
            });
        });
    });
    
    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('email_click', {
                email: link.href.replace('mailto:', '')
            });
        });
    });
});


// Notification system for success messages
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        font-size: 14px;
        font-weight: 500;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add slide animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

/*===== ENHANCED ANALYTICS TRACKING =====*/
function trackEvent(eventName, properties = {}) {
    // Enhanced tracking with more context
    const enhancedProperties = {
        ...properties,
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_size: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
    };
    
    console.log('Event tracked:', eventName, enhancedProperties);
    
    // Send to analytics services
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, enhancedProperties);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, enhancedProperties);
    }
    
    // You can add more analytics services here
    // Example: Mixpanel, Segment, etc.
}


/*===== INITIALIZE ALL FEATURES =====*/
document.addEventListener('DOMContentLoaded', () => {
    console.log('SealTec roof website loaded successfully!');
    
    // Enhanced service card interactions
    document.querySelectorAll('.service__card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Track service card interactions
        card.addEventListener('click', function() {
            const serviceTitle = this.querySelector('.service__title')?.textContent || 'Unknown Service';
            trackEvent('service_card_click', {
                service_name: serviceTitle
            });
        });
    });
    
    // Track time spent on page
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage += 10;
        if (timeOnPage % 30 === 0) { // Every 30 seconds
            trackEvent('time_on_page', {
                seconds: timeOnPage,
                milestone: `${timeOnPage}s`
            });
        }
    }, 10000); // Check every 10 seconds
    
    // Track scroll depth
    let maxScrollPercent = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScrollPercent) {
            maxScrollPercent = scrollPercent;
            
            // Track major scroll milestones
            if ([25, 50, 75, 90, 100].includes(scrollPercent)) {
                trackEvent('scroll_depth', {
                    percent: scrollPercent,
                    milestone: `${scrollPercent}%`
                });
            }
        }
    });
});

/*===== ERROR HANDLING =====*/
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});

/*===== COOKIE CONSENT =====*/
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');

    if (!banner || !acceptBtn || !rejectBtn) return;

    if (localStorage.getItem('cookieConsent')) {
        banner.style.display = 'none';
        return;
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.style.display = 'none';
        // тут пізніше можна підключити Google Analytics
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        banner.style.display = 'none';
    });
});

