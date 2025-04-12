// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from React frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true // Enable if using cookies or authentication headers
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CREATE: ADD A NEW STUDENT
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }
    const query = "INSERT INTO t_users(name, email, password) VALUES (?, ?, ?)";
    
    try {
        const [result] = await db.execute(query, [name, email, password]);
        console.log("Inserted", result.insertId);
        res.json({ message: "User added successfully", id: result.insertId });
    } catch (err) {
        console.error("Error inserting record..", err);
        res.status(500).json({ error: 'Database error' });
    }
});

// READ: Fetch Users
app.get('/users', async (req, res) => {
    const query = "SELECT * FROM t_users";
    try {
        const [results] = await db.execute(query);
        res.json(results);
    } catch (err) {
        console.error("Error fetching records..", err);
        res.status(500).json({ error: 'Database error' });
    }
});

// UPDATE: Update User
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }
    const query = "UPDATE t_users SET name=?, email=?, password=? WHERE id=?";
    
    try {
        await db.execute(query, [name, email, password, id]);
        res.json({ message: "User updated successfully" });
    } catch (err) {
        console.error("Error updating record..", err);
        res.status(500).json({ error: 'Database error' });
    }
});

// DELETE: Delete User
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM t_users WHERE id=?";
    
    try {
        await db.execute(query, [id]);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting record..", err);
        res.status(500).json({ error: 'Database error' });
    }
});

// LOGIN: Authenticate User
app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const query = "SELECT * FROM t_users WHERE email = ? AND password = ?";
    
    try {
        const [results] = await db.execute(query, [email, password]);
        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', userId: results[0].id });
    } catch (err) {
        console.error("Error fetching user..", err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start Server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
