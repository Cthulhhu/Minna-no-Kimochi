"use strict";

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

// Contact form validation and submission
const contactForm = document.getElementById('contact-form');
const formResult = document.getElementById('form-result');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        const customer = createCustomerObject();
        displayFormSuccess(customer);
        contactForm.reset();
    }
});