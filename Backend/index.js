const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/CRUD')

app.post('/create', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
});

app.get('/users', async (req, res) => {
    const users = await UserModel.find({});
    res.json(users);
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});