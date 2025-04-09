require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectToMongoDB } = require("./database");

const app = express();
const port = 8080;

// ✅ Apply CORS middleware before any route
app.use(cors({
    origin: 'https://todo-lac-five-94.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Body parser
app.use(express.json());

// Static file serving (optional if you're using client separately)
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
});

// Use router
const router = require("./routes");
app.use("/api", router);

// Start server
async function startServer() {
    await connectToMongoDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
}
startServer();
