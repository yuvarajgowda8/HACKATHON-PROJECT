const path = require('path');
const express = require('express');
const app = express();
//database

const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/sit")
    .then(()=>{
        console.log('Database Connected Succesfully....')
        app.listen(5088,()=>{
            console.log("Server is running")
        })
        }).catch(err=>{
            if(err)
            {
                console.log("Database not connected")
            }
        })
        const jobcSchema=new mongoose.Schema({
            Fullname:String,
            emailid:String,
            Password:String
          })
          
          const userModel=mongoose.model("jobc",jobcSchema)
          app.get("/getjobc",async(req,res)=>{
              const userData=await userModel.find();
              res.json(userData)
          })
          
        
        
const dotenv = require('dotenv');
const cors = require('cors');

//  database-related imports and functions
// const connectDB = require('./config/db');
//  the database connection
// connectDB();

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();



app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/customer',require('./models/customer'))


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes (if any)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'home.html')); // Default file to serve
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
