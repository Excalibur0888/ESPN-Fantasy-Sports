document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (burgerMenu && mobileMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add shadow to navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Add scroll reveal functionality
    const elementsToReveal = [
        '.feature-card',
        '.service-card',
        '.team-member',
        '.value-card',
        '.advantage-item',
        '.help-item',
        '.partner-item',
        '.stat-box',
        '.benefit-item',
        '.transparency-item',
        '.skill-feature'
    ];

    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('scroll-reveal');
        });
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element comes into view
    });

    // Observe all elements with scroll-reveal class
    document.querySelectorAll('.scroll-reveal').forEach(element => {
        observer.observe(element);
    });

    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', () => {
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current accordion item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Add scroll reveal for accordion items
    const accordionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                accordionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.accordion-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        accordionObserver.observe(item);
    });
}); 

function checkAgeVerification() {
	const verified = localStorage.getItem('ageVerified');
	if (verified === 'true') {
			document.getElementById('ageVerificationModal').style.display = 'none';
	}
}

function verifyAge(isAdult) {
	if (isAdult) {
			localStorage.setItem('ageVerified', 'true');
			document.getElementById('ageVerificationModal').style.display = 'none';
	} else {
			window.location.href = 'https://www.google.com';
	}
}

// Check age verification on page load
document.addEventListener('DOMContentLoaded', checkAgeVerification);