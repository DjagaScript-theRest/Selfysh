/* globals module, require */

'use strict';

const mongoose = require('mongoose');

const encryption = require('../utilities/encryption');
const fieldsValidator = require('./utils/validator');

const { imagePostSchema } = require('./image-post-model');

const MinUsernameLength = 3;
const MaxUsernameLength = 20;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return fieldsValidator.validateLength(value, MinUsernameLength, MaxUsernameLength);
            },
            message: '{VALUE} is not a valid username!'
        }
    },
    passHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(value) {
                let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    salt: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: 'test.gif'
    },
    imagePosts: [imagePostSchema],
    subscribers: [],
    subscribed: [],
    cover: {
        type: String,
        default: 'defaultCover.jpg'
    },
    fullname: {
        type: String
    }
});

// userSchema.virtual('fullname').get(function() {
//     let fullname = `${this.firstname} ${this.lastname}`;
//     return fullname;
// });

userSchema.method({
    authenticate: function(password) {
        let inputHashedPassword = encryption.generateHashedPassword(this.salt, password);

        if (inputHashedPassword === this.passHash) {
            return true;
        }

        return false;
    }
});

userSchema.method({
    generatePassHash: function(password) {
        let inputHashedPassword = encryption.generateHashedPassword(this.salt, password);
        return inputHashedPassword;
    }
});

mongoose.model('User', userSchema);
module.exports = mongoose.model('User');