'use strict';

let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function (config) {
    mongoose.connect(config.connectionString);
    const db = mongoose.connection;
    db.once('open', (err) => {
        if (err) {
            console.log(err);
        }

        console.log('Connected to mongoDb!');
    });

    return mongoose;
};