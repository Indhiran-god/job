const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    confirmPassword: { // confirm password is generally handled in front end validation, not stored
        type: String,
        select: false,
    },
    jobTitle: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
    },
    skills: {
        type: String,
        required: [true, 'Skills are required'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
    },
    profilePic: {
        type: String,
        default: null, // Stores base64 encoded image if provided
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create and export the user model
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
