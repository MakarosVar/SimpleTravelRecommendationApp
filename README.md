# TravelBloom

**TravelBloom** is a full-stack travel agency operations prototype built with the MERN stack.

The application allows admins to curate destinations and travel packages, while users discover those curated experiences and turn them into personal travel plans.

The project started as a small travel recommendation frontend and evolved into a full-stack application focused on authentication, role-based access, admin content management, user-owned data, React Query server-state handling, backend-powered discovery, and product-oriented travel planning workflows.

---

## Product Idea

TravelBloom is designed around one core workflow:

> **Admins curate travel experiences. Users turn those experiences into personalized travel plans.**

The current version focuses on the foundation of a travel agency platform:

- admins manage the travel catalog
- admins create curated travel packages
- users browse destinations and packages
- users create editable travel plans
- users can start a plan from a curated package or add individual destinations manually

---

## User Roles

### Admin

Admins manage the travel catalog by creating destinations, uploading images, archiving/reactivating destinations, and building curated travel packages.

### User

Users can browse destinations and packages, save favorite destinations, create personal travel plans, create a plan from a curated package, and add individual destinations to existing travel plans.

---

## Key Features

### Authentication & Authorization

- User registration and login
- JWT-based authentication
- Session validation through a `/me` endpoint
- Protected user routes
- Admin-only routes
- Role-based backend authorization

### Destination Management

- Admin destination creation and editing
- Destination image upload using Multer
- Static serving of uploaded images
- Support for uploaded images and external image URLs
- Soft archive/reactivate behavior
- Public destination browsing hides archived destinations
- Destination details pages

### Backend-Powered Destination Discovery

- Public destination search handled by the backend
- Filter destinations by backend-provided destination types
- Sort destinations by name, country, or newest
- Paginated destination results
- Backend response includes pagination metadata and available filter options
- Frontend uses dynamic React Query keys for search/filter/sort/page state

### Curated Travel Packages

- Admin package builder
- Add destinations to packages
- Package duration and travel style metadata
- Draft/published package workflow
- Public package listing
- Public package details page
- Validation rule preventing empty packages from being published

### Backend-Powered Package Discovery

- Public package search handled by the backend
- Filter packages by travel style
- Sort packages by title, travel style, or newest
- Paginated package results
- Backend response includes pagination metadata and available package filter options

### User Travel Plans

- User-owned travel plans
- Create, edit, and delete travel plans
- Add individual destinations to existing plans
- Prevent duplicate destinations inside the same plan
- Create a new travel plan from a published package
- Track package origin with a subtle “Based on package” indicator
- Edit travel plan item notes and priority
- Remove destinations from travel plans
- Travel plan count shown in the navigation

### Favorites

- Save and remove favorite destinations
- Favorites are stored on the backend
- Favorite state is handled through React Query rather than broad global Context

### Frontend UX

- Responsive React UI with TailwindCSS
- Discover page combining destinations and packages through tabbed browsing
- Modal-based workflows
- Toast notifications
- Loading, empty, and error states
- Protected route handling
- Admin/public/user navigation separation
- URL-based Discover tab state for better navigation from details pages

---

## Core User Flows

### Admin Flow

1. Admin logs in.
2. Admin creates or edits destinations.
3. Admin uploads destination images.
4. Admin archives or reactivates destinations.
5. Admin builds travel packages from selected destinations.
6. Admin publishes packages for public users.

### User Flow

1. User browses destinations and packages from Discover.
2. User searches, filters, sorts, and paginates through available options.
3. User opens a destination or package details page.
4. User creates a personal travel plan from a package, or adds individual destinations to an existing plan.
5. User customizes the generated travel plan with notes and priorities.
6. User can remove destinations from travel plans or manage their favorite destinations.

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- TailwindCSS
- Axios
- TanStack React Query
- Context API

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- Multer for file uploads

### Architecture & Patterns

- REST API design
- Role-based access control
- Admin/public/user API separation
- Backend-owned search/filter/sort/pagination
- Server-state management with React Query
- Context for authentication and toast coordination
- Service and hook separation on the frontend
- Modal-based user workflows
- Backend validation and ownership checks
- Soft-delete/archive behavior for admin-managed content

---

## Architecture Highlights

### Server State vs Client State

TravelBloom uses **TanStack React Query** for server-owned data such as destinations, packages, favorites, and travel plans.

Local component state is used for temporary UI concerns such as modal open/close state, selected travel plan IDs, selected filters, selected tabs, and form drafts.

### Backend-Owned Discovery

Destination and package discovery are handled by the backend through query parameters such as search, filters, sort, page, and limit.

The frontend owns the selected UI state and sends query params to the backend. The backend owns the authoritative filtering, sorting, pagination, and available filter metadata.

### Authentication State

Authentication is managed through an `AuthContext`, which stores the authenticated user and validates the session through the backend.

### Product Modeling

The project separates travel concepts clearly:

- **Destination**: a catalog item managed by admins
- **Package**: an admin-curated travel experience/template
- **Travel Plan**: a user-owned editable plan
- **Favorite**: a lightweight saved destination/bookmark

This separation allows a curated package to generate a personal travel plan without modifying the original package.

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB

---

## Backend Setup

Navigate to the backend folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

---

## Frontend Setup

Navigate to the frontend folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev
```

---

## Current Status

TravelBloom is currently a portfolio-oriented full-stack prototype.

Completed major areas include:

- MERN backend integration
- Authentication and session validation
- Role-based admin access
- Admin destination management
- Image uploads
- Package builder
- Published package browsing
- Backend-powered destination discovery
- Backend-powered package discovery
- User-owned travel plans
- Create travel plan from package flow
- Add destination to travel plan flow
- Favorites moved to backend/React Query flow
- React Query migration for major server-state features
- Discover page consolidation for destinations and packages

The project is now at a natural stabilization point. Further features are possible, but the current version already demonstrates the main full-stack, product, and architecture goals of the project.

---

## Possible Future Improvements

These are intentionally listed as future directions rather than immediate scope.

### Product Workflow

- Add travel plan day sections for itinerary-style planning
- Add travel plan lifecycle status such as planning, ready, completed, and archived
- Add proposal requests so users can send travel plans to the agency for review
- Add an admin proposal request dashboard

### Engineering & Polish

- Add backend tests for business rules and ownership checks
- Add frontend tests for critical user workflows
- Add deployment
- Add polished demo/seed data and screenshots
- Add image optimization for uploaded images
- Improve error handling with a reusable API error helper
- Add admin dashboard analytics

---

## Portfolio Value

TravelBloom demonstrates practical full-stack engineering skills, including:

- Building authenticated MERN applications
- Designing role-based admin/user flows
- Modeling real product concepts
- Managing server state with React Query
- Handling protected routes and ownership checks
- Implementing admin content-management features
- Building reusable frontend workflows
- Moving filtering/search/pagination responsibility to the backend
- Connecting backend business rules to frontend UX

The project is intended to show not only technical implementation, but also product thinking and architectural growth.

---

## Project Origin

TravelBloom originally started as a small travel recommendation project inspired by a JavaScript course assignment. It has since been redesigned and expanded into a full-stack travel agency operations prototype with authentication, admin management, curated packages, backend-powered discovery, and user-owned travel plans.
