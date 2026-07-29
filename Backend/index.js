const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/CRUD')

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ message: 'Failed to fetch users', error: err.message }));
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Failed to fetch user:', error);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(400).json({ message: 'Failed to update user', error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Failed to delete user:', error);
        res.status(400).json({ message: 'Failed to delete user', error: error.message });
    }
});

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
