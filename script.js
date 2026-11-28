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
    
    if (menuToggle && mobileMenu) {
        const toggleMenu = () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');

            // Animating hamburger bars
            const bars = menuToggle.querySelectorAll('.bar');
            if (bars.length >= 2) {
                if (mobileMenu.classList.contains('active')) {
                    bars[0].style.transform = 'rotate(45deg) translate(6px, 5deg)';
                    bars[1].style.transform = 'rotate(-45deg) translate(6px, -5deg)';
                } else {
                    bars[0].style.transform = 'none';
                    bars[1].style.transform = 'none';
                }
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
    }

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
        const isWhatsappRoute =
            href.includes('agendar-consulta-odontologica-whatsapp-curitiba') ||
            href.includes('contato_whatsapp') ||
            href.includes('wa.me/');
        if (isWhatsappRoute) {
            if (
                utmQuery &&
                (href.includes('agendar-consulta-odontologica-whatsapp-curitiba') || href.includes('contato_whatsapp')) &&
                !href.includes('?')
            ) {
                link.setAttribute('href', `${href}?${utmQuery}`);
            }
            link.addEventListener('click', (ev) => {
                pushSiteEvent('whatsapp_click');
                pushSiteEvent('cta_click');
                ev.preventDefault();
                openLeadModal(link);
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


    /* ==========================================================================
       7. FORMULÁRIO DO BOTÃO DE WHATSAPP (nome + WhatsApp -> CRM -> wa.me)
       ========================================================================== */
    const WA_NUMBER = '5541997517055';
    const SUBJECTS = {
        '/coroa-dentaria-e-reabilitacao-oral-curitiba': ['Coroa dentária e reabilitação oral', 'saber mais sobre coroa dentária e reabilitação oral'],
        '/oclusao-e-funcao-oral-curitiba': ['Oclusão e função oral', 'saber mais sobre avaliação de oclusão e função oral'],
        '/harmonizacao-facial-odontologica-curitiba': ['Harmonização facial', 'saber mais sobre harmonização facial'],
        '/saude-bucal-integrativa-e-prevencao-curitiba': ['Saúde bucal e prevenção', 'saber mais sobre saúde bucal e prevenção'],
        '/consulta-odontologica-jardim-das-americas-curitiba-contato': ['Consulta avaliativa', 'agendar uma consulta avaliativa']
    };
    const DEFAULT_SUBJECT = ['Consulta avaliativa', 'agendar uma consulta avaliativa'];

    // Origem de entrada (primeiro referer externo da sessão), sem cookies.
    try {
        if (!sessionStorage.getItem('siteReferer') && document.referrer && !document.referrer.includes(location.host)) {
            sessionStorage.setItem('siteReferer', document.referrer.slice(0, 300));
        }
    } catch (e) {}

    const normalizePhone = (raw) => {
        let d = String(raw || '').replace(/\D/g, '');
        d = d.replace(/^0+/, '');
        if (d.length > 11 && d.startsWith('55')) d = d.slice(2);
        if (d.length === 8 || d.length === 9) d = '41' + d;
        if (!(d.length === 10 || d.length === 11)) return null;
        const ddd = Number(d.slice(0, 2));
        if (ddd < 11 || ddd > 99) return null;
        if (d.length === 11 && d[2] !== '9') return null;
        return d;
    };

    let leadModal = null;
    let leadLastFocus = null;

    const closeLeadModal = () => {
        if (!leadModal) return;
        leadModal.hidden = true;
        document.body.classList.remove('lead-open');
        if (leadLastFocus && leadLastFocus.focus) leadLastFocus.focus();
    };

    const onLeadSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const err = leadModal.querySelector('#lead-error');
        const btn = leadModal.querySelector('#lead-submit');
        const nome = form.nome.value.replace(/\s+/g, ' ').trim();
        const digits = normalizePhone(form.telefone.value);
        err.hidden = true;
        if (nome.length < 2) {
            err.textContent = 'Informe seu nome.';
            err.hidden = false;
            form.nome.focus();
            return;
        }
        if (!digits) {
            err.textContent = 'Informe um WhatsApp válido com DDD (ex.: 41 99999-9999).';
            err.hidden = false;
            form.telefone.focus();
            return;
        }
        btn.disabled = true;
        btn.textContent = 'Enviando...';
        const assunto = leadModal.dataset.assunto || DEFAULT_SUBJECT[0];
        const frase = leadModal.dataset.frase || DEFAULT_SUBJECT[1];
        let referer = null;
        try { referer = sessionStorage.getItem('siteReferer'); } catch (x) {}
        const payload = {
            nome: nome,
            telefone: '+55' + digits,
            pagina_origem: window.location.pathname,
            assunto: assunto,
            utm_source: activeUtms.utm_source || null,
            utm_medium: activeUtms.utm_medium || null,
            utm_campaign: activeUtms.utm_campaign || null,
            referer: referer,
            website: form.website.value,
            event_id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : ('lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10))
        };
        let saved = false;
        const ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
        const timer = setTimeout(() => { if (ctrl) ctrl.abort(); }, 4000);
        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'same-origin',
                signal: ctrl ? ctrl.signal : undefined
            });
            saved = res.ok;
        } catch (x) {
            saved = false;
        }
        clearTimeout(timer);
        if (saved) {
            // Evento sem dado pessoal, só depois de o CRM confirmar o recebimento.
            window.dataLayer.push({ event: 'generate_lead', lead_source: 'site_whatsapp', lead_subject: assunto, ...activeUtms });
        } else {
            // Falha segura: reenvio em segundo plano (mesmo event_id = sem duplicar) e contagem agregada, sem dado pessoal.
            try {
                if (navigator.sendBeacon) {
                    navigator.sendBeacon('/api/lead', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
                }
            } catch (x) {}
            window.dataLayer.push({ event: 'lead_save_failed', lead_source: 'site_whatsapp', ...activeUtms });
        }
        const text = 'Olá, Dra. Milena! Sou ' + nome + ' e gostaria de ' + frase + '.';
        // Mesmo se o CRM estiver fora do ar, o paciente não fica sem atendimento.
        window.location.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
    };

    const buildLeadModal = () => {
        const wrap = document.createElement('div');
        wrap.className = 'lead-modal';
        wrap.id = 'lead-modal';
        wrap.setAttribute('role', 'dialog');
        wrap.setAttribute('aria-modal', 'true');
        wrap.setAttribute('aria-labelledby', 'lead-title');
        wrap.hidden = true;
        wrap.innerHTML =
            '<div class="lead-backdrop" data-lead-close></div>' +
            '<div class="lead-card">' +
            '<button type="button" class="lead-close" aria-label="Fechar" data-lead-close>&times;</button>' +
            '<span class="section-tag">Atendimento</span>' +
            '<h2 id="lead-title" class="lead-title">Falar com a Dra. Milena pelo WhatsApp</h2>' +
            '<p class="lead-sub">Informe seu nome e WhatsApp para continuarmos a conversa.</p>' +
            '<form id="lead-form" novalidate>' +
            '<label class="lead-label" for="lead-nome">Nome</label>' +
            '<input class="lead-input" id="lead-nome" name="nome" type="text" autocomplete="name" maxlength="80" required>' +
            '<label class="lead-label" for="lead-tel">WhatsApp com DDD</label>' +
            '<input class="lead-input" id="lead-tel" name="telefone" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="(41) 99999-9999" maxlength="20" required>' +
            '<div class="lead-hp" aria-hidden="true"><label>Não preencher<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
            '<p class="lead-error" id="lead-error" role="alert" hidden></p>' +
            '<button type="submit" class="btn btn-primary lead-submit" id="lead-submit">Continuar no WhatsApp</button>' +
            '<p class="lead-lgpd">Usamos seu nome e telefone apenas para retornar o contato e agendar sua avaliação. Saiba mais na <a href="/politica-de-privacidade-lgpd" target="_blank" rel="noopener">Política de Privacidade</a>.</p>' +
            '</form>' +
            '</div>';
        document.body.appendChild(wrap);
        wrap.addEventListener('click', (e) => {
            if (e.target && e.target.hasAttribute && e.target.hasAttribute('data-lead-close')) closeLeadModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && leadModal && !leadModal.hidden) closeLeadModal();
        });
        wrap.querySelector('#lead-form').addEventListener('submit', onLeadSubmit);
        return wrap;
    };

    const openLeadModal = (link) => {
        if (!leadModal) leadModal = buildLeadModal();
        const path = window.location.pathname.replace(/\/+$/, '') || '/';
        const preset = (link && link.dataset && link.dataset.assunto)
            ? [link.dataset.assunto, link.dataset.assuntoFrase || ('falar sobre ' + link.dataset.assunto.toLowerCase())]
            : (SUBJECTS[path] || DEFAULT_SUBJECT);
        leadModal.dataset.assunto = preset[0];
        leadModal.dataset.frase = preset[1];
        leadLastFocus = document.activeElement;
        leadModal.querySelector('#lead-error').hidden = true;
        const btn = leadModal.querySelector('#lead-submit');
        btn.disabled = false;
        btn.textContent = 'Continuar no WhatsApp';
        leadModal.hidden = false;
        document.body.classList.add('lead-open');
        setTimeout(() => { const f = leadModal.querySelector('#lead-nome'); if (f) f.focus(); }, 50);
    };

    window.__openLeadModal = openLeadModal;
    if (document.body && document.body.hasAttribute('data-lead-autoopen')) {
        openLeadModal(null);
    }

});
