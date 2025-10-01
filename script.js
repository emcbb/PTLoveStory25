document.addEventListener('DOMContentLoaded', function() {
    // 1. RSVP Modal: Slide up and center
    const rsvpModal = document.getElementById('rsvpModal');
    const closeRsvpModal = document.getElementById('closeRsvpModal');
    const rsvpButtons = document.querySelectorAll('.rsvp-btn');

    if (rsvpModal && closeRsvpModal && rsvpButtons.length) {
        rsvpButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                rsvpModal.classList.add('show');
            });
        });

        closeRsvpModal.addEventListener('click', function() {
            rsvpModal.classList.remove('show');
        });

        window.addEventListener('click', function(event) {
            if (event.target == rsvpModal) {
                rsvpModal.classList.remove('show');
            }
        });
    }

    // 2. Registry/Contribute Button
    const amountButtons = document.querySelectorAll('.amount-buttons button');
    const otherBtn = document.querySelector('.other-btn');
    const inputGroup = document.querySelector('.input-group');
    const contributeBtn = document.querySelector('.contribute-btn');
    let selectedAmount = 100; // default

    if (inputGroup && contributeBtn) {
        const input = inputGroup.querySelector('input');

        // Handle preset amount buttons
        amountButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                selectedAmount = parseInt(this.textContent.replace('€', ''));
                contributeBtn.textContent = `Contribute €${selectedAmount}`;
                input.value = '';
            });
        });

        // Handle "Other" button
        otherBtn.addEventListener('click', function() {
            inputGroup.style.display = 'inline-flex';
            input.focus();
        });

        // Handle input in "Other" field
        input.addEventListener('input', function() {
            const val = parseInt(this.value);
            if (!isNaN(val) && val > 0) {
                selectedAmount = val;
                contributeBtn.textContent = `Contribute €${selectedAmount}`;
            }
        });

        // Handle contribute button click
        contributeBtn.addEventListener('click', function(e) {
            // Optional: redirect to Revolut with amount
            contributeBtn.setAttribute('href', `https://revolut.me/peaceyw40/${selectedAmount}`);
        });
    }

    // 3. Countdown Timer (only if countdown exists)
    const countdownDays = document.querySelector('[data-item="days"] .count_num');
    const countdownHours = document.querySelector('[data-item="hours"] .count_num');
    const countdownMins = document.querySelector('[data-item="mins"] .count_num');
    const countdownSecs = document.querySelector('[data-item="secs"] .count_num');

    if (countdownDays && countdownHours && countdownMins && countdownSecs) {
        const weddingDate = new Date('2025-10-11T10:00:00');
        function updateCountdown() {
            const now = new Date();
            const diff = weddingDate - now;

            if (diff <= 0) {
                countdownDays.textContent = 0;
                countdownHours.textContent = 0;
                countdownMins.textContent = 0;
                countdownSecs.textContent = 0;
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / (1000 * 60)) % 60);
            const secs = Math.floor((diff / 1000) % 60);

            countdownDays.textContent = days;
            countdownHours.textContent = hours;
            countdownMins.textContent = mins;
            countdownSecs.textContent = secs;
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // 4. Navbar Hamburger Menu
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // 5. Image Animations (glide-in on load)
    const animatedImages = document.querySelectorAll(
        '.image-gallery img, #how-we-met .story-content img, #our-proposal .story-content img, .image-side img, .registry-image img'
    );
    animatedImages.forEach((img, i) => {
        img.style.opacity = '0';
        img.style.animation = `glideIn 1s ease forwards`;
        img.style.animationDelay = `${0.1 + i * 0.1}s`;
    });

    // 6. Responsive Modal for Privacy Policy
    const privacyPolicyLink = document.getElementById('privacy-policy-link');
    const privacyPolicyModal = document.getElementById('privacyPolicyModal');
    const closePrivacyPolicyModal = document.getElementById('closePrivacyPolicyModal');

    if (privacyPolicyLink && privacyPolicyModal && closePrivacyPolicyModal) {
        privacyPolicyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyPolicyModal.style.display = 'block';
        });

        closePrivacyPolicyModal.addEventListener('click', function() {
            privacyPolicyModal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target == privacyPolicyModal) {
                privacyPolicyModal.style.display = 'none';
            }
        });
    }
});
