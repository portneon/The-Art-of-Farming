# Environment Variables Configuration

This project uses environment variables to manage API endpoints. This allows you to easily switch between different backend environments (development, staging, production).

## Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the API URL in `.env` to point to your backend:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com
   ```

## Environment Variables

- `VITE_API_BASE_URL` - The base URL for your backend API

**Note**: In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

## Usage in Code

Access the environment variable using:
```javascript
import.meta.env.VITE_API_BASE_URL
```

Example:
```javascript
const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
  method: "POST",
  // ...
});
```

## Important

- Never commit `.env` to version control (it's already in `.gitignore`)
- Always use `.env.example` as a template for other developers
- Restart the dev server after changing environment variables
