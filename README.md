# Smart Traveling System

This project is a comprehensive web application that caters to three types of users: flight admins, hotel admins, and tourists. It allows flight admins to manage flight tickets, hotel admins to manage hotel rooms, and tourists to explore and book rooms and tickets, and discover famous places and restaurants. The application also integrates Google Maps for enhanced location-based services.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)

## Features

### Flight Admin

- Add, update, and delete tickets.
- View posted tickets and bookings.

### Hotel Admin

- Add, update, and delete rooms.
- View posted rooms and bookings.

### Tourist

- View and book rooms and tickets.
- See famous places and restaurants.
- Find nearby famous places and restaurants along with routes to them.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

### Prerequisites

- Node.js
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/HamzaTariq2411/Smart_Traveling_System.git
cd Smart_Traveling_System
Install Dependencies
Frontend

Copy command
cd frontend
npm install
Backend

Copy command
cd backend
npm install

Environment Variables
Create a .env file in the backend directory and add the following variables:

plaintext
Copy code
MONGO_URL=your_mongodb_uri
PORT=your_port_number
JWT_KEY=your_jwt_secret

Create a .env file in the frontend directory and add the following variable:

plaintext
Copy code
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_map_api

Usage
Run the Application
Backend

Copy code
cd backend
npm run server
Frontend
Open a new terminal window and run:


Copy code
cd frontend
npm start
The application will be accessible at http://localhost:3000.
```
