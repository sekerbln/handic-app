# Handic App

---

## Project Overview

Handic App is a full-stack web application that uses **Strapi v5** as the backend CMS and **React.js** as the frontend framework. The app supports user registration, login, event listing, and event detail viewing. It also includes **multilingual support** for both English and German.

---

## Project Structure

The project is organized as follows:

* `.tmp/`: Strapi temporary files (ensure these are included in Git).
* `frontend/`: Contains the React frontend source code.
* `src/`: Holds the Strapi backend source code and configuration files.
* Other configuration and project files are located in the root directory.

---

## Running the Project Locally

### Prerequisites

Before you start, make sure you have the following installed:

* **Node.js**: Version 16 or higher is recommended.
* **npm**: This comes bundled with Node.js.

### Steps

Follow these steps to get the project up and running on your local machine:

1.  **Clone the repository and navigate into the project folder:**

    ```bash
    git clone https://github.com/sekerbln/handic-app.git
    cd handic-app
    ```

2.  **Install all dependencies:**

    ```bash
    npm install
    ```

3.  **Start the Strapi backend:**

    ```bash
    npm run develop
    ```

    This will start the Strapi server, typically accessible at:
    `http://localhost:1337`

4.  **Start the React frontend in a new terminal:**

    ```bash
    npm run start
    ```

    The React application will then be available at:
    `http://localhost:3000`

---

## Credentials

### Strapi Admin UI

* **URL**: `http://localhost:1337/admin`

On the first launch, you will be prompted to create an admin user. Alternatively, you can use these sample credentials:

* **Email**: `sekermac@gmail.com`
* **Password**: `HandicApp2025`

### Frontend User Login

Use these test user credentials on the frontend login page (`/user-login`):

* **Email**: `joe@gmail.com`
* **Password**: `BigSpecial`