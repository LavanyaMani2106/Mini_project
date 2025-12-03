# Database setup (local development)

This project uses MongoDB via Mongoose. For local development we prefer a local MongoDB instance instead of an external Atlas cluster.

## Recommended local options

1) Install MongoDB Community (Windows)

- Download and install from https://www.mongodb.com/try/download/community
- During install, you can choose "Install MongoDB as a Service" so it starts automatically.
- Start the service (if not already running):

  ```powershell
  # start MongoDB service (if installed as a service)
  Start-Service mongod
  # check status
  Get-Service mongod
  ```

2) Run via Docker (alternative)

  ```powershell
  # pulls and runs MongoDB on port 27017, stores data in local folder ./mongo-data
  docker run -d --name local-mongo -p 27017:27017 -v ${PWD}\mongo-data:/data/db mongo:6.0
  ```

## Project configuration

- The backend reads `MONGO_URI` from `backend/.env`. For local development we set:

```
MONGO_URI=mongodb://127.0.0.1:27017/hakuna-matata
```

- `server.js` already falls back to `mongodb://localhost:27017/hakuna-matata` if `MONGO_URI` is not set.

## Verify connection

- Start MongoDB (service or Docker), then start the backend:

```powershell
cd C:\Users\Lenovo\OneDrive\Desktop\Mini_project\new_project\hakuna-matata\backend
node server.js
```

- On success you should see `Connected to MongoDB` and `Server running on port <PORT>` in the terminal. If MongoDB is not running you'll see a warning but the server will still start (development-friendly behavior).

## Notes

- If you previously used Atlas, remove the Atlas `MONGO_URI` value from `.env` before committing secrets. Do not commit real API keys or DB credentials.
- If you prefer to keep Atlas for production, use environment variables on the production host instead of `.env`.
