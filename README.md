# AfricaSocial

A modern web application for managing social media content and newsletters.

## Features

- Newsletter subscription system
- Contact form with email notifications
- OpenAI integration for chat functionality
- Email queue management with Bull
- MongoDB database integration
- SendGrid email service

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- SendGrid account
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/africasocial.git
cd africasocial
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3003
MONGODB_URI=mongodb://localhost:27017/newsletter
REDIS_HOST=localhost
REDIS_PORT=6379
SENDGRID_USER=your_sendgrid_username
SENDGRID_API_KEY=your_sendgrid_api_key
OPENAI_API_KEY=your_openai_api_key
```

4. Start the server:
```bash
npm run serve
```

## API Endpoints

- `POST /subscribe` - Subscribe to newsletter
- `GET /unsubscribe` - Unsubscribe from newsletter
- `POST /send-newsletter` - Send newsletter to all subscribers
- `POST /contact` - Submit contact form
- `POST /ask` - Chat with OpenAI

## Project Structure

```
africasocial/
├── public/
│   ├── index.html
│   └── pages/
│       ├── features.html
│       ├── pricing.html
│       ├── resources.html
│       └── contact.html
├── server.js
├── package.json
├── .env
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
