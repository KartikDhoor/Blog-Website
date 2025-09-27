const express = require('express');
const app = express();
const path=require('path');
require("dotenv").config();


app.use('/uploads', express.static(path.join(__dirname, './public/image')));
const db = require('./server/config/db.js')

const customerRoutes = require('./server/routes/customerRoutes')
const adminRoutes = require('./server/routes/adminRoutes')
const cors = require("cors")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Include credentials (if needed)
}));

app.use('/customer', customerRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error Occurred:", err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});