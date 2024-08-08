// Toggle display of card details based on selected payment method
const paymentMethodSelect = document.getElementById('payment-method');
const cardDetails = document.getElementById('card-details');

paymentMethodSelect.addEventListener('change', function() {
    if (this.value === 'card') {
        cardDetails.style.display = 'block';
    } else {
        cardDetails.style.display = 'none';
    }
});

// Menu toggle script remains unchanged
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Handle form submission to show thank-you message and delivery date
const form = document.getElementById('order-form');
const thankYouMessage = document.getElementById('thank-you-message');
const deliveryDateSpan = document.getElementById('delivery-date');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Calculate delivery date (7 days from today)
    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + 7);

    // Format the delivery date 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

    // Display the thank-you message and delivery date
    deliveryDateSpan.textContent = formattedDate;
    thankYouMessage.style.display = 'block';

    // Optionally, you could clear the form or perform other actions here
    form.reset(); // Reset the form fields
});
