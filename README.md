# SmartShop - Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

<div align="center">
  <img src="public/logo192.png" alt="SmartShop Logo" width="120" />
  <br />
  <h3>Modern E-Commerce Management Dashboard</h3>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Technologies](#-technologies)

---

## 📖 Overview

**SmartShop** is a robust and modern frontend application designed for managing e-commerce operations. It provides a seamless interface for administrators to manage products, clients, and orders with efficiency and style. Built with the latest React ecosystem technologies, it ensures high performance and a great user experience.

---

## ✨ Features

- **🔐 Authentication & Security**: Secure login system with protected routes and persistent session management.
- **📦 Product Management**:
  - Browse product catalog with grid views.
  - Add, Edit, and Delete products seamlessly.
- **👥 Client Management**:
  - Comprehensive list of registered clients.
  - Detailed client profiles with usage statistics.
  - Administrator tools for managing client accounts.
- **📊 Admin Dashboard**: Centralized hub for monitoring key metrics and activities.
- **🛒 Order Management**: Track and process customer orders efficiently.
- **📱 Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.

---

## 🏗 Architecture

The project follows a feature-based folder structure for scalability and maintainability.

```
src/
├── api/                # API services (axios config, endpoints)
├── components/         # Reusable UI components
│   ├── common/         # Buttons, Inputs, Modals
│   └── layout/         # Layout wrappers (Sidebar, Navbar)
├── features/           # Feature-specific logic & views
│   ├── admin/          # Dashboard views
│   ├── auth/           # Login & Auth logic
│   ├── clients/        # Client management components
│   ├── orders/         # Order tracking views
│   └── products/       # Product catalog & forms
├── store/              # Redux store & slices
└── routes/             # Route configurations & guards
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ayoub-BenOmar/SmartShop-Frontend.git
   cd SmartShop-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`.

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Runs the app in development mode. |
| `npm test` | Launches the test runner in interactive watch mode. |
| `npm run build` | Builds the app for production to the `build` folder. |
| `npm run eject` | Ejects the configuration (use with caution). |

---

## 💻 Technologies

- **Frontend Framework**: [React 19](https://reactjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: CSS integration
- **Building Tool**: React Scripts

---

<div align="center">
  Developed with ❤️ by <a href="https://github.com/Ayoub-BenOmar">Ayoub BenOmar</a>
</div>
