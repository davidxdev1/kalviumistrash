const express = require('express');
const connectDB = require('./src/connect/db'); // Adjust path if needed
// ADDED: Import your router file (Adjust path if needed)
const userRoutes = require('./user'); 

require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ADDED: Tell express to use your routes!
// Now, all routes in user.js will start with /api
app.use('/api', userRoutes); 

app.get('/', (req, res) => {
    res.send('Hello World');
});

// IMPORTANT: If process.env.PORT is missing, default to 3000 to prevent crashing
const PORT = process.env.PORT || 3000; 

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is running on PORT ${PORT}`);
    } catch (error) {
        console.error("Error starting server:", error);
    }
});