'use strict';

const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        require: true
    }
});

mongoose.model('Image', imageSchema);
module.exports = mongoose.Schema('Image');