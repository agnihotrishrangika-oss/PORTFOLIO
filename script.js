// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const backToTop = document.querySelector('.back-to-top');
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Animate skill bars when they come into view
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
                
                // Animate project numbers
                const projectNumbers = document.querySelectorAll('.project-number');
                projectNumbers.forEach((number, index) => {
                    number.style.opacity = '0';
                    number.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        number.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        number.style.opacity = '1';
                        number.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe skills and projects sections
    const skillsSection = document.getElementById('skills');
    const projectsSection = document.getElementById('projects');
    
    if (skillsSection) observer.observe(skillsSection);
    if (projectsSection) observer.observe(projectsSection);
    
    // Add hover effect to achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.achievement-icon i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.achievement-icon i');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-copyright p:first-child');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
    
    // Add typing effect for hero subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add scroll reveal animation for sections
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, revealOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
        revealObserver.observe(section);
    });
    
    // Add CSS for reveal animation
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyle);
    
    // Add particle effect to hero section (optional)
    const heroSection = document.querySelector('.hero');
    if (heroSection && window.innerWidth > 768) {
        const particlesStyle = document.createElement('style');
        particlesStyle.textContent = `
            .hero::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(2px 2px at 20px 30px, rgba(157, 78, 221, 0.3), transparent),
                    radial-gradient(2px 2px at 40px 70px, rgba(0, 187, 249, 0.3), transparent),
                    radial-gradient(1px 1px at 90px 40px, rgba(255, 107, 107, 0.3), transparent),
                    radial-gradient(2px 2px at 150px 120px, rgba(78, 205, 196, 0.3), transparent);
                background-repeat: repeat;
                background-size: 300px 300px;
                animation: float 20s infinite linear;
                pointer-events: none;
                z-index: -1;
            }
            
            @keyframes float {
                0% { transform: translateY(0) translateX(0); }
                100% { transform: translateY(-300px) translateX(300px); }
            }
        `;
        document.head.appendChild(particlesStyle);
    }
    
    // FIXED: Add statistics counter animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const originalText = stat.textContent.trim();
        
        // Store original value for 100 (it should remain 100)
        if (originalText === '100') {
            return; // Skip animation for 100, keep it as is
        }
        
        // Check if it's a decimal number (8.96)
        if (originalText.includes('.')) {
            const targetValue = parseFloat(originalText);
            const decimalPlaces = originalText.split('.')[1].length;
            let currentValue = 0;
            
            // Temporary set to 0 for animation start
            stat.textContent = '0.0';
            
            const interval = setInterval(() => {
                currentValue += 0.1;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(interval);
                }
                stat.textContent = currentValue.toFixed(decimalPlaces);
            }, 40);
        } 
        // For whole numbers (like "1" for badminton positions)
        else if (!isNaN(parseInt(originalText))) {
            const targetValue = parseInt(originalText);
            let currentValue = 0;
            
            // Temporary set to 0 for animation start
            stat.textContent = '0';
            
            const interval = setInterval(() => {
                currentValue += 1;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(interval);
                }
                stat.textContent = currentValue.toString();
            }, 100);
        }
    });
});