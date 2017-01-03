'use strict';

module.exports = function ({ data, encryption, upload }) {
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

            let userId = user.id;
            let salt = user.salt;

            let newPassword = req.body.newPassword.toString();
            let passHash = encryption.generateHashedPassword(salt, newPassword);
            let name = req.body.firstName + ' ' + req.body.lastName;

            let settings = {
                passHash,
                name
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

        },
        updateAvatar(req, res) {
            console.log(req.file);
            upload(req, res, function (err) {
                if (err) {
                    res.json({ error_code: 1, err_desc: err });
                    return;
                }
                console.log(req.file);
                let filename = req.file.filename;
                data.updateAvatar(req.params.id, filename)
                    .then(() => {
                        res.status(200)
                            .json({
                                success: true,
                                message: 'Avatar updated'
                            });
                    })
                    .catch(() => {
                        res.status(203).json({
                            success: false,
                            message: 'An error occured while updating!'
                        });

                    });
            });

        },

        addPost(req, res) {
            let username = req.params.username;
            let post = req.body;

            data.addUserPost(username, post)
                .then((post) => res.status(201).json(post));
        }
    };
};