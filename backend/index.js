// ==========================================
// UPDATED index.js (ADD ANALYTICS ROUTES + CORS FOR VERCEL)
// ==========================================

const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

app.use('/uploads', express.static(path.join(__dirname, './public/image')));

// Connect DB
require('./server/config/db');

// Import routes
const customerRoutes = require('./server/routes/customerRoutes');
const adminRoutes = require('./server/routes/adminRoutes');
const analyticsRoutes = require('./server/routes/analyticsRoutes'); // ← NEW

// Import config
const seedAdmin = require('./server/config/adminSeeder.js');
const cors = require('cors');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Updated CORS
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://blog-website-to47.vercel.app' // deployed frontend
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser requests
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Seed admin
seedAdmin();

// Register routes
app.use('/customer', customerRoutes);
app.use('/admin', adminRoutes);
app.use('/analytics', analyticsRoutes); // ← NEW

const PORT = process.env.PORT || 5000;
app.get("/health",(req,res)=>{
  res.send({sucess:true,status:200, message:"Blog applicaiton backend is working"})
})

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error Occurred:', err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
