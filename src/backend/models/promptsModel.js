const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
    description: {
        type: [String, "Please provide a description."],
        required: true
    },
    title : {
        type: String,
        required: true
    },
    prompt: {
        type: [String, "Please provide a prompt."],
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

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;
