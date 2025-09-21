# WanderLust 🏡✈️  
A MERN stack web application inspired by Airbnb, where users can explore listings, create their own stays, and manage bookings.  

## Features  
- User authentication (signup/login)  
- Create, view, edit, and delete listings  
- Interactive maps for locations  
- Reviews & ratings system  
- Responsive design with Bootstrap  

## Tech Stack  
- MongoDB  
- Express.js  
- React.js  
- Node.js  
- Map APIs (Geoapify / Mapbox)  

## Installation  

1. Clone the repository  
   ```bash
   git clone https://github.com/aditya-life/WanderLust.git
   cd WanderLust
2. Install dependencies
    npm install
3. Add your .env file with MongoDB & API keys.

## Configuration
Create a .env file in the root directory and add the following:

# MongoDB Connection
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/wanderlust

# Cloudinary (for image upload)
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

# Map API (Geoapify / Mapbox)
MAP_API_KEY=your_map_api_key

# Session secret for authentication
SECRET=your_session_secret

# Run the app
    node app.js
    nodemon app.js
