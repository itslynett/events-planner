const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse POST request data (using Express built-in functionality)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., for frontend HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Data for each event package
const packages = {
    wedding: {
        standardPrice: '150,000',
        standardDetails: [
            'Elegant tents and chairs setup',
            'Classic decor featuring flowers and draping',
            'Comprehensive catering setup with buffet or plated service',
            'Basic floral arrangements',
            'Sound system for ceremony and reception',
            'Experienced event coordinator to ensure smooth operations'
        ],
        premiumPrice: '300,000',
        premiumDetails: [
            'Luxury decor with premium floral arrangements and lighting',
            'Chiavari chairs or equivalent for a refined touch',
            'Gourmet catering with custom menu options',
            'Full floral arrangements for both ceremony and reception',
            'Custom-designed stage and backdrop',
            'Professional photography and videography services',
            'Live entertainment, including a live band or DJ',
            'Custom wedding favors for guests',
            'Additional decor such as chandeliers or hanging florals',
            'Dedicated on-site coordinator and a team of staff to ensure flawless execution'
        ]
    },
    // Add other event types like ruracio, graduation, etc. (same structure as above)
};

// Store reviews in memory (use a database for real applications)
const reviews = [];

// API endpoint to fetch package details
app.get('/package-details/:packageType', (req, res) => {
    const packageType = req.params.packageType;
    const packageDetails = packages[packageType];

    if (packageDetails) {
        res.json(packageDetails);
    } else {
        res.status(404).json({ error: 'Package not found' });
    }
});

// API endpoint to fetch reviews
app.get('/reviews', (req, res) => {
    res.json(reviews);
});

// Handle event booking submission with email notification
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your email address
        pass: 'your-email-password'   // Replace with your email password or app password
    }
});

app.post('/submit_vendor', (req, res) => {
    const { event_date, venue, event_type } = req.body;

    // Send email notification for the booking
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'joanwanjiku134@gmail.com', // Your email address
        subject: 'New Event Booking',
        text: `A new event has been booked:
        Event Date: ${event_date}
        Venue: ${venue}
        Event Type: ${event_type}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.send('Event booking submitted and email sent!');
    });
});

// Handle review submission and store in memory
app.post('/submit_review', (req, res) => {
    const { review_name, review } = req.body;
    reviews.push({ review_name, review });
    res.send('Review submitted successfully!');
});

// Serve the reviews on the website
app.get('/reviews', (req, res) => {
    res.json(reviews);
});

// Handling SMS, WhatsApp, and Call functionality
// For SMS functionality, you would need to integrate an API like Twilio
// For WhatsApp, you can link directly to WhatsApp Web or integrate with Twilio API

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
