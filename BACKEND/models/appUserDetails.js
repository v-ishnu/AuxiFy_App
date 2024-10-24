const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define schema for User
const appUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
}, {
    collection: 'UserInfo',
    timestamps: true // adds createdAt and updatedAt fields
});

// Password hashing before saving the user to the database
appUserSchema.pre('save', async function (next) {
    const user = this;

    // If the password is not modified, move to the next middleware
    if (!user.isModified('password')) return next();

    try {
        // Hash the password with a salt of 10 rounds
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Create model
mongoose.model("UserInfo", appUserSchema);