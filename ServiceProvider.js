const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define service provider schema
const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  serviceName: { type: String, required: true },  // The type of service they provide
  description: { type: String, required: true },
  pricing: { type: String, required: true },
  availability: { type: String, required: true },
  profileImage: { type: String }, // Optional: to store image path
});

serviceProviderSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
serviceProviderSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);