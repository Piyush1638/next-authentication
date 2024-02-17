const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const Prompt = require("../models/promptsModel.js");
// all Prompts
router.get('/', async (req, res) => {
    try {
        const prompts = await Prompt.find();
        res.status(200).json({data: prompts});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// add Prompt 
router.post('/:uid', async (req, res) => {
    try {
        const p = req.body;
        const uid = req.params.uid;
        if(!uid)
        {
            return res.status(404).json({message: "No user found!"});
        }
        const existingPost = await Prompt.findOne({ title: p.title });
        if (existingPost) {
            return res.status(409).json({ message: "Post with the same title already exists." });
        }
        const prompt = {
            title: p.title,
            description : p.description,
            uid : uid,
            prompt : p.prompt,
            hashtags : p.hashtags
        }
        const newPrompt = new Prompt(prompt);
        await newPrompt.save();
        const obj = {
            pid: newPrompt._id,
            type: "PROMPT"
        }
        const updatedUser = await User.findByIdAndUpdate(uid,
            {
                $push: {myPosts: obj}
            },{new: true});
        res.status(201).json(newPrompt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get one Prompt by id
router.get('/:id', async (req, res) => {
    try {
        const prompt = await Prompt.findById(req.params.id);
        if (!prompt) {
            return res.status(404).json({ message: "Prompt not found." });
        }
        res.status(200).json({data : prompt});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete a Prompt 

router.delete('/:id', async (req, res) => {
    try {
        const prompt = await Prompt.findByIdAndDelete(req.params.id);
        if (!prompt) {
            return res.status(404).json({ message: "Prompt not found." });
        }
        res.status(200).json({ message: "Prompt deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// add a comment
router.patch("/:pid/addcomment/:uid",async (req,res)=>{
    try{
        const pid = req.params.pid;
        const uid = req.params.uid;
        const comment = req.body.comment;
        const prompt = await Prompt.findById(pid);
        if (!prompt) {
            return res.status(404).json({ message: "Prompt not found." });
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const commentObj = {
            pid,uid,comment 
        };
        const updatedPost = await Prompt.findByIdAndUpdate(pid,
            {
                $push: {comments: commentObj}
            },{new: true});
        res.status(201).json({message: "Successfully added a comment", data: updatedPost});
    }
    catch(err)
    {
        res.status(500).json({message: err.message});
    }
})

// save prompts
router.patch("/:pid/save/:uid", async(req,res)=>{
    try{
        const pid = req.params.pid;
        const uid = req.params.uid;
        const prompt = await Prompt.findById(pid);
        if (!prompt) {
            return res.status(404).json({ message: "Prompt not found." });
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const obj = {
            pid: pid,
            type: "PROMPT"
        }
        const updateUser = await User.findByIdAndUpdate(uid,{
            $push: {savedPosts: obj}
        },{new: true});
        res.status(201).json({message: "Successfully saved the post", data: updateUser});
    }
    catch(err)
    {
        res.status(500).json({message: err.message});   
    }
})

module.exports = router;