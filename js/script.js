/* ==========================================
   JAY VIJAY PEST CONTROL - JS INTERACTION
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Overlay Handler
    const loader = document.getElementById('loader-overlay');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        });
        // Fallback if load event already fired or delayed
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 1500);
    }

    // 2. Dismissible Top Banner Promo
    const topBanner = document.getElementById('top-promo-banner');
    const closeBannerBtn = document.getElementById('close-banner-btn');
    const body = document.body;

    if (topBanner && closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            topBanner.style.transform = 'translateY(-100%)';
            topBanner.style.opacity = '0';
            setTimeout(() => {
                topBanner.style.display = 'none';
                body.classList.add('top-banner-hidden');
            }, 300);
        });
    }

    // 3. Sticky Navbar & Header scroll feedback
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 4. Mobile Menu & Hamburger Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    toggleMobileMenu();
                }
            });
        });

        // Close menu when clicking outside of navbar
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMobileMenu();
            }
        });
    }

    function toggleMobileMenu() {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
        if (navMenu.classList.contains('open')) {
            body.style.overflow = 'hidden'; // Lock background scrolling
        } else {
            body.style.overflow = '';
        }
    }

    // 5. Scroll-Reveal Animation Engine
    const revealElements = document.querySelectorAll('.reveal');
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', checkReveal);
    // Initial check on load
    setTimeout(checkReveal, 200);

    // 6. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Testimonials Carousel Slider Track
    const track = document.getElementById('testimonials-track');
    const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const prevBtn = document.getElementById('testimonials-prev');
    const nextBtn = document.getElementById('testimonials-next');
    const dotsContainer = document.getElementById('testimonials-dots');

    if (track && slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;

        // Create navigation dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }

        // Set listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoplay();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoplay();
            });
        }

        // Autoplay
        function startAutoplay() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        function resetAutoplay() {
            clearInterval(slideInterval);
            startAutoplay();
        }
        startAutoplay();

        // Support Swipe Gestures on Mobile
        let touchStartX = 0;
        let touchEndX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            if (swipeDistance < -50) {
                nextSlide();
                resetAutoplay();
            } else if (swipeDistance > 50) {
                prevSlide();
                resetAutoplay();
            }
        }
    }

    // 8. Reusable Booking Modal Manager
    const bookingModal = document.getElementById('booking-modal');
    const closeModalBtn = document.getElementById('close-booking-modal');
    const bookingForm = document.getElementById('whatsapp-booking-form');
    const confirmBanner = document.getElementById('booking-confirm-banner');
    const confirmBannerClose = document.getElementById('close-confirm-banner');

    if (bookingModal) {
        // Find all booking triggers on page
        const bookingButtons = document.querySelectorAll('.open-booking-modal-btn');
        bookingButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get pre-tagged info
                const targetService = btn.getAttribute('data-service');
                const targetPackage = btn.getAttribute('data-package');
                
                openModal(targetService || targetPackage);
            });
        });

        // Close button click
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        // Outside click close
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeModal();
            }
        });

        // Escape Key close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && bookingModal.classList.contains('open')) {
                closeModal();
            }
        });

        // Close confirm banner
        if (confirmBanner && confirmBannerClose) {
            confirmBannerClose.addEventListener('click', () => {
                confirmBanner.classList.remove('show');
            });
        }

        // Modal Form Submission
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (validateBookingForm()) {
                    submitBookingToWhatsApp();
                }
            });
        }
    }

    // Contact Page General Inquiry Form Manager
    const contactInquiryForm = document.getElementById('contact-inquiry-form');
    if (contactInquiryForm) {
        contactInquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateContactInquiryForm()) {
                submitContactInquiryToWhatsApp();
            }
        });
    }

    function validateContactInquiryForm() {
        let isValid = true;
        const nameInput = document.getElementById('contact-name');
        const mobileInput = document.getElementById('contact-mobile');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');

        if (nameInput) {
            const grp = nameInput.closest('.form-group');
            const err = grp.querySelector('.form-error');
            if (nameInput.value.trim().length < 2) {
                if (err) err.style.display = 'block';
                isValid = false;
            } else {
                if (err) err.style.display = 'none';
            }
        }

        if (mobileInput) {
            const grp = mobileInput.closest('.form-group');
            const err = grp.querySelector('.form-error');
            const mobileRegex = /^[6-9]\d{9}$/;
            if (!mobileRegex.test(mobileInput.value.trim())) {
                if (err) err.style.display = 'block';
                isValid = false;
            } else {
                if (err) err.style.display = 'none';
            }
        }

        if (emailInput && emailInput.value.trim() !== "") {
            const grp = emailInput.closest('.form-group');
            const err = grp.querySelector('.form-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                if (err) err.style.display = 'block';
                isValid = false;
            } else {
                if (err) err.style.display = 'none';
            }
        } else if (emailInput) {
            const grp = emailInput.closest('.form-group');
            const err = grp.querySelector('.form-error');
            if (err) err.style.display = 'none';
        }

        if (messageInput) {
            const grp = messageInput.closest('.form-group');
            const err = grp.querySelector('.form-error');
            if (messageInput.value.trim().length < 10) {
                if (err) err.style.display = 'block';
                isValid = false;
            } else {
                if (err) err.style.display = 'none';
            }
        }

        return isValid;
    }

    function submitContactInquiryToWhatsApp() {
        const name = document.getElementById('contact-name').value.trim();
        const mobile = document.getElementById('contact-mobile').value.trim();
        const email = document.getElementById('contact-email').value.trim() || 'Not provided';
        const message = document.getElementById('contact-message').value.trim();

        const waText = `New General Inquiry - Jay Vijay Pest Control\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nInquiry Message: ${message}\n\nPlease respond to this inquiry.`;
        const encodedMessage = encodeURIComponent(waText);
        const waURL = "https://wa.me/919922464685?text=" + encodedMessage;

        window.open(waURL, "_blank");

        if (contactInquiryForm) {
            contactInquiryForm.reset();
        }

        const confirmBanner = document.getElementById('booking-confirm-banner');
        if (confirmBanner) {
            confirmBanner.classList.add('show');
            setTimeout(() => {
                confirmBanner.classList.remove('show');
            }, 12000);
        }
    }


    function openModal(preSelectedValue) {
        // Clear previous error messages
        const formGroups = bookingForm.querySelectorAll('.form-group');
        formGroups.forEach(grp => {
            grp.classList.remove('has-error');
        });

        // Reset the form
        bookingForm.reset();

        // If something was pre-selected, select it in the dropdown
        if (preSelectedValue) {
            const serviceSelect = document.getElementById('booking-service');
            if (serviceSelect) {
                // Try direct value matching
                let foundMatch = false;
                for (let i = 0; i < serviceSelect.options.length; i++) {
                    if (serviceSelect.options[i].value === preSelectedValue || serviceSelect.options[i].text.includes(preSelectedValue)) {
                        serviceSelect.selectedIndex = i;
                        foundMatch = true;
                        break;
                    }
                }
                // If it was standard/premium amc from pricing, handle properly
                if (!foundMatch) {
                    if (preSelectedValue.toLowerCase().includes('basic')) {
                        serviceSelect.value = "Basic Package (One-Time Treatment)";
                    } else if (preSelectedValue.toLowerCase().includes('standard')) {
                        serviceSelect.value = "Standard Package (Quarterly AMC)";
                    } else if (preSelectedValue.toLowerCase().includes('premium')) {
                        serviceSelect.value = "Premium Package (Comprehensive AMC)";
                    } else if (preSelectedValue.toLowerCase().includes('termite')) {
                        serviceSelect.value = "Termite Control & Inspection";
                    }
                }
            }
        }

        // Set default date to tomorrow
        const dateInput = document.getElementById('booking-date');
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.min = tomorrow.toISOString().split('T')[0];
            dateInput.value = tomorrow.toISOString().split('T')[0];
        }

        // Open modal with transitions
        bookingModal.classList.add('open');
        body.style.overflow = 'hidden'; // prevent page background scroll
        trapFocus(bookingModal);
    }

    function closeModal() {
        bookingModal.classList.remove('open');
        body.style.overflow = ''; // restore scrolling
    }

    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
        if (focusableElements.length === 0) return;
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        firstFocusable.focus();

        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // 9. Client-Side Form Validation
    function validateBookingForm() {
        let isValid = true;

        // Name Validation (required, min 2 chars)
        const nameInput = document.getElementById('booking-name');
        if (nameInput) {
            const grp = nameInput.closest('.form-group');
            if (nameInput.value.trim().length < 2) {
                grp.classList.add('has-error');
                isValid = false;
            } else {
                grp.classList.remove('has-error');
            }
        }

        // Mobile Validation (required, exactly 10 digits starting with 6-9)
        const mobileInput = document.getElementById('booking-mobile');
        if (mobileInput) {
            const grp = mobileInput.closest('.form-group');
            const mobileRegex = /^[6-9]\d{9}$/;
            if (!mobileRegex.test(mobileInput.value.trim())) {
                grp.classList.add('has-error');
                isValid = false;
            } else {
                grp.classList.remove('has-error');
            }
        }

        // Email Validation (optional, but must be valid if entered)
        const emailInput = document.getElementById('booking-email');
        if (emailInput && emailInput.value.trim() !== "") {
            const grp = emailInput.closest('.form-group');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                grp.classList.add('has-error');
                isValid = false;
            } else {
                grp.classList.remove('has-error');
            }
        } else if (emailInput) {
            emailInput.closest('.form-group').classList.remove('has-error');
        }

        // Service Needed Validation (required select)
        const serviceSelect = document.getElementById('booking-service');
        if (serviceSelect) {
            const grp = serviceSelect.closest('.form-group');
            if (serviceSelect.value === "") {
                grp.classList.add('has-error');
                isValid = false;
            } else {
                grp.classList.remove('has-error');
            }
        }

        // Address Validation (required)
        const addressInput = document.getElementById('booking-address');
        if (addressInput) {
            const grp = addressInput.closest('.form-group');
            if (addressInput.value.trim().length < 5) {
                grp.classList.add('has-error');
                isValid = false;
            } else {
                grp.classList.remove('has-error');
            }
        }

        // Date Validation (required)
        const dateInput = document.getElementById('booking-date');
        if (dateInput) {
            const grp = dateInput.closest('.form-group');
            if (dateInput.value === "") {
                grp.classList.add('has-error');
                isValid = false;
            } else {
                grp.classList.remove('has-error');
            }
        }

        // Time Slot Validation (required)
        const timeSelect = document.getElementById('booking-time');
        if (timeSelect) {
            const grp = timeSelect.closest('.form-group');
            if (timeSelect.value === "") {
                grp.classList.add('has-error');
                isValid = false;
            } else {
                grp.classList.remove('has-error');
            }
        }

        return isValid;
    }

    // 10. WhatsApp Form Submission & Message Construction
    function submitBookingToWhatsApp() {
        const name = document.getElementById('booking-name').value.trim();
        const mobile = document.getElementById('booking-mobile').value.trim();
        const email = document.getElementById('booking-email').value.trim() || 'Not provided';
        const service = document.getElementById('booking-service').value;
        const address = document.getElementById('booking-address').value.trim();
        const date = document.getElementById('booking-date').value;
        const timeSlot = document.getElementById('booking-time').value;
        const message = document.getElementById('booking-message').value.trim() || 'None';

        // Format Date nicely for WhatsApp message (YYYY-MM-DD to DD-MM-YYYY)
        let formattedDate = date;
        try {
            const parts = date.split('-');
            if (parts.length === 3) {
                formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
        } catch (err) {}

        // Construct message structure exactly as requested
        const waText = `New Booking Request - Jay Vijay Pest Control\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nService/Package: ${service}\nAddress: ${address}\nPreferred Date: ${formattedDate}\nPreferred Time Slot: ${timeSlot}\nMessage: ${message}\n\nPlease confirm this booking.`;

        // URL encode the text payload
        const encodedMessage = encodeURIComponent(waText);
        
        // Target booking desk phone number is +91 9922464685
        const waURL = "https://wa.me/919922464685?text=" + encodedMessage;

        // Open WhatsApp chat in a new tab
        window.open(waURL, "_blank");

        // Close the modal
        closeModal();

        // Show confirmation banner
        if (confirmBanner) {
            confirmBanner.classList.add('show');
            // Auto hide after 12 seconds
            setTimeout(() => {
                confirmBanner.classList.remove('show');
            }, 12000);
        }
    }

    // 11. Custom Page Gallery Filtering (Only runs on gallery.html if present)
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active button class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // 12. FAQ Accordion Click Handler
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                const answer = q.nextElementSibling;
                const isActive = item.classList.contains('active');

                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });

                // Toggle this FAQ item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        });
    }

    // 13. Dynamic Vanilla JS Lightbox
    const galleryItemsList = document.querySelectorAll('.gallery-item');
    if (galleryItemsList.length > 0) {
        // Create lightbox HTML structure dynamically
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';
        lightboxOverlay.id = 'lightbox-overlay';
        lightboxOverlay.innerHTML = `
            <button class="lightbox-close" id="lightbox-close" aria-label="Close Lightbox">&times;</button>
            <button class="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Previous Image"><i class="fas fa-chevron-left"></i></button>
            <div class="lightbox-container">
                <img src="" alt="" class="lightbox-img" id="lightbox-img">
            </div>
            <button class="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Next Image"><i class="fas fa-chevron-right"></i></button>
            <div class="lightbox-caption" id="lightbox-caption"></div>
        `;
        document.body.appendChild(lightboxOverlay);

        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');
        const lightboxCaption = document.getElementById('lightbox-caption');

        let visibleItems = [];
        let currentLightboxIndex = 0;

        function updateVisibleItems() {
            // Get visible gallery items (display !== 'none')
            visibleItems = Array.from(document.querySelectorAll('.gallery-item')).filter(item => {
                return window.getComputedStyle(item).display !== 'none';
            });
        }

        function showLightboxImage(index) {
            if (index < 0 || index >= visibleItems.length) return;
            currentLightboxIndex = index;
            const item = visibleItems[index];
            const img = item.querySelector('.gallery-img');
            const heading = item.querySelector('h4');
            const desc = item.querySelector('p');

            if (lightboxImg && img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt || "Pest control on-site gallery image";
            }
            if (lightboxCaption) {
                lightboxCaption.innerHTML = `<strong>${heading ? heading.textContent : ''}</strong>${desc ? ' - ' + desc.textContent : ''}`;
            }
        }

        // Add click listener to all gallery items
        galleryItemsList.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                updateVisibleItems();
                const index = visibleItems.indexOf(item);
                if (index !== -1) {
                    showLightboxImage(index);
                    lightboxOverlay.classList.add('open');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close lightbox
        function closeLightbox() {
            lightboxOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });

        // Prev & Next handlers
        function showNextLightboxImg() {
            updateVisibleItems();
            if (visibleItems.length === 0) return;
            let nextIdx = (currentLightboxIndex + 1) % visibleItems.length;
            showLightboxImage(nextIdx);
        }

        function showPrevLightboxImg() {
            updateVisibleItems();
            if (visibleItems.length === 0) return;
            let prevIdx = (currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length;
            showLightboxImage(prevIdx);
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                showNextLightboxImg();
            });
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                showPrevLightboxImg();
            });
        }

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (lightboxOverlay.classList.contains('open')) {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowRight') {
                    showNextLightboxImg();
                } else if (e.key === 'ArrowLeft') {
                    showPrevLightboxImg();
                }
            }
        });
    }
});
