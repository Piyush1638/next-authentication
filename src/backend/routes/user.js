const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');

// all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({data: users});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// one user by id 
router.get('/:id',async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// update an user
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req
            .params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;