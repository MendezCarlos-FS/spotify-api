const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

const spotifyRouter = require("./routes/spotify");

app.use(express.json());
app.use("/api/v1/spotify", spotifyRouter);

const redirect_uri = process.env.REDIRECT_URI || "http://localhost:8000/api/v1/spotify/callback"

app.get("/", (req, res) => {
    res.redirect(301, 'https://accounts.spotify.com/authorize?' +
        `response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirect_uri}`);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})