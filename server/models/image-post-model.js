'use strict';

const mongoose = require('mongoose');

const Image = require('./image-model');

const authorSchema = mongoose.Schema({
    username: {
        id: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    }
});

mongoose.model('AuthorSchema', authorSchema);
const Author = mongoose.model('AuthorSchema');

const imagePostSchema = mongoose.Schema({
    image: {
        type: Image,
        required: true
    },
    author: {
        type: Author,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    }
});

mongoose.model('ImagePost', imagePostSchema);
module.exports = mongoose.model('ImagePost');