const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET /bfhl - Returns operation_code: 1
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST /bfhl - Processes input and returns categorized response
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid input format' });
        }

        // Extract numbers and alphabets
        let numbers = [], alphabets = [];
        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (typeof item === 'string' && item.length === 1 && /^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
            }
        });

        // Find highest alphabet (case insensitive)
        let highest_alphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).pop()] : [];

        res.json({
            is_success: true,
            user_id: "your_name_ddmmyyyy",
            email: "your_email@example.com",
            roll_number: "your_roll_number",
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: 'Server error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
