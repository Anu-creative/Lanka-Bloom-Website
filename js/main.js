// Lanka Bloom v2 — Main Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // Navigation Scroll Logic
    const nav = document.getElementById('main-nav');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    // Initial check on load
    handleScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animations
    const heroTl = gsap.timeline();
    
    heroTl.from(".hero-title span", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5
    });

    // Magnetic Button Effect (Premium Touch)
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // Parallax Effect for Collage Items & Images
    const parallaxes = document.querySelectorAll('[data-gsap="parallax"]');
    parallaxes.forEach(item => {
        const speed = item.getAttribute('data-speed') || 0.1;
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: (speed * 200), // Simple relative movement
            ease: "none"
        });
    });

    // Specific Logo Fade-In for Vision Section
    const logo = document.querySelector('[data-gsap="logo-fade"]');
    if (logo) {
        gsap.to(logo, {
            scrollTrigger: {
                trigger: logo,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        });
    }

    // Reveal Animations for Sections
    const reveals = document.querySelectorAll('[data-gsap^="reveal"]');
    reveals.forEach(el => {
        const direction = el.getAttribute('data-gsap');
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: direction === 'reveal-left' ? -80 : (direction === 'reveal-right' ? 80 : 0),
            y: direction === 'reveal-up' ? 50 : 0,
            duration: 1.5,
            ease: "power4.out"
        });
    });

    // Testimonial Slider Logic (Horizontal Slide)
    const sliderInner = document.querySelector('.testimonial-slider-inner');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;

    function showSlide(index) {
        if (!sliderInner || slides.length === 0) return;
        
        // Horizontal Translate
        sliderInner.style.transform = `translateX(-${index * 100}%)`;
        
        // Update Dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-rotate every 6 seconds
    setInterval(() => {
        if (slides.length > 0) {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }
    }, 6000);

    console.log("Lanka Bloom v2 Engine Initialized.");
});
