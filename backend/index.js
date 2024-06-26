const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


// importing db
const connectDB = require('./db');
connectDB();

// importing routes
const faqRoutes = require('./routes/faqRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// middlewares
app.use(cors())
app.use(express.json())


// default route
app.get('/',(req,res)=>{
    if(mongoose.connection.readyState === 1){
        res.status(200).json([{
            "status": "success",
            "code": 200,
            "message": 'Welcome To NOBSTASH',
            "database": "Connected to MongoDb"
        }])
    }
    else{
        res.status(200).json([{
            "status": "success",
            "code": 200,
            "message": 'Welcome To NOBSTASH',
            "database": "Not connected to MongoDb"
        }])
    }
    
})



// using routes
app.use('/api/faqs', faqRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoutes);


// listening to server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

module.exports = app;