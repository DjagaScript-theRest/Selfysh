'use strict';

let mongoose = require('mongoose');
let encryption = require('./../utils/encryption');

let Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    passHash: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        require: true,
        unique: true
    }
});

userSchema.method({
    generatePassHash(password) {
        let salt = encryption.generateSalt();
        let passHash = encryption.generateHashedPassword(salt, password);
        this.passHash = passHash;
    },
    authenticate(password) {
        let passHashToBeVerified = encryption.generateHashedPassword(this.salt, password);
        let isValid = this.passHash === passHashToBeVerified;
        return isValid;
    }
});

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');