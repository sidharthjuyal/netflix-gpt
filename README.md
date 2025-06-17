# netflix-gpt
This is the Movie Recommendation Tool based on user prompt ( with Integrated Authentication )
- configure Parcel and react
- configure TailwindCSS
- Header
- Routing of App
- Login Form
- Form Validation (useref Hook)

# Igniting Our App
npm init
npm install -D parcel  ( dev dependency )
npm install react
npm install react-dom
npx parcel src/index.html 

# If you delete the node_modues
you can regenerate the node_modules using  ( npm install ), given that you have your package.json and package-lock.json

# Configure Tailwind CSS
npm install tailwindcss @tailwindcss/postcss
-> create a .postcssrc in the project root and configure it.
-> add  @import "tailwindcss"; to index.css
-> link index.css to index.html

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
     - MovieLists * N
- NetflixGPT
   - Search Bar
   - Movie Suggestions

# Routing
npm instal -D react-router ( Dev Dependency )

# FireBase Integration
npm i firebase
npm install -g firebase-tools (firebase hosting)