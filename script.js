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

function validateForm() {
    let isValid = true;
    const fullName = document.getElementById('full-name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const comments = document.getElementById('comments');
    const contactMethod = document.querySelector('input[name="contact-method"]:checked');

    // Validate full name
    if (fullName.value.trim() === '') {
        showError(fullName, 'Full name is required');
        isValid = false;
    } else {
        clearError(fullName);
    }

    // Validate phone number if it's the preferred contact method
    if (contactMethod && contactMethod.value === 'phone') {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone.value)) {
            showError(phone, 'Please enter a valid 10-digit phone number');
            isValid = false;
        } else {
            clearError(phone);
        }
    }

    // Validate email if it's the preferred contact method
    if (contactMethod && contactMethod.value === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(email);
        }
    }

    // Validate comments
    if (comments.value.trim() === '') {
        showError(comments, 'Please enter your message');
        isValid = false;
    } else {
        clearError(comments);
    }

    // Validate contact method selection
    if (!contactMethod) {
        showError(document.querySelector('fieldset'), 'Please select a preferred contact method');
        isValid = false;
    } else {
        clearError(document.querySelector('fieldset'));
    }

    return isValid;
}

function showError(element, message) {
    const errorElement = element.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error')) {
        errorElement.textContent = message;
    } else {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        element.parentNode.insertBefore(error, element.nextSibling);
    }
}

function clearError(element) {
    const errorElement = element.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error')) {
        errorElement.remove();
    }
}

function createCustomerObject() {
    return {
        fullName: document.getElementById('full-name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        comments: document.getElementById('comments').value,
        contactMethod: document.querySelector('input[name="contact-method"]:checked').value
    };
}

function displayFormSuccess(customer) {
    formResult.innerHTML = `Thank you for your message, ${customer.fullName}! We'll contact you via ${customer.contactMethod}.`;
}

// Product display functionality
const products = [
    { name: "Neon Glow Sticks", image: "images/glow-sticks.jpg", description: "Light up the night with our vibrant glow sticks!" },
    { name: "LED Rave Glasses", image: "images/rave-glasses.jpg", description: "See the world in a whole new light with our LED rave glasses." },
    { name: "Minna-no-Kimochi T-Shirt", image: "images/tshirt.jpg", description: "Show your love for Minna-no-Kimochi with our official t-shirt." }
];

const productDisplay = document.getElementById('product-display');
let currentProductIndex = 0;

function displayProduct(index) {
    const product = products[index];
    productDisplay.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}">
        <p>${product.description}</p>
        <button onclick="changeProduct('next')">Next Product</button>
    `;
}

function changeProduct(direction) {
    if (direction === 'next') {
        currentProductIndex = (currentProductIndex + 1) % products.length;
    } else {
        currentProductIndex = (currentProductIndex - 1 + products.length) % products.length;
    }
    displayProduct(currentProductIndex);
}

// Display the first product by default
displayProduct(currentProductIndex);

// Guessing game functionality
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const gameResult = document.getElementById('game-result');

guessButton.addEventListener('click', () => {
    const userGuess = parseInt(guessInput.value);
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    if (userGuess === randomNumber) {
        gameResult.textContent = `Congratulations! You guessed the beat ${randomNumber}!`;
    } else {
        gameResult.textContent = `Sorry, the beat was ${randomNumber}. Try again!`;
    }
});

// Event display functionality
const events = [
    { name: "Neon Nights", date: "2024-06-15", description: "An electrifying night of neon and beats." },
    { name: "Bass Drop Festival", date: "2024-07-20", description: "Feel the bass shake your soul." },
    { name: "Trance Unity", date: "2024-08-10", description: "Unite under the hypnotic sounds of trance." }
];

const eventDisplay = document.getElementById('event-display');

function displayEvents() {
    eventDisplay.innerHTML = events.map(event => `
        <div class="event">
            <h3>${event.name}</h3>
            <p>Date: ${event.date}</p>
            <p>${event.description}</p>
        </div>
    `).join('');
}

displayEvents();