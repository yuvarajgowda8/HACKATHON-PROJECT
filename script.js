



const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const templateRoutes = require('./routes/templateRoutes');
const matchRoutes = require('./routes/matchRoutes');
const interviewRoutes = require('./routes/interviewRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);

app.use('/api/matches', matchRoutes);
app.use('/api/interviews', interviewRoutes);

const mockInterviewRoutes = require('./routes/mockinterviewRoutes');
app.use('/api/interviews', mockInterviewRoutes);

const resumeMatchingRoutes = require('./routes/resumematchingRoutes');
app.use('/api/resume-matching', resumeMatchingRoutes);

const resumeRoutes = require('./routes/resumeRoutes');
app.use('/api/resumes', resumeRoutes);

app.get('/', (req, res) => {
    res.send('Server is running!');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`)});
