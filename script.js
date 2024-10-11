"use strict";

// Product data - Define the details for each product
const products = {
    shirt: { name: "Psychedelic Tee", image: "images/minna-no-kimochi-shirt.jpg", description: "Melt minds with our reality-bending tee" },
    hoodie: { name: "Quantum Hoodie", image: "images/minna-no-kimochi-hoodie.jpg", description: "Wrap yourself in the fabric of spacetime" },
    cap: { name: "Neural Cap", image: "images/minna-no-kimochi-cap.jpg", description: "Unlock hidden frequencies with our mind-expanding cap" }
};

// Light/Dark mode toggle function
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Update button text based on current mode
    const button = document.getElementById('darkModeToggle');
    button.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}

// Product display function
function displayProduct(productId) {
    // Retrieve the selected product from the products object
    const product = products[productId];
    const display = document.getElementById('productDisplay');
    // Update the product display with the selected product's details
    display.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}" class="float">
        <p>${product.description}</p>
    `;
}

// Guessing game function
function playGame() {
    const userGuess = parseInt(document.getElementById('guessInput').value);
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const resultElement = document.getElementById('gameResult');
    
    // Compare user's guess with the random number and display appropriate message
    if (userGuess === randomNumber) {
        resultElement.textContent = `You guessed ${userGuess}. The BPM was ${randomNumber}. You're in sync with the universe!`;
    } else {
        resultElement.textContent = `You guessed ${userGuess}. The BPM was ${randomNumber}. Realign your chakras and try again!`;
    }
}

// Form validation function
function validateForm(event) {
    event.preventDefault();
    
    // Retrieve form input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const comments = document.getElementById('comments').value;
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked');
    
    let isValid = true;
    let errorMessages = [];

    // Validate required fields
    if (!name) {
        isValid = false;
        errorMessages.push("Cosmic Identity is required");
    }

    if (!comments) {
        isValid = false;
        errorMessages.push("Your thoughts are required");
    }

    if (!contactMethod) {
        isValid = false;
        errorMessages.push("Please select a preferred wavelength");
    } else if (contactMethod.value === 'email' && !validateEmail(email)) {
        isValid = false;
        errorMessages.push("Please enter a valid astral email address");
    } else if (contactMethod.value === 'phone' && !validatePhone(phone)) {
        isValid = false;
        errorMessages.push("Please enter a valid telepathic number");
    }

    // If form is valid, display success message and reset form. Otherwise, show errors.
    if (isValid) {
        const formData = { name, email, phone, comments, preferredContact: contactMethod.value };
        displayFormSuccess(formData);
        event.target.reset();
    } else {
        displayFormErrors(errorMessages);
    }
}

// Email validation helper function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation helper function
function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
}

// Function to display form submission success message
function displayFormSuccess(data) {
    const resultElement = document.getElementById('formResult');
    resultElement.innerHTML = `
        <h3>Your thoughts have been transmitted to the cosmos!</h3>
        <p>Cosmic Identity: ${data.name}</p>
        <p>Astral Email: ${data.email}</p>
        <p>Telepathic Number: ${data.phone}</p>
        <p>Thoughts: ${data.comments}</p>
        <p>Preferred Wavelength: ${data.preferredContact}</p>
    `;
    resultElement.className = 'success';
}

// Function to display form validation errors
function displayFormErrors(errors) {
    const resultElement = document.getElementById('formResult');
    resultElement.innerHTML = `
        <h3>Your transmission was interrupted. Please realign:</h3>
        <ul>
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;
    resultElement.className = 'error';
}

// Event listeners - Set up when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set up dark mode toggle
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    // Set up form submission handler
    document.getElementById('contactForm').addEventListener('submit', validateForm);
    // Display default product
    displayProduct('shirt');
});