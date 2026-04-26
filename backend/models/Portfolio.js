const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // One portfolio per user
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    designation: {
        type: String,
        required: [true, 'Designation is required'],
        trim: true
    },
    about: {
        type: String,
        required: [true, 'About section is required']
    },
    contactEmail: {
        type: String,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    resumeUrl: {
        type: String,
        trim: true,
        default: ''
    },
    githubUrl: {
        type: String,
        trim: true
    },
    twitterUrl: {
        type: String,
        trim: true
    },
    linkedinUrl: {
        type: String,
        trim: true
    },
    skills: [String],
    projects: [{
        title: String,
        description: String,
        link: String,
        tech: [String]
    }],
    experience: [{
        company: String,
        role: String,
        duration: String,
        description: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
