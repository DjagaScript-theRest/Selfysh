/*globals */
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function () {

    let User = require('../models/user-model');
    let ImagePost = require('../models/image-post-model');
    let models = { User, ImagePost };
    let data = {};

    fs.readdirSync(__dirname)
        .filter(x => x.includes('-data'))
        .forEach(file => {
            let dataModule = require(path.join(__dirname, file))(models);

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};