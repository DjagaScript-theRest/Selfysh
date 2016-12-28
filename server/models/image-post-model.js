'use strict';

const mongoose = require('mongoose');

const { imageSchema } = require('./image-model');

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

const imagePostSchema = mongoose.Schema({
    image: {
        type: imageSchema,
        required: true
    },
    author: {
        type: authorSchema,
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
module.exports = {
    ImagePost: mongoose.model('ImagePost'),
    imagePostSchema
};