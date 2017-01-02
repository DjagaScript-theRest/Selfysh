'use strict';

module.exports = function ({ data }) {
    return {
        getImagePosts(req, res) {
            let username = req.body.username;
            if (!username) {
                username = '';
            }

            data.getImagePostsByUsername(username)
                .then((posts) => {
                    res.status(200).json(posts);
                }, (error) => {
                    res.status(404).json(error);
                });
        },
        getUserById(req, res) {
            let id = req.params.id;
            data.getUserById(id)
                .then(result => res.status(200).json(result));
        },
        addPost(req, res) {
            let username = req.params.username;
            let post = req.body;

            data.addUserPost(username, post)
                .then((post) => res.status(201).json(post));
        }
    };
};