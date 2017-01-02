'use strict';

module.exports = function ({ data, encryption }) {
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
        updateSettings(req, res) {
            if (req.body === null || typeof (req.body) === 'undefined') {
                res.status(401).json({ success: false, message: 'request body is empty' });
                return;
            }

            const token = req.headers.authorization;
            if (!token) {
                res.status(203).json({
                    success: false,
                    message: 'Please provide token'
                });
            }

            let user = encryption.deciferToken(token);
            let userId = user._id;
            let salt = user.salt;
            let newPassword = req.body.newPassword;
            let passHash = encryption.generateHashedPassword(salt, newPassword);
            let fullname = req.body.firstName + ' ' + req.body.lastName;

            let settings = {
                passHash,
                fullname
            };

            data.updateSettings(userId, settings)
                .then(() => {
                    res.status(201).json({
                        success: true,
                        message: 'Settings updated!'
                    });
                }).catch(() => {
                    res.status(203).json({
                        success: false,
                        message: 'An error occured while updating!'
                    });
                });

        }
    };
};