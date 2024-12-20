document.addEventListener('DOMContentLoaded', () => { 
    // Smooth Scrolling
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Contact Buttons
    const phoneNumber = "+254790304391";

    // Call functionality
    function makeCall() {
        window.location.href = `tel:${phoneNumber}`;
    }

    // WhatsApp messaging
    function sendWhatsAppMessage() {
        const message = "Hi! I’d like to inquire about your event planning services.";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    }

    // Send SMS
    function sendSMS() {
        const message = "Hi! I’m interested in your event planning packages.";
        window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    }

    // Add listeners to contact buttons
    document.querySelector("#call-btn").addEventListener("click", makeCall);
    document.querySelector("#whatsapp-btn").addEventListener("click", sendWhatsAppMessage);
    document.querySelector("#sms-btn").addEventListener("click", sendSMS);

    // Dynamic Reviews Loading
    const reviewsList = document.getElementById('reviews-list');

    function loadReviews() {
        const reviews = [
            { name: 'Kelvin Maina', review: 'Amazing service! My wedding was perfect.' },
            { name: 'Mally Njeri', review: 'The graduation party was flawless. Thank you!' },
            { name: 'Grace Wanjiru', review: 'Wonderful coordination for our ruracio. Highly recommended!' }
        ];

        reviews.forEach(r => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${r.name}:</strong> "${r.review}"`;
            reviewsList.appendChild(li);
        });
    }

    // Load reviews on page load
    loadReviews();

    // Booking form submission
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventDate = document.getElementById('event-date').value;
        const venue = document.getElementById('venue').value;
        const eventType = document.getElementById('event-type').value;

        if (eventDate && venue && eventType) {
            alert(`Booking submitted successfully!\nEvent Date: ${eventDate}\nVenue: ${venue}\nEvent Type: ${eventType}`);
            bookingForm.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Review form submission
    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const reviewName = document.getElementById('review-name').value;
        const reviewText = document.getElementById('review').value;

        if (reviewName && reviewText) {
            const newReview = document.createElement('li');
            newReview.innerHTML = `<strong>${reviewName}:</strong> "${reviewText}"`;
            reviewsList.appendChild(newReview);
            alert('Review submitted successfully!');
            reviewForm.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Load initial reviews dynamically
    const initialReviews = [
        { name: 'Kelvin Maina', review: 'Amazing service! My wedding was perfect.' },
        { name: 'Mally Njeri', review: 'The graduation party was flawless. Thank you!' }
    ];

    initialReviews.forEach(({ name, review }) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${name}:</strong> "${review}"`;
        reviewsList.appendChild(li);
    });

    // Function to toggle visibility of package details
    function toggleDetails(id) {
        const details = document.getElementById(id);
        if (details.style.display === "none" || details.style.display === "") {
            details.style.display = "block";
        } else {
            details.style.display = "none";
        }
    }

    // Attach toggleDetails function to all View Details buttons
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
        const targetId = button.getAttribute('onclick').match(/'(.*?)'/)[1];
        button.addEventListener('click', () => toggleDetails(targetId));
    });

    // Add the exact code you wanted here
    const viewDetailsButtonsForPackages = document.querySelectorAll('.view-details-btn');
    viewDetailsButtonsForPackages.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            fetch(`/package-details/${packageType}`)
                .then(response => response.json())
                .then(data => {
                    displayPackageDetails(data, packageType);
                })
                .catch(error => {
                    console.error('Error fetching package details:', error);
                    alert('Failed to load package details.');
                });
        });
    });

    // Function to display the fetched package details
    function displayPackageDetails(details, packageType) {
        const detailsContainer = document.getElementById('package-details');

        // Dynamically display package details
        detailsContainer.innerHTML = `
            <h2>${packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package</h2>
            <p><strong>Standard Price:</strong> ${details.standardPrice}</p>
            <h3>Standard Details:</h3>
            <ul>
                ${details.standardDetails.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p><strong>Premium Price:</strong> ${details.premiumPrice}</p>
            <h3>Premium Details:</h3>
            <ul>
                ${details.premiumDetails.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
    }

    // Select all "View Details" buttons
    const viewDetailsButtonsForVisibility = document.querySelectorAll('.view-details-btn');

    // Add click event listener to each button
    viewDetailsButtonsForVisibility.forEach(button => {
        button.addEventListener('click', function() {
            // Get the data-package attribute to identify the package
            const packageName = button.getAttribute('data-package');
            const detailsDiv = document.getElementById(`${packageName}-details`);

            // Toggle the visibility of the package details
            detailsDiv.style.display = (detailsDiv.style.display === 'none' || detailsDiv.style.display === '') ? 'block' : 'none';
        });
    });

    // Fetch and display reviews
    fetch('http://localhost:3000/reviews')
        .then(response => response.json())
        .then(reviews => {
            const reviewsContainer = document.getElementById('reviews-container');
            reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review');
                reviewDiv.innerHTML = `<strong>${review.review_name}</strong><p>${review.review}</p>`;
                reviewsContainer.appendChild(reviewDiv);
            });
        });
});
