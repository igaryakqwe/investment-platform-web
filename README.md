# War Pets Web

> **EquipUA** was created to accelerate Ukraine's recovery by connecting transparent projects with responsible investors, ensuring efficient and impactful reconstruction of critical infrastructure.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Contributing](#contributing)

## Features

- **User authentication and roles**: shelters, volunteers, adopters.
- **Projects listing**: View and add projects for investment and donation.
- **Certificates**: Generated certificates when user invest.
- **Web-socket chat**: Communication between investor and project creator on site.
- **Responsive UI** with mobile support and dark mode.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/), TypeScript
- **UI**: Tailwind CSS, Radix UI, Shadcn UI
- **Form handling**: React Hook Form + Zod
- **State management**: Zustand
- **API integration**: REST
- **Linting**: ESLint, Prettier

## Prerequisites

- **Node.js** ≥ v16
- **pnpm** (or `npm`/`yarn` if reconfigured)

## Getting Started

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Sikorsky-Devs/investment-platform-web.git
cd investment-platform-web
```

2. **Install dependencies:**

```bash
pnpm install
# or
npm install
```

### Environment Variables

Copy the example file and edit as needed:

```bash
cp .env.example .env
```

Example contents of `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Running the App

**Development mode:**

```bash
pnpm dev
# or
npm run dev
```

**Production build:**

```bash
pnpm build
pnpm start
```

## Project Structure

A simplified look at the project layout:
```
├── public/
│   ├── favicon.ico
│   └── logo.svg
└── src/
    ├── api/
    │   ├── auth/
    │   │   ├── auth.api.ts
    │   │   └── auth.dto.ts
    │   ├── contacts/
    │   ├── projects/
    │   └── users/
    ├── app/
    │   ├── (main)/
    │   │   ├── profile/
    │   │   │   ├── page.tsx
    │   │   │   └── layout.tsx
    │   │   ├── projects/
    │   │   │   ├── [projectId]/
    │   │   │   │   └── page.tsx
    │   │   │   └── page.tsx
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   └── auth/
    │       ├── approve-email/
    │       ├── sign-in/
    │       ├── sign-up/
    │       ├── success/
    │       └── layout.tsx
    ├── components/
    ├── config/
    ├── constants/
    ├── context/
    ├── features/
    │   ├── adverts/
    │   ├── auth/
    │   ├── home/
    │   ├── posts/
    │   ├── profile/
    │   ├── shelter/
    │   ├── shelter-profile/
    │   └── shelters/
    ├── hooks/
    ├── lib/
    ├── providers/
    ├── store/
    ├── styles/
    ├── types/
    └── utils/
```

## Architecture Overview

- **public/**  
  Contains static files that are directly accessible by the browser, such as images and the favicon.

- **src/**  
  The main source directory, organized as follows:
    - **api/**  
      Modules responsible for backend communication. These include:
        - **auth/** — Handles authentication-related API functions.
        - **contacts/** — Responsible for contact data and inquiries.
        - **projects/** — Manages projects-related API functions.
        - **users/** — Manages user-related API functions.
    - **app/**  
      Contains files related to pages and routing:
        - **(main)/** — The main section of the application, including:
            - **profile/** — Contains page for user profile.
            - **projects/** — Section for projects.
        - **auth/** — Dedicated to authentication flows, such as registration, signing in, email approval, and success notifications.
    - **components/**  
      A library of reusable UI components (e.g., buttons, cards, modals, and layout elements).
    - **constants/**  
      Files containing constant values and enumerations used throughout the application.
    - **features/**  
      Modules encapsulating specific functional features (e.g. auth, home, profile, project, projects).
    - **hooks/**  
      Custom React hooks that encapsulate reusable logic.
    - **lib/**  
      Helper libraries and utilities for API requests, data transformations, and other common tasks.
    - **config/**  
      Configuration files.
    - **context/**  
      Context declaration.
    - **providers/**  
      React context providers for global state management and theming.
    - **store/**  
      State management files (for example, using Zustand).
    - **styles/**  
      Global styling and CSS files.
    - **types/**  
      Shared TypeScript interfaces and type definitions used across the application.
    - **utils/**  
      General utility functions and helper modules.

## Contributing

You are welcome to contribute in any of the following ways:

1. Report or fix bugs.
2. Implement new features (e.g., filters, blog, maps).
3. Improve UI/UX or accessibility.
4. Refactor or improve code readability.

### How to Contribute

1. **Fork** this repository.
2. **Create** a branch:
   ```bash
   git checkout -b my-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. **Push** to your fork:
   ```bash
   git push origin my-feature
   ```
5. Open a **Pull Request** to the main repository.