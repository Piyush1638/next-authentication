const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const postRouter = require('./routes/posts');
const repoRouter = require('./routes/repos');
const promptRouter = require("./routes/prompts");
app.use(express.json());

app.listen(8000, () => {
    mongoose.connect("mongodb+srv://piyushkumarsingh665:hTkob228UlfJdrus@cluster0.xoxxvda.mongodb.net/")
        .then(() => {
            console.log('Connected to MongoDB');
            console.log(`App is listening on port 8000`);
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
});

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/repos", repoRouter);
app.use("/api/prompts",promptRouter);