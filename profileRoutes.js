const express = require('express');
const multer = require('multer');
const Customer = require('../models/customer');
const ServiceProvider = require('../models/ServiceProvider');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Set up multer for file uploads (profile images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage });

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Update customer profile
router.put('/profile/customer', authMiddleware, upload.single('profileImage'), async (req, res) => {
  const { name, phoneNumber } = req.body;
  const profileImage = req.file ? req.file.filename : undefined;

  try {
    const customer = await Customer.findById(req.userId);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    customer.name = name || customer.name;
    customer.phoneNumber = phoneNumber || customer.phoneNumber;
    customer.profileImage = profileImage || customer.profileImage;

    await customer.save();
    res.json({ message: 'Profile updated successfully', customer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update service provider profile
router.put('/profile/service-provider', authMiddleware, upload.single('profileImage'), async (req, res) => {
  const { name, phoneNumber, serviceName, description, pricing, availability } = req.body;
  const profileImage = req.file ? req.file.filename : undefined;

  try {
    const provider = await ServiceProvider.findById(req.userId);
    if (!provider) return res.status(404).json({ message: 'Service provider not found' });

    provider.name = name || provider.name;
    provider.phoneNumber = phoneNumber || provider.phoneNumber;
    provider.serviceName = serviceName || provider.serviceName;
    provider.description = description || provider.description;
    provider.pricing = pricing || provider.pricing;
    provider.availability = availability || provider.availability;
    provider.profileImage = profileImage || provider.profileImage;

    await provider.save();
    res.json({ message: 'Profile updated successfully', provider });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;