const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    comments: {
        type: [{}],
        default: []
    },
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hashtags: {
        type: [String],
        default: [],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    uid: 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
