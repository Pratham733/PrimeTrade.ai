Hosting with Docker and docker-compose

Prerequisites
- Docker and docker-compose installed on your machine.

Quick start (Windows, cmd.exe):

1. From repository root:

```cmd
cd c:\Users\sprat\Downloads\Intershala\primetradeai
docker-compose up --build
```

2. App will be available at http://localhost (frontend served on port 80). Backend API available at http://localhost:5000/api

Notes
- The backend uses `backend/.env` for MONGO_URI, JWT_SECRET, and CLIENT_URL. Ensure values are correct before starting.
- The `frontend` build will use the `VITE_API_BASE_URL` environment variable set in the compose file to `/api`, and nginx proxies `/api` to the `backend` service.
- To run only backend or frontend during development, use `docker-compose up --build backend` or `docker-compose up --build frontend`.

Security
- Do not commit production secrets into `.env`. Use a secrets manager for production deployments.

Optional improvements
- Add healthchecks, restart policies, and separate production `.env` files.
- Use a multi-stage build for the backend if you have build steps.
