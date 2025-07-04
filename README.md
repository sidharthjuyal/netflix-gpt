# Project Hosting ( Netlify )
[https://groqmovierecommendationsystem.netlify.app](https://groqmovierecommendationsystem.netlify.app)

# netflix-gpt
This is a Movie Recommendation Tool based on user prompt ( with Integrated Authentication )
- configure Parcel and React
- configure TailwindCSS
- Header Component
- Routing of App
- Login Form
- Form Validation (useref Hook)
- Firebase Deployment
- Sign Up/ Sign In User Account
- Create Redux Store with userSlice / moviesSlice
- User Authentication Setup
- unsubscribed to OnAuthStateChanged
- added hardcoded Values to constants.js
- Register for TMDB API and got Access Token
- API call to Now Playing Movies
- Browsing Main Container (Video API)
- Updation of store with movies and video ID
- Embedded Youtube Video
- Browsing Secondary Component
- Movie Lists / UI Fixes
- GPT Search Bar
- Muli Language feature through user selection
- Configure Groq-sdk AI 
- Implemented Movie Recommendation Functionality
- Responsiveness
- Video Modals Added
- Implemented loaders for modal fetch

# Igniting Our App
- npm init
- npm install -D parcel  ( dev dependency )
- npm install react
- npm install react-dom
- npx parcel src/index.html 

# If you delete the node_modues
you can regenerate the node_modules using  ( npm install ), given that you have your package.json.

# Configure Tailwind CSS
- npm install tailwindcss @tailwindcss/postcss
- create a .postcssrc in the project root and configure it.
- add  @import "tailwindcss"; to index.css
- link index.css to index.html

# App Features
- Login / Sign Up 
   - Sign In / Sign Up Form
   - redirect to Browse Page
- Browse ( after authentication )
  - Header
  - Main Movies
     - Trailer in Background
     - Tile  Description
     - MovieSuggestions
     - MovieLists * n
- NetflixGPT
   - Search Bar
   - Movie Suggestions

# Routing
- npm install react-router

# FireBase Integration
- npm i firebase

# redux Store
- npm i @reduxjs/toolkit
- npm i react-redux
