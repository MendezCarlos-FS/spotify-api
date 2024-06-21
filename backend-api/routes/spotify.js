const express = require("express");
const router = express.Router();
const { JWT, checkTokenValidity, authenticationHeader } = require("../middleware/authentication");

const redirect_uri = process.env.REDIRECT_URI || "http://localhost:8000/api/v1/spotify/callback";

router.get("/login", async (req, res) => {
    res.redirect(301, 'https://accounts.spotify.com/authorize?' +
        `response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirect_uri}`);
});

router.get("/callback", async (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const error = req.query.error || null;

    if (error) {
        res.status(500).json({ message: "An error has occurred when trying to access Spotify."});
        return;
    }

    try {
        const query = `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`;
        JWT.token = await fetch(`https://accounts.spotify.com/api/token?${query}`, {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
            }
        }).then(res => res.json());

        if (JWT.token.access_token) {
            JWT.time_obtained = Date.now();
        }
        
        res.status(JWT.token.access_token ? 200 : 500).json(JWT);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/search", checkTokenValidity, async (req, res) => {
    const { q } = req.query;

    const url = `https://api.spotify.com/v1/search?q=${q}&type=album%2Cartist%2Ctrack`;

    try {
        const result = await fetch(url, {
            headers: {
                ...authenticationHeader()
            }
        }).then(res => res.json());

        res.status(200).json(result);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;