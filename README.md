# Project Overview [WIP]
This project is an assignment as part of the Project and Portfolio III class for Full Sail University. It utilizes Spotify's Web API to search for music, albums, artists, etc. on Spotify with a registered account. It uses the backend for any related requests that will be sent to the Web API and a frontend that displays the results.

# Prerequisites

- NodeJS >= v20.9.0
- npm >= v10.2.1
- Tested on latest Opera GX version.


# Getting Started

### Installation

To setup all of the project's dependencies, run:

```
npm i && npm run install-all
```

This project requires environment variables to run. For this, rename the `.env.copy` file to `.env` and setup the environment variables there.

### Run Both Frontend and Backend Concurrently

```
npm run dev:react
```

### Run Express Backend 

```
cd backend-api
npm run dev
```

### Run React.js Frontend

```
To be implemented
```

### Links

- http://localhost:8000 - Link to backend API (Redirects to the spotify login URI)
- http://localhost:8000/api/v1/spotify/login - Redirects to Spotify's login and authorization page
- http://localhost:8000/api/v1/spotify/callback - Used to obtain the JWT after successful authorization
- http://localhost:8000/api/v1/spotify/search?q=[query] - Searches the Spotify Web API for albums, tracks and artists related to the specified.
- More to be implemented