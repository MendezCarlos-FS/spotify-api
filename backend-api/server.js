const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

const spotifyRouter = require("./routes/spotify");

app.use(express.json());
app.use("/api/v1/spotify", spotifyRouter);

app.get("/", (req, res) => {
    res.redirect(301, 'http://localhost:8000/api/v1/spotify/login');
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})