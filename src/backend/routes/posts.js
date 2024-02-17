const express = require('express');
const router = express.Router();
const Post = require('../models/postsModel.js');
const User = require('../models/userModel.js');

// all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({data: posts});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// add post 
router.post('/:uid', async (req, res) => {
    try {
        const p = req.body.description;
        const uid = req.params.uid;
        if (!uid) {
            return res.status(404).json({ message: "No user found!" });
        }

        // Check if post with the same title already exists
        const existingPost = await Post.findOne({ title: p.title });
        if (existingPost) {
            return res.status(409).json({ message: "Post with the same title already exists." });
        }

        const post = {
            title: p.title,
            description: p.description,
            uid: uid,
            hashtags: p.hashtags
        }
        const newPost = new Post(post);
        await newPost.save();
        const obj = {
            pid: newPost._id,
            type: "POST"
        }
        const updatedUser = await User.findByIdAndUpdate(uid,
            {
                $push: {myPosts:obj}
            },{new: true});
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get one post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        res.status(200).json({data : post});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete a post 

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        res.status(200).json(post);
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
        const post = await Post.findById(pid);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const commentObj = {
            pid,uid,comment 
        };
        const updatedPost = await Post.findByIdAndUpdate(pid,
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

// save posts
router.patch("/:pid/save/:uid", async(req,res)=>{
    try{
        const pid = req.params.pid;
        const uid = req.params.uid;
        const post = await Post.findById(pid);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const obj = {
            pid: pid,
            type: "POST"
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