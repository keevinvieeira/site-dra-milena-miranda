document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. HEADER SCROLL EFFECT
       ========================================================================== */
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once in case page loads scrolled down

    /* ==========================================================================
       2. MOBILE MENU NAVIGATION
       ========================================================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('open');
        
        // Animating hamburger bars
        const bars = menuToggle.querySelectorAll('.bar');
        if (mobileMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(6px, 5deg)';
            bars[1].style.transform = 'rotate(-45deg) translate(6px, -5deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.transform = 'none';
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       3. BEFORE & AFTER INTERACTIVE SLIDER
       ========================================================================== */
    const sliderRange = document.getElementById('before-after-slider');
    const imageBefore = document.querySelector('.image-before');
    const sliderLine = document.getElementById('slider-line');
    const sliderButton = document.getElementById('slider-button');

    if (sliderRange && imageBefore && sliderLine && sliderButton) {
        const updateSlider = (value) => {
            // Update the clip-path of the top image (Before)
            imageBefore.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
            // Position the gold slider bar and button
            sliderLine.style.left = `${value}%`;
            sliderButton.style.left = `${value}%`;
        };

        // Listen for input (dragging slider)
        sliderRange.addEventListener('input', (e) => {
            const value = e.target.value;
            updateSlider(value);
        });

        // Initialize slider position
        updateSlider(50);
    }

    /* ==========================================================================
       4. CLINIC OFFICE GALLERY CAROUSEL
       ========================================================================== */
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.carousel-btn-right');
    const prevBtn = document.querySelector('.carousel-btn-left');
    const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));
    let currentSlideIndex = 0;
    let autoplayTimer = null;

    if (slides.length > 0) {
        const updateCarousel = (index) => {
            // Remove active classes
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            
            // Set new active slide & indicator
            currentSlideIndex = index;
            slides[currentSlideIndex].classList.add('active');
            indicators[currentSlideIndex].classList.add('active');
        };

        const nextSlide = () => {
            let nextIndex = currentSlideIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            updateCarousel(nextIndex);
        };

        const prevSlide = () => {
            let prevIndex = currentSlideIndex - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            updateCarousel(prevIndex);
        };

        // Click actions
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                updateCarousel(index);
                resetAutoplay();
            });
        });

        // Autoplay logic
        const startAutoplay = () => {
            autoplayTimer = setInterval(nextSlide, 5000); // changes slides every 5s
        };

        const resetAutoplay = () => {
            clearInterval(autoplayTimer);
            startAutoplay();
        };

        startAutoplay();

        // Pause autoplay on mouse hover
        const container = document.querySelector('.carousel-container');
        if (container) {
            container.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
            container.addEventListener('mouseleave', startAutoplay);
        }
    }

    /* ==========================================================================
       5. FADE-IN SCROLL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const animElements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.15 // triggers when 15% of element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animElements.forEach(element => observer.observe(element));
    } else {
        // Fallback for older browsers
        animElements.forEach(element => element.classList.add('visible'));
    }

    /* ==========================================================================
       6. COOKIE CONSENT BANNER, UTM CAPTURE & STANDARD EVENTS (NO PII)
       ========================================================================== */
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }

    const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const readUtms = () => {
        const params = new URLSearchParams(window.location.search);
        const fromUrl = {};
        UTM_KEYS.forEach((key) => {
            const val = params.get(key);
            if (val) fromUrl[key] = val.slice(0, 100);
        });
        if (Object.keys(fromUrl).length > 0) {
            try { sessionStorage.setItem('siteUtms', JSON.stringify(fromUrl)); } catch (e) {}
            return fromUrl;
        }
        try {
            const saved = sessionStorage.getItem('siteUtms');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    };

    const activeUtms = readUtms();

    const updateConsentMode = (granted) => {
        const state = granted ? 'granted' : 'denied';
        gtag('consent', 'update', {
            ad_storage: state,
            ad_user_data: state,
            ad_personalization: state,
            analytics_storage: state
        });
    };

    const storedConsent = localStorage.getItem('cookieConsent');
    const pushSiteEvent = (eventName) => {
        window.dataLayer.push({ event: eventName, ...activeUtms });
    };

    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');

    if (cookieBanner && cookieAccept && cookieReject) {
        if (!storedConsent) {
            setTimeout(() => {
                cookieBanner.classList.add('active');
            }, 1500);
        }

        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            updateConsentMode(true);
            cookieBanner.classList.remove('active');
        });

        cookieReject.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'rejected');
            updateConsentMode(false);
            cookieBanner.classList.remove('active');
        });
    }

    const utmQuery = new URLSearchParams(activeUtms).toString();
    document.querySelectorAll('a[href]').forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (href.includes('contato_whatsapp.html') || href.includes('wa.me/')) {
            if (utmQuery && href.includes('contato_whatsapp.html') && !href.includes('?')) {
                link.setAttribute('href', `${href}?${utmQuery}`);
            }
            link.addEventListener('click', () => {
                pushSiteEvent('whatsapp_click');
                pushSiteEvent('cta_click');
            });
        } else if (href.startsWith('tel:')) {
            link.addEventListener('click', () => {
                pushSiteEvent('phone_click');
            });
        } else if (href.startsWith('http') && !href.includes('mmiranda.odo.br')) {
            link.addEventListener('click', () => {
                pushSiteEvent('outbound_click');
            });
        }
    });

    let scroll75Sent = false;
    window.addEventListener('scroll', () => {
        if (scroll75Sent) return;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0 && (window.scrollY / docHeight) >= 0.75) {
            scroll75Sent = true;
            pushSiteEvent('scroll_75');
        }
    }, { passive: true });

});
