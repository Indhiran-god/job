const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// Set allowed origins for CORS
const allowedOrigins = [process.env.FRONTEND_URL];

// Custom CORS handling for Vercel compatibility
app.use((req, res, next) => {
    const origin = req.headers.origin;
    console.log("Request Origin:", origin);  // Log incoming request origin
    if (allowedOrigins.includes(origin) || !origin) {  // Allow if in allowed origins
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Respond OK to preflight requests
    }
    next();
});

// Middleware
app.use(cookieParser());
app.use(express.json());

// Set a longer timeout for requests
app.use((req, res, next) => {
    res.setTimeout(30000, () => {  // 30 seconds timeout
        console.log('Request has timed out.');
        res.sendStatus(408);  // Send a 408 Request Timeout status code
    });
    next();
});

// API Routes
app.use("/api", router);

// Start server and connect to DB
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
        console.log("Allowed Origins:", allowedOrigins);  // Log allowed origins at startup
    });
}).catch(err => {
    console.error("Database connection failed:", err.message);
});
