'use strict';

let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function ({ connectionString }) {
    console.log(connectionString);
    mongoose.connect(connectionString);
};