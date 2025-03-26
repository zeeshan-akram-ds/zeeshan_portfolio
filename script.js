// Declare projectCards and skillCards at the top
const projectCards = document.querySelectorAll('.project-card');
const skillCards = document.querySelectorAll('.skill-card');

// Toggle hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    themeToggle.textContent = body.classList.contains('light-mode') ? '☀️' : '🌙';
});

// Smooth scrolling for navbar links and other smooth-scroll links
const navLinks = document.querySelectorAll('.nav-link');
const currentSection = document.querySelector('.current-section');

document.querySelectorAll('.nav-link, .smooth-scroll').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default anchor jump

        // Get the target section ID from the href attribute (e.g., "#skills")
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Get the height of the fixed navbar
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            // Get the position of the target section relative to the top of the document
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;

            // Scroll to the target position, offset by the navbar height
            window.scrollTo({
                top: targetPosition - navbarHeight,
                behavior: 'smooth'
            });

            // Update the active class and current section for navbar links only
            if (link.classList.contains('nav-link')) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                currentSection.textContent = link.textContent;

                // Close the mobile menu if it's open (with a slight delay for better UX)
                if (navMenu.classList.contains('active')) {
                    setTimeout(() => {
                        navMenu.classList.remove('active');
                    }, 300);
                }
            }
        }
    });
});

// Fade-in animation for About, Projects, Skills, and Contact sections on scroll
const sections = document.querySelectorAll('.about-content, .projects-content, .skills-content, .contact-content, .resume-content');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('projects-content')) {
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
            }
            if (entry.target.classList.contains('skills-content')) {
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                        const progress = card.querySelector('.progress');
                        const progressValue = progress.getAttribute('data-progress');
                        progress.style.width = `${progressValue}%`;
                    }, index * 200);
                });
            }
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Project filter functionality
const projectFilterButtons = document.querySelectorAll('.project-filters .filter-btn');

projectFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        projectFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');
        projectCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Skill filter functionality
const skillFilterButtons = document.querySelectorAll('.skill-filters .filter-btn');

skillFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        skillFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');
        skillCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal functionality for Projects
const readMoreButtons = document.querySelectorAll('.read-more');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

readMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'flex';
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Contact form functionality
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Create a FormData object to collect the form data
    const formData = new FormData(contactForm);

    // Send the form data to Formspree using fetch (AJAX)
    fetch('https://formspree.io/f/mzzevkny', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Submission was successful
            successMessage.style.display = 'block';
            contactForm.reset();
            successMessage.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            // Submission failed
            alert('There was an error submitting your form. Please try again later.');
        }
    })
    .catch(error => {
        // Network error or other issue
        alert('There was an error submitting your form. Please try again later.');
        console.error('Form submission error:', error);
    });
});

contactForm.addEventListener('input', () => {
    successMessage.style.display = 'none';
});

// Copy-to-clipboard functionality
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const textToCopy = button.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
            const copyMessage = button.nextElementSibling;
            copyMessage.style.display = 'inline';
            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000);
        });
    });
});
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
