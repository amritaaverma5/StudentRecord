# Lab27 Docker + Jenkins Setup

This lab now supports a multi-container environment with backend, frontend, MongoDB, and Jenkins.

## Run locally

From `lab27`:

```powershell
cd "c:\Users\DELL\OneDrive\Desktop\Capstone labs\Capstone labs\lab27"
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- MongoDB: mongodb://localhost:27017
- Jenkins: http://localhost:8080

## Services

- `mongodb`: MongoDB database
- `backend`: Node/Express backend
- `frontend`: React frontend
- `jenkins`: Jenkins server running in Docker

## Jenkins

1. Open Jenkins on http://localhost:8080
2. Create a Pipeline job that uses the repository and this `Jenkinsfile`
3. If you want Jenkins to build Docker images, make sure Docker socket access is available to the Jenkins container.

## Notes

- Backend uses `backend/Dockerfile`
- Frontend uses `frontend/Dockerfile`
- `docker-compose.yml` builds all app services and starts them together
