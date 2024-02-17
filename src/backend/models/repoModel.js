const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    comments: {
        type: [{}],
        default: []
    },
    hashtags: {
        type: [String],
        default: [],
        required: true
    },
    title : {
        type: String,
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

const Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;
