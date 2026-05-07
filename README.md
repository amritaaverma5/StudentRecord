# Lab27 Docker Setup

This lab supports a multi-container app environment with backend, frontend, and MongoDB. Jenkins runs separately from the lab app containers.

## Run locally

From `lab27`:

```powershell
cd "c:\Users\DELL\OneDrive\Desktop\Capstone labs\Capstone labs\lab27"
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- MongoDB: mongodb://localhost:27018

## Services

- `mongodb`: MongoDB database
- `backend`: Node/Express backend
- `frontend`: React frontend

## Jenkins

Jenkins is separate from the lab app compose file.

From `lab27/jenkins`:

```powershell
cd "c:\Users\DELL\OneDrive\Desktop\Capstone labs\Capstone labs\lab27\jenkins"
docker compose up -d --build
```

- Jenkins: http://localhost:8090
- Jenkins agent port: `50001`
- Jenkins container name: `capstone-jenkins-ci`

Create a Pipeline job that uses the repository and this `Jenkinsfile`.

## Notes

- Backend uses `backend/Dockerfile`
- Frontend uses `frontend/Dockerfile`
- `docker-compose.yml` builds all app services and starts them together
- `jenkins/docker-compose.yml` runs Jenkins separately
