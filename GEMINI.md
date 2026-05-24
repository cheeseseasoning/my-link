# Project Overview

This is a Next.js application named `my-app`, bootstrapped with `create-next-app`. It uses the App Router architecture and is configured with TypeScript, Tailwind CSS, and ESLint.

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (v16.2.6)
- **Library:** [React](https://react.dev/) (v19.2.4)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Linting:** [ESLint](https://eslint.org/)

## Directory Structure

The main application resides in the `my-app/` directory:

- `my-app/app/`: Contains the application routes, layouts, and global styles (App Router).
- `my-app/public/`: Static assets like images and fonts.
- `my-app/next.config.ts`: Next.js configuration.
- `my-app/package.json`: Project dependencies and scripts.
- `my-app/tsconfig.json`: TypeScript configuration.

## Building and Running

All commands should be run from within the `my-app/` directory.

### Development Server

Start the development server with hot-reloading:

```bash
cd my-app
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build

Build the application for production:

```bash
cd my-app
npm run build
```

To start the production server after building:

```bash
npm run start
```

### Linting

Run ESLint to check for code quality issues:

```bash
cd my-app
npm run lint
```

## Development Conventions

- **App Router:** Use the `app/` directory for all routing logic.
- **Components:** Prefer functional components with hooks.
- **Styling:** Use Tailwind CSS utility classes for styling.
- **Types:** Ensure all new code is properly typed with TypeScript.
- **Formatting:** Adhere to the existing ESLint and TypeScript configurations.
