require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require("path");

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
})


const router = require("./routes");
app.use("/api", router);

const port = 8080;
const cors = require('cors');

// Enable CORS for all requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://todo-lac-five-94.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


async function startServer() {
    await connectToMongoDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
}
startServer();