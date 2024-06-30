const redirect_uri = process.env.REDIRECT_URI || "http://localhost:8000/api/v1/spotify/callback";
const JWT = { time_obtained: null, token: null };

function checkTokenValidity(req, res, next) {
    if (!JWT.token) {
        res.status(200).json({ url: 'https://accounts.spotify.com/authorize?' +
            `response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirect_uri}` });
        return;
    }

    // If the JWT has expired, refresh the token.
    const jwt_expiration_in_ms = JWT.token.expires_in * 1000;
    if (JWT.time_obtained + jwt_expiration_in_ms < Date.now()) {
        refreshToken(req, res, next);
        return;
    }

    next();
}

async function refreshToken(req, res, next) {
    const query = `grant_type=refresh_token&refresh_token=${JWT.token.refresh_token}`;
    const url = `https://accounts.spotify.com/api/token?${query}`;

    try {
        const newToken = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + (new Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64"))
            }
        }).then(res => res.json());

        if (newToken.access_token) {
            JWT.time_obtained = Date.now();
            JWT.token.access_token = newToken.access_token;
            JWT.token.token_type = newToken.token_type;
            JWT.token.expires_in = newToken.expires_in;
            next();
        } else {
            JWT.token = newToken;
            JWT.time_obtained = null;
            res.status(500).json(JWT);
        }

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

function authenticationHeader() {
    return {
        Authorization: `Bearer ${JWT.token.access_token}`
    }
}

module.exports = {
    JWT,
    checkTokenValidity,
    authenticationHeader
}