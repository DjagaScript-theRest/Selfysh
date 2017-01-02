'use strict';

const router = require('express').Router();

module.exports = function ({  app, controllers, auth }) {
    const usersController = controllers.users;

    router
        .get('/image-posts', usersController.getImagePosts) // TODO: Check
        .post('/:username/image-posts', auth.isAuthenticated, usersController.addPost)
        .get('/user/:id', usersController.getUserById);

    app.use('/api/users', router);
};