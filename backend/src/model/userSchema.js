const { Schema, model } = require('mongoose');
// REMOVED: const { use } = require('react'); <-- You cannot use React in Node.js backend

const userSchema = new Schema({
    username: { // Note: lowercase 'n'
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true, 
    }
}, {
    timestamps: true
});

// FIXED: Added the missing parenthesis at the end
module.exports = model('User', userSchema);