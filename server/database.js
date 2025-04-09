require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://varunbotcha:varun123@cluster0.afzwir6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const express=require('express');
const app = express();
app.use(express.json());
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://todo-lac-five-94.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.options('*', cors());
let client;
const connectToMongoDB = async () => {
    if (!client) {
        try {
            client = await MongoClient.connect(uri, options);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.log(error);
        }
    }
    return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };