document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to navigation links on scroll
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        document.querySelectorAll('section').forEach(section => {
            if (scrollPosition >= section.offsetTop - 100 && scrollPosition < section.offsetTop + section.offsetHeight - 100) {
                const currentId = section.attributes.id.value;
                document.querySelector(`.navbar-nav a[href="#${currentId}"]`).classList.add('active');
            } else {
                const currentId = section.attributes.id.value;
                document.querySelector(`.navbar-nav a[href="#${currentId}"]`).classList.remove('active');
            }
        });
    });

    // Goals carousel
    const goalSlides = document.querySelectorAll('.goals-slide');
    const prevGoalBtn = document.querySelector('.prev-goal');
    const nextGoalBtn = document.querySelector('.next-goal');
    let currentGoalIndex = 0;

    function showGoalSlide(index) {
        goalSlides.forEach(slide => slide.classList.remove('active'));
        goalSlides[index].classList.add('active');
    }

    prevGoalBtn.addEventListener('click', () => {
        currentGoalIndex = (currentGoalIndex - 1 + goalSlides.length) % goalSlides.length;
        showGoalSlide(currentGoalIndex);
    });

    nextGoalBtn.addEventListener('click', () => {
        currentGoalIndex = (currentGoalIndex + 1) % goalSlides.length;
        showGoalSlide(currentGoalIndex);
    });

    // Success stories carousel
    const storyCards = document.querySelectorAll('.story-card');
    const prevStoryBtn = document.querySelector('.prev-story');
    const nextStoryBtn = document.querySelector('.next-story');
    let currentStoryIndex = 0;

    function showStoryCard(index) {
        storyCards.forEach(card => card.classList.remove('active'));
        storyCards[index].classList.add('active');
    }

    prevStoryBtn.addEventListener('click', () => {
        currentStoryIndex = (currentStoryIndex - 1 + storyCards.length) % storyCards.length;
        showStoryCard(currentStoryIndex);
    });

    nextStoryBtn.addEventListener('click', () => {
        currentStoryIndex = (currentStoryIndex + 1) % storyCards.length;
        showStoryCard(currentStoryIndex);
    });

    // Initialize carousels
    showGoalSlide(0);
    showStoryCard(0);

    // Counter animation for impact statistics
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            if (start >= target) {
                clearInterval(timer);
                element.textContent = target;
            }
        }, 16);
    }

    // Animate counters when in view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.counter').forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const impactSection = document.querySelector('#impact');
    if (impactSection) {
        observer.observe(impactSection);
    }

    // Add a back-to-top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&uarr;';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Add a simple form validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            if (name && email && message) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Program cards hover effect
    const programCards = document.querySelectorAll('.program-card');

    programCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
});