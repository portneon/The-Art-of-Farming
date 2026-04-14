# 🌱 The Art of Farming

> A React-based web application for managing and exploring garden plants — built with modern tooling, smooth animations, and real API integrations.

**[Live Demo →](https://the-art-of-farming.vercel.app/)**

---


## What is this?

The Art of Farming is a personal project born out of a simple idea: make plant and garden management feel less like a chore and more like an experience. Whether you're tracking what's growing in your garden or just curious about plants, this app gives you a clean, responsive interface to do it.

It's built entirely in React, powered by Vite, styled with Tailwind CSS, and animated with both Framer Motion and GSAP — so it moves the way good software should.

---

## Features

- Browse and manage garden plants
- Connected to live backend APIs for real data
- Smooth page transitions and UI animations (Framer Motion + GSAP)
- Fully responsive — works on mobile and desktop
- Environment-based API configuration for easy deployment
- Fast development and build times with Vite

---

## Tech Stack

| Layer      | Technology           |
| ---------- | -------------------- |
| Framework  | React 19             |
| Bundler    | Vite 6               |
| Routing    | React Router DOM v7  |
| Styling    | Tailwind CSS         |
| Animations | Framer Motion + GSAP |
| Icons      | Lucide React         |
| Deployment | Vercel               |

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/portneon/The-Art-of-Farming.git
cd The-Art-of-Farming

# Install dependencies
npm install
```

### Environment Setup

This project uses environment variables to talk to the backend. Before running the app, set up your `.env` file:

```bash
cp .env.example .env
```

Then open `.env` and set your API base URL:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

> Never commit your `.env` file. It's already in `.gitignore`, but good to keep in mind.

### Running Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
The-Art-of-Farming/
├── public/             # Static assets
├── src/                # Application source code
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── ENV_README.md       # Guide for environment variable setup
└── package.json
```

---

## Environment Variables

| Variable            | Description                 |
| ------------------- | --------------------------- |
| `VITE_API_BASE_URL` | Base URL of the backend API |

All Vite environment variables must be prefixed with `VITE_` to be accessible on the client side. You can read more about this in the [ENV_README.md](./ENV_README.md).

---

## Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push your fork to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add `VITE_API_BASE_URL` under your project's Environment Variables in the Vercel dashboard
4. Deploy

---

## Contributing

This is a personal project, but if you spot a bug or have a suggestion, feel free to open an issue. Pull requests are welcome too.

---

## License

This project is open source. Feel free to use it, learn from it, or build on top of it.

---

<p align="center">Made with  by <a href="https://github.com/portneon">portneon</a></p>
