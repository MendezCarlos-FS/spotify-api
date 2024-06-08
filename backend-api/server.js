const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "Basic endpoint."});
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})