const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    res.json({ result: Number(num1) + Number(num2) });
});

app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    res.json({ result: Number(num1) - Number(num2) });
});

app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    res.json({ result: Number(num1) * Number(num2) });
});

app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    if (Number(num2) === 0) {
        return res.status(400).json({ error: "Cannot divide by zero" });
    }
    res.json({ result: Number(num1) / Number(num2) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));