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

let imagePostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    },
    //Just for now, image is url from www
    imageUrl: {
        type: String,
        required: true
    },
    // image: {
    //     type: imageSchema,
    //     required: true
    // },
    author: {
        type: authorSchema,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: {
        type: String[]
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