# EgiyeAshi (এগিয়ে আসি)

**Step Forward. Serve Together.**

EgiyeAshi is a community-driven platform where people can create, join and track social service events in their local area, such as winter clothes distribution, blanket distribution, clean-up drives and tree plantation.

🔗 **Live site:** https://egiyeashi-client.vercel.app

🖥️ **Server repository:** https://github.com/MahbubSifat/egiyeashi-server

## Features

- **Create events:** logged-in users can publish a service event with a title, description, event type, thumbnail image, location and a future date.
- **Browse upcoming events:** a public page lists only upcoming events, with search by title or location and a filter by event type.
- **Event details and join:** anyone can read the details, and logged-in users can join an event with one click. Joining the same event twice is prevented.
- **Joined events:** users can see all the events they joined, sorted by event date.
- **Manage events:** users can update or delete only the events they created, with a confirmation step before deleting.
- **Secure authentication:** email and password registration with password validation (uppercase, lowercase, at least 6 characters), Google sign-in, and JWT-protected API routes.
- **Profile:** users can view their profile and update their name and photo.
- **Light and dark theme:** one-tap theme switch that is remembered between visits.
- **Responsive design** with loading skeletons and clear error messages (no default browser alerts).

## Tech stack

- **Client:** Next.js (App Router), React, Tailwind CSS, daisyUI, react-hot-toast, react-icons
- **Authentication:** Better Auth (MongoDB adapter, JWT plugin)
- **Server:** Express.js, MongoDB (see the server repository)
- **Hosting:** Vercel

## Run locally

```bash
git clone https://github.com/MahbubSifat/egiyeashi-client.git
cd egiyeashi-client
npm install
```

Create a `.env.local` file in the project root with these variables (use your own values):

```
NEXT_PUBLIC_API_URL=https://egiyeashi-server.vercel.app
BETTER_AUTH_SECRET=wPX2e+IXPZeQbTfo8QcaWwfN7ph4EBUqIy2ewykVK4w=
BETTER_AUTH_URL=https://egiyeashi-client.vercel.app
MONGODB_URI=mongodb+srv://mahbubsifatbdu06_db_user:v46J_Vcyd2KXbt%23@cluster0.aev5go8.mongodb.net/apnar_db_name?retryWrites=true&w=majority
DB_NAME=egiyeashi
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

Then start the app:

```bash
npm run dev
```

The API server must be running as well. See the server repository for its setup.