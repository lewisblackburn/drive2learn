# Drive2Learn - Car Driving Course Website

Welcome to the Drive2Learn repository! This project is a fully-featured car driving course website developed for a client to advertise their driving school business. The site offers a smooth user experience and real-time database interaction.

## Features

- **Responsive Design**: Built with Next.js to ensure a seamless experience across all devices.
- **User Authentication**: Implemented using Supabase, allowing users to securely sign up, log in, and manage their accounts.
- **Course Booking**: Users can browse available driving courses, select, and book them directly on the website.
- **Email Notifications**: Automated email notifications and communication using Resend.

## Technologies Used

- **Next.js**: React framework for building the front-end and server-side rendering.
- **Supabase**: Managed backend for handling authentication, database, and real-time updates.
- **Resend**: Email service used for sending automated notifications and communication.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/drive2learn.git
   cd drive2learn
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables: Create a .env.local file in the root of your project and add your environment variables**:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   RESEND_API_KEY=your-resend-api-key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

The application should now be running on http://localhost:3000.

## Usage

- Navigate to the homepage to view available driving courses.
- Sign up or log in to your account to book a course.
- Check your email for a confirmation message and further instructions.

Thank you for checking out Drive2Learn!
