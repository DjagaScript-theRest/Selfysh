'use strict';

const router = require('express').Router();

module.exports = function ({  app, controllers, auth }) {
    const usersController = controllers.users;

    router
        .post('/:username/image-posts', auth.isAuthenticated, usersController.addPost)
        .get('/image-posts', usersController.getImagePosts) // TODO: Check
        .get('/user/:id', usersController.getUserById)
        .put('/user/:id', usersController.updateSettings);

    app.use('/api/users', router);
};