const express = require('express');
const app = express();
require("dotenv").config();
const multer = require('multer');
const db = require('./server/config/db')

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







app.listen(5000, (err) => {
    if (err) {
        console.log("Error Occured:-", err)
    }
    else
        console.log("Server is running in 5000")
})