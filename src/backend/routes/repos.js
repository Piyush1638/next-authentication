const express = require("express");
const router = express.Router();
const Repo = require("../models/repoModel.js");
const User = require("../models/userModel.js");

// all repos

router.get("/", async (req, res) => {
    try {
        const repos = await Repo.find();
        res.status(200).json({ data: repos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }
);

// add repo

router.post("/:uid", async (req, res) => {
    try {
        const p = req.body;
        const uid = req.params.uid;
        if(!uid)
        {
            return res.status(404).json({message: "No user found!"});
        }
        const existingPost = await Repo.findOne({ title: p.title });
        if (existingPost) {
            return res.status(409).json({ message: "Post with the same title already exists." });
        }
        const repo = {
            title: p.title,
            description : p.description,
            uid : uid,
            hashtags : p.hashtags
        }
        const newRepo = new Repo(repo);
        await newRepo.save();
        res.status(201).json(newRepo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// get one repo by id
router.get("/:id", async (req, res) => {
    try {
        const repo = await Repo.findById(req.params.id);
        if (!repo) {
            return res.status(404).json({ message: "Repo not found." });
        }
        res.status(200).json({data:repo});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete a repo

router.delete("/:id", async (req, res) => {
    try {
        const repo = await Repo.findByIdAndDelete(req.params.id);
        if (!repo) {
            return res.status(404).json({ message: "Repo not found." });
        }
        res.status(200).json(repo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

// add a comment 
router.patch("/:pid/addcomment/:uid",async (req,res)=>{
    try{
        const pid = req.params.pid;
        const uid = req.params.uid;
        const comment = req.body.comment;
        const repo = await Repo.findById(pid);
        if (!repo) {
            return res.status(404).json({ message: "Repo not found." });
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const commentObj = {
            pid,uid,comment 
        };
        const updatedPost = await Repo.findByIdAndUpdate(pid,
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

module.exports = router;