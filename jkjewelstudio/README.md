Got it! Here's an updated **README.md** file tailored for your full project structure, including the public and admin APIs, plus relevant info about the folder organization:

---

# Jewellery E-Commerce React App

A React-based e-commerce application for displaying jewellery products with full admin and public interfaces. The app fetches product and category data from a backend REST API and supports features such as product viewing, adding to cart, and admin CRUD operations.

---

## Table of Contents

* [Project Structure](#project-structure)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Setup and Installation](#setup-and-installation)
* [Usage](#usage)
* [Admin Panel](#admin-panel)
* [License](#license)
* [Contact](#contact)

---

## Project Structure

```
src/
│
├── admin/                 # Admin panel codebase
│   ├── components/        # Admin UI components (tables, forms, navbars)
│   ├── layouts/           # Admin layout wrappers
│   ├── Pages/             # Admin pages (Dashboard, Products, Categories, Login)
│   └── utils/             # Admin-specific API calls
│
├── assets/                # Static assets (images, icons)
│
├── components/            # Public-facing UI components
│
├── context/               # React Context (e.g., CartContext for cart management)
│
├── pages/                 # Public pages (Home, Jewellery, Cart, Profile, etc.)
│
├── router/                # Routing setup for admin and public routes
│
├── styles/                # CSS files (admin.css, main.css)
│
└── utils/                 # Public API calls (axios instance & helpers)
```

---

## Features

* **Public Interface:**

  * Product browsing with categories
  * Product details page with image gallery and pricing (discounts shown)
  * Shopping cart management with React Context API
  * Responsive UI components and pages

* **Admin Interface:**

  * Secure login
  * CRUD operations for products and categories (with image upload support)
  * Dashboard with reports
  * Data management tables and forms

---

## Tech Stack

* React with hooks and context API
* React Router DOM for client-side routing
* Axios for HTTP API requests
* CSS for styling (custom stylesheets)
* Backend API (assumed running separately on `http://localhost:5000`)

---

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/jewellery-ecommerce.git
   cd jewellery-ecommerce
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm start
   ```

4. **Open the app:**

   * Public site: [http://localhost:3000](http://localhost:3000)
   * Admin panel (example route): [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Usage

* Use the public product listing and details pages to browse and shop jewellery.
* Use the admin panel to manage products and categories (requires login).
* Add products to cart using the "Add to Cart" button and manage cart state globally.

---

## Admin Panel

* Accessible under `/admin` routes.
* Login with valid credentials to access dashboard, products, categories, users management.
* Perform create, update, and delete operations for products and categories.
* Upload product images via multipart/form-data.

---

## License

MIT License

---

## Contact

For any queries or help, contact:

**Your Name**
Email: [kevalsatani6514@gmail.com](mailto:kevalsatani6514@gmail.com)
