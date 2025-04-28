# CafeEmployee Frontend - React.js (Vite)

This repository contains the frontend for the **CafeEmployee** application, built to connect with the **Dotnet Core CafeEmployee API backend**.

---

## Development Approach

Because of project requirements and to align with the backend design:

- **Core functionality first**  
  Priority is placed on delivering essential user-facing features and integrating with backend APIs.  
  - Focus is maintained to avoid over-engineering and prevent deviation from user requirements.  
  - Enhancements, optimizations, refactoring to hooks/helper and extras are considered secondary and only implemented if truly needed.

- **Testing (not yet implemented)**  

---

## Tech Stack and Libraries Used

- **React.js**
- **Vite** 
- **Material-UI (MUI)**
- **AgGrid** 
- **React Router DOM** 
- **Yup** 
- **React Icons** 
- **Axios**

---

## Prerequisites

- Node.js (version 18 or later)
- npm package manager

---

## Development Setup

A1. Navigate to the `cafe-employee-frontend/` folder:
    ```bash
    cd cafe-employee-frontend
    ```

2. Install all dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to:
    ```
    http://localhost:5173/
    ```
---

## Notes

- The frontend is already configured to proxy `/api` requests to the backend server at `http://localhost:5067` using Vite's proxy settings.
- Ensure the backend server (`cafe-employee-backend`) is running and accessible at `http://localhost:5067` before testing the frontend.
- Redux Form was part of the original project requirements but was not implemented, as it is deprecated.

