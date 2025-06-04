# React-Login-Page
A modern React portal built with Vite, HeroUI, and Supabase authentication, featuring user and admin layouts, protected routes, and a settings section.

## Features

- **React + Vite:** Fast, modern frontend tooling.
- **HeroUI Components:** Clean, accessible UI with HeroUI's React library.
- **Supabase Auth:** Email magic link authentication.
- **Admin and User Dashboards:** Separate layouts and routes for admins and users.
- **Protected Routes:** Only authenticated users can access the main app.
- **Settings Panel:** Tabs for general and authentication settings.
- **Responsive Layouts:** Fully responsive navigation and content area.

## File Structure
- `index.html`:  
  Entry point. Loads the React app and HeroUI Chat scripts.

- `app-layout.tsx`:  
  Layout for authenticated user routes (dashboard, settings, etc).

- `admin-layout.tsx`:  
  Layout for admin-specific pages with custom navigation.

- `settings-layout.tsx`:  
  Wrapper for settings pages, with tab navigation for different settings sections.

- `protected-route.tsx`:  
  Higher-order component for route protection. Redirects unauthenticated users to `/login`.

- `admin-route.tsx`:  
  Similar to `app-layout.tsx`, intended for admin routes. (You may want to rename for clarity.)

- `auth-context.tsx`:  
  Context and provider for authentication state, integrating Supabase auth and user roles (admin/user).

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
### Setup Supabase

Configure your Supabase URL and API key in .env file

### Run the app

bash
Copy
Edit
npm run dev
Open in browser:
Visit http://localhost:5173 (default Vite port).

### Authentication
Sign in: Users authenticate via email magic link (Supabase OTP).

Admin role: Demo admin check uses localStorage, but you should replace this with a real database check for production.

### Notes
Update admin check logic for real-world use.

Adjust file/component names for consistency if needed (e.g., admin-route.tsx vs admin-layout.tsx).
