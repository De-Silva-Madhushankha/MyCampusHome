# MyCampusHome

MyCampusHome is a comprehensive web application designed to assist students in finding the perfect student accommodations. The platform offers an intuitive interface, responsive design, and integration with modern authentication and payment systems.

## Features

- **User Authentication**: Secure login and registration functionality with JWT.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS, ensuring usability across devices.
- **Google Authentication**: One-click sign-in with Google.
- **Dynamic Search**: Explore student accommodations by location, price, and preferences.
- **Booking System**: Reserve and manage bookings easily.
- **Admin Panel**: Admin dashboard for managing properties, users, and bookings.

## Screenshots

Here are some screenshots of the MyCampusHome application:

### Homepage
![Homepage Screenshot](screenshots/homepage.jpeg)

### Login Page
![Login Page Screenshot](screenshots/loginpage.jpeg)

### Accommodation Listing
![Accommodation Search Screenshot](screenshots/listing.jpeg)

### Profile Page
![Profile Page Screenshot](screenshots/web-demo-03.png)

## Tech Stack

### Frontend
- **React.js**: Framework for building the user interface.
- **Tailwind CSS**: For styling the application.
- **React Router**: To handle navigation.
- **Axios**: For API requests.

### Backend
- **Node.js**: Server-side runtime.
- **Express.js**: Web application framework.
- **MongoDB**: Database for storing application data.
- **Mongoose**: MongoDB object modeling for Node.js.

### Authentication & Payment
- **JWT**: Secure JSON Web Tokens for user authentication.
- **Google OAuth**: Login using Google accounts.
- **Stripe (Planned)**: Seamless payment integration for bookings.

## Installation and Setup

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account or local MongoDB instance
- A Google Cloud Project for OAuth setup

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/De-Silva-Madhushankha/MyCampusHome.git
   ```
2. Navigate to the client directory:
   ```bash
   cd mycampushome/client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create an env file in the client directory:
   include the following key-value pairs

   ```env
   
   VITE_BASE_URL=" your server URL"
   
   VITE_FIREBASE_API_KEY=" your firebase API key"
   VITE_FIREBASE_AUTH_DOMAIN="example.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="example-760a0"
   VITE_FIREBASE_STORAGE_BUCKET="example.firebasestorage.app"
   VITE_FIREBASE_MESSAGING_SENDER_ID=""
   VITE_FIREBASE_APP_ID=""
   VITE_FIREBASE_MEASUREMENT_ID=""

   VITE_OPENCAGE_API_KEY=""
   VITE_MAPTILER_API_KEY=""
   ```
   
4. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd mycampushome/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the server directory with the following:
   ```env
   HOST= ""
   PORT= 4000
   NODE_ENV= production
   
   COOKIE_KEY="your cookie key"
   JWT_SECRET="your jwt secret"
   
   CLOUDINARY_CLOUD_NAME=""
   CLOUDINARY_API_KEY="your Cloudinary API key"
   CLOUDINARY_API_SECRET="your Cloudinary API secret"
   
   MONGO_URI="your mongo uri"
   
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER=
   SMTP_PASSWORD=''
   
   TWILIO_ACCOUNT_SID=
   TWILIO_AUTH_TOKEN=
   TWILIO_PHONE_NUMBER=
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Development Environment
- Navigate to the root directory mycampushome:
   ```bash
   npm run start
   ```
  above script will run your client and server in development mode using nodemon. suitable for development.
   

## Future Enhancements
- **Payment Integration**: Implement Stripe for handling payments.
- **User Notifications**: Notify users about booking updates and offers.
- **Enhanced Search**: Add filters for more specific accommodation searches.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any features, bug fixes, or enhancements.

## License
This project is licensed under the [MIT License](LICENSE).

