# TravelBloom

**TravelBloom** is a full-stack travel experience planning platform built with the MERN stack.

The application allows admins to manage travel destinations and curate travel packages, while users can discover destinations, browse published packages, create personal travel plans, and add individual destinations to those plans.

The project started as a small travel recommendation frontend and has evolved into a more complete full-stack application focused on authentication, role-based access, admin content management, user-owned data, React Query server-state handling, and product-oriented travel planning workflows.

---

## Project Overview

TravelBloom is designed around two main user roles:

### Admin

Admins manage the travel catalog by creating destinations, uploading images, archiving/reactivating destinations, and building curated travel packages.

### User

Users can browse destinations and packages, save favorite destinations, create personal travel plans, create a plan from a curated package, and add individual destinations to existing travel plans.

The core product idea is:

> **Admins curate travel experiences. Users turn those experiences into personalized travel plans.**

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
- Support for both uploaded images and external image URLs
- Soft archive/reactivate behavior
- Public destination browsing hides archived destinations
- Destination details pages

### Curated Travel Packages

- Admin package builder
- Add destinations to packages
- Package duration and travel style metadata
- Draft/published package workflow
- Public package listing
- Public package details page
- Validation rule preventing empty packages from being published

### User Travel Plans

- User-owned travel plans
- Create, edit, and delete travel plans
- Add individual destinations to existing plans
- Prevent duplicate destinations inside the same plan
- Create a new travel plan from a published package
- Track package origin with a subtle “Based on package” indicator
- Edit trip item notes and priority
- Remove destinations from travel plans
- Travel plan count shown in the navigation

### Frontend UX

- Responsive React UI with TailwindCSS
- Modal-based workflows
- Toast notifications
- Loading, empty, and error states
- Protected route handling
- Admin/public/user navigation separation

---

## Core User Flows

### Admin Flow

1. Admin logs in.
2. Admin creates or edits destinations.
3. Admin uploads destination images.
4. Admin builds travel packages from selected destinations.
5. Admin publishes packages for public users.

### User Flow

1. User browses destinations and packages.
2. User opens a package details page.
3. User creates a personal travel plan from the package.
4. User customizes the generated travel plan.
5. User can also add individual destinations to existing travel plans.
6. User can edit notes, priorities, and remove destinations from their plans.

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

Local component state is used for temporary UI concerns such as modal open/close state, selected trip IDs, and form drafts.

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
cd backend
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
cd frontend
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
- User-owned travel plans
- Create travel plan from package flow
- Add destination to travel plan flow
- React Query migration for major server-state features

---

## Planned Improvements

Near-term improvements:

- Extract reusable add-to-plan workflow logic into a custom hook
- Reuse the add-to-plan modal from destination cards
- Improve travel plan itinerary structure with day sections
- Add polished demo/seed data
- Improve README screenshots and project presentation

Future improvements:

- Refactor favorites fully into React Query hooks
- Add pagination for admin/public lists
- Add normalized destination types and tags
- Add admin dashboard analytics
- Add backend tests for business rules and ownership checks
- Add deployment
- Add image optimization
- Improve error handling with a reusable API error helper

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
- Connecting backend business rules to frontend UX

The project is intended to show not only technical implementation, but also product thinking and architectural growth.

---

## Project Origin

TravelBloom originally started as a small travel recommendation project inspired by a JavaScript course assignment. It has since been redesigned and expanded into a full-stack travel planning platform with authentication, admin management, curated packages, and user-owned travel plans.
