# Simple React To-Do List App

A simple to-do list application built with React, TypeScript, and Tailwind CSS. This project demonstrates state management, component composition, and basic CRUD operations in a React application using the localstorage for persistence.

## Requirements
The latest LTS version of Node.js, npm, and Git.


## Running the App

1. Clone the repository:

```bash
git clone https://github.com/ntroccoli/react-todo-app.git
cd react-todo-app
```
2. Install dependencies:

```bash
npm install
```
3. Start the development server:

```bash
npm run dev
```
4. Open your browser and navigate to `http://localhost:5173` to see the app in action.


## Tech Stack
- React
- TypeScript
- Tailwind CSS
- Vite
- Vitest & React Testing Library
- Shadcn UI components


## Testing

This project uses Vitest and React Testing Library for unit and integration testing. Vitest is preferred over Jest due to its native compatibility and faster performance with Vite-based projects.

- Run all tests once:

```bash
npm run test
```

- Watch mode during development:

```bash
npm run test:watch
```

Tests are configured in `vite.config.ts` with the `jsdom` environment and a global setup file at `src/setupTests.ts`.

