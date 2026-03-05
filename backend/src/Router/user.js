const router = require('express').Router();
// ADDED: Import the User model (Change the path if it's in a different folder)
const User = require('./userSchema'); 

router.post("/register", async (req, res) => {
    // FIXED: Changed userName to username to match your Schema exactly
    const { username, email, password } = req.body; 
    
    try {
        if(!username || !email || !password){
            return res.status(400).json({msg: "Please enter all fields"});
        }
        const user = new User({
            username, // matched to Schema
            email,
            password,
        });
        await user.save();
        res.status(201).json({msg: "User registered successfully"});
    } catch(err) {
        console.error("Error registering user:", err);
        res.status(500).json({msg: "Server error"});
    }
});

router.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(err) {
        console.error("Error fetching data:", err);
        res.status(500).json({msg: "Server error"});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(user);
    } catch(err) {
        console.error("Error fetching data:", err);
        res.status(500).json({msg: "Server error"});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedUser){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(updatedUser);
    } catch(err) {
        console.error("Error updating data:", err);
        res.status(500).json({msg: "Server error"});
    }       
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json({msg: "User deleted successfully"});
    } catch(err) {
        console.error("Error deleting data:", err);
        res.status(500).json({msg: "Server error"});
    }   
});

module.exports = router;