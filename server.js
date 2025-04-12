const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');
const Bull = require('bull');
require('dotenv').config();

const app = express();

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Email Queue Configuration
const emailQueue = new Bull('email-queue', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

// Process emails in background
emailQueue.process(async (job) => {
  try {
    await transporter.sendMail(job.data);
    console.log(`Email sent successfully to ${job.data.to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
});

// Queue error handling
emailQueue.on('failed', (job, error) => {
  console.error(`Failed to send email to ${job.data.to}:`, error);
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/newsletter', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Subscriber Model
const subscriberSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  subscribedAt: { type: Date, default: Date.now },
  preferences: {
    weeklyUpdates: { type: Boolean, default: true },
    productNews: { type: Boolean, default: false }
  }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_API_KEY
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Question Processing Route
app.post('/ask', async (req, res) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.question }],
    });
    
    res.json({ answer: completion.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: "Error processing your question" });
  }
});

// Main Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Email Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required');
  }
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  return email.toLowerCase().trim();
};

// Newsletter Subscription Route
app.post('/subscribe', async (req, res) => {
  try {
    const email = validateEmail(req.body.email);
    
    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    const newSubscriber = new Subscriber({
      email,
      preferences: {
        weeklyUpdates: Boolean(req.body.preferences?.weeklyUpdates),
        productNews: Boolean(req.body.preferences?.productNews)
      }
    });
    
    await newSubscriber.save();

    // Add confirmation email to queue
    await emailQueue.add({
      from: 'news@africasocial.com',
      to: newSubscriber.email,
      subject: 'Welcome to AfricaSocial!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Thank you for subscribing!</h2>
          <p>You are now subscribed to the AfricaSocial newsletter.</p>
          <p>Your preferences:</p>
          <ul>
            <li>Weekly updates: ${newSubscriber.preferences.weeklyUpdates ? 'Enabled' : 'Disabled'}</li>
            <li>Product news: ${newSubscriber.preferences.productNews ? 'Enabled' : 'Disabled'}</li>
          </ul>
          <p>You can modify your preferences at any time from your personal space.</p>
          <div style="margin-top: 20px; padding: 20px; background-color: #F3F4F6; border-radius: 8px;">
            <p style="margin: 0;">See you soon on AfricaSocial!</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; font-size: 12px; color: #6B7280;">
            <p>To unsubscribe, click <a href="https://africasocial.com/unsubscribe?email=${newSubscriber.email}" style="color: #4F46E5;">here</a></p>
          </div>
        </div>
      `
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Unsubscribe Route
app.get('/unsubscribe', async (req, res) => {
  try {
    const email = validateEmail(req.query.email);
    
    const subscriber = await Subscriber.findOne({ email });
    if (!subscriber) {
      return res.status(404).send('Subscriber not found');
    }

    await Subscriber.deleteOne({ email });

    // Add unsubscribe confirmation email to queue
    await emailQueue.add({
      from: 'news@africasocial.com',
      to: email,
      subject: 'Unsubscribe Confirmed - AfricaSocial',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Unsubscribe Confirmed</h2>
          <p>You have been successfully unsubscribed from our newsletter.</p>
          <p>We're sorry to see you go. If you change your mind, you can resubscribe at any time.</p>
          <div style="margin-top: 20px; padding: 20px; background-color: #F3F4F6; border-radius: 8px;">
            <p style="margin: 0;">Thank you for being part of our community.</p>
          </div>
        </div>
      `
    });

    res.send(`
      <html>
        <head>
          <title>Unsubscribe Confirmed - AfricaSocial</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 40px auto;
              padding: 20px;
              text-align: center;
            }
            .container {
              background-color: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
              color: #4F46E5;
              margin-bottom: 20px;
            }
            p {
              color: #4B5563;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #4F46E5;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Unsubscribe Confirmed</h1>
            <p>You have been successfully unsubscribed from our newsletter.</p>
            <p>We're sorry to see you go. If you change your mind, you can resubscribe at any time.</p>
            <a href="/" class="button">Back to Home</a>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(400).send(error.message);
  }
});

// Send Newsletter Route
app.post('/send-newsletter', async (req, res) => {
  try {
    const { subject, content } = req.body;
    
    if (!subject || !content) {
      throw new Error('Subject and content are required');
    }

    const subscribers = await Subscriber.find();
    if (subscribers.length === 0) {
      return res.status(400).json({ error: 'No subscribers found' });
    }

    // Add unsubscribe link to content
    const unsubscribeLink = `<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; font-size: 12px; color: #6B7280;">
      <p>To unsubscribe, click <a href="https://africasocial.com/unsubscribe?email={{email}}" style="color: #4F46E5;">here</a></p>
    </div>`;

    // Add each email to the queue
    const emailJobs = subscribers.map(s => ({
      from: 'news@africasocial.com',
      to: s.email,
      subject,
      html: content + unsubscribeLink.replace('{{email}}', s.email)
    }));

    // Add jobs to queue with delay between each send
    for (let i = 0; i < emailJobs.length; i++) {
      await emailQueue.add(emailJobs[i], {
        delay: i * 1000 // 1 second delay between each email
      });
    }

    res.json({ success: true, recipients: subscribers.length });
  } catch (error) {
    console.error('Newsletter sending error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Contact Form Route
app.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !subject || !message) {
      throw new Error('All fields are required');
    }

    // Validate email
    const validatedEmail = validateEmail(email);

    // Add notification email to queue
    await emailQueue.add({
      from: 'contact@africasocial.com',
      to: 'support@africasocial.com',
      subject: `New Contact Message - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">New Contact Message</h2>
          <p><strong>From:</strong> ${firstName} ${lastName} (${validatedEmail})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="padding: 15px; background-color: #F3F4F6; border-radius: 8px;">
            ${message}
          </div>
        </div>
      `
    });

    // Add confirmation email to queue
    await emailQueue.add({
      from: 'contact@africasocial.com',
      to: validatedEmail,
      subject: 'Message Confirmation - AfricaSocial',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Thank you for your message!</h2>
          <p>Hello ${firstName},</p>
          <p>We have received your message and will respond as soon as possible.</p>
          <p>Message summary:</p>
          <div style="padding: 15px; background-color: #F3F4F6; border-radius: 8px;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
          <p>Best regards,<br>The AfricaSocial Team</p>
        </div>
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 