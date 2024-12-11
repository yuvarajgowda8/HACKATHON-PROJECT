const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');
const ServiceProvider = require('../models/ServiceProvider');
const router = express.Router();

// Register a customer
router.post('/register/customer', async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) return res.status(400).json({ message: 'Customer already exists' });

    const newCustomer = new Customer({ name, email, password, phoneNumber });
    await newCustomer.save();
    const token = jwt.sign({ id: newCustomer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'Customer registered successfully', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register a service provider
router.post('/register/service-provider', async (req, res) => {
  const { name, email, password, phoneNumber, serviceName, description, pricing, availability } = req.body;

  try {
    const existingProvider = await ServiceProvider.findOne({ email });
    if (existingProvider) return res.status(400).json({ message: 'Service provider already exists' });

    const newProvider = new ServiceProvider({
      name,
      email,
      password,
      phoneNumber,
      serviceName,
      description,
      pricing,
      availability
    });
    await newProvider.save();
    const token = jwt.sign({ id: newProvider._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'Service provider registered successfully', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Customer login
router.post('/login/customer', async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await customer.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Service provider login
router.post('/login/service-provider', async (req, res) => {
  const { email, password } = req.body;

  try {
    const provider = await ServiceProvider.findOne({ email });
    if (!provider) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await provider.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: provider._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router