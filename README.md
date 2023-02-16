## About Project

The project is a marketplace listing app. Technologies used (Laravel, Vuejs, and TailwindCSS).

Features:

-   Registration and Login
-   Create, and View a Listing
-   Search for a Listing by category or string matching the title.

## Project setup

-   After cloning the project

### Backend/Laravel setup

-   Run composer install to install dependencies
-   Copy .env.example file to .env on the root folder. You can use: copy .env.example .env if using command prompt Windows or cp .env.example .env if using terminal, Ubuntu.
-   Open your .env file and change the database name (DB_DATABASE) to whatever you have, username (DB_USERNAME) and password (DB_PASSWORD) field correspond to your configuration.
-   Run php artisan key:generate
-   Run php artisan migrate
-   Run command to create listing seeders: php artisan db:seed --class=ListingTableSeeder
-   Run php artisan serve
-   Go to http://localhost:8000/

### Frontend/Vuejs setup

-   From the root folder navigate cd into the vue directory to install dependencies using: npm install
-   serve the frontend using: npm run dev
-   Create an account
-   Login to your account
-   On the landing page there is a button to create a listing, and also a search section to search listings
