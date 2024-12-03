require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');

const app = express();
app.use(express.json());