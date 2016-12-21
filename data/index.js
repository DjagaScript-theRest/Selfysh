'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function () {
    let User = require('./../models/user-model');

    let models = { User };
    let data = {};

    fs.readdirSync(__dirname)
        .filter((file) => file.indexOf('-data') > 0)
        .forEach((file) => {
            let dataModule = require(path.join(__dirname, file))(models);

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        })

    return data;
};