'use strict';

const router = require('express').Router();

module.exports = function ({  app, controllers }) {
    const usersController = controllers.users;

    router
        .get('/image-posts', usersController.getImagePosts)
        .get('/user/:id', usersController.getUserById)
        .put('user/:id',usersController.updateSettings);

    app.use('/api/users', router);
};