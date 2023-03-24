const express = require('express');
const { connect } = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
connectDb();
const app = express();

const PORT = process.env.PORT  || 5000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", require('./routes/userRoutes'));
app.use("/api/workers", require('./routes/workerRoutes'));
app.use(errorHandler);
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});




