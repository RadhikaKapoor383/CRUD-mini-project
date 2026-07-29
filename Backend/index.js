const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/CRUD')

app.post('/create', async (req, res) => {
    try {
        const user = req.body;
        const newUser = new UserModel(user);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Failed to create user:', error);
        res.status(400).json({ message: 'Failed to create user', error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
