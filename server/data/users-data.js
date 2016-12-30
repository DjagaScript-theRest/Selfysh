/* globals module, require */
'use strict';

module.exports = (models) => {
    const { User } = models;

    return {
        filterUsers(filter, page, perPage) {
            filter = filter || {};
            page = page || 0;
            perPage = perPage || 0;
            return new Promise((resolve, reject) => {
                User.find(filter)
                    .skip(page * perPage)
                    .limit(perPage)
                    .exec((err, users) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(users);
                    });
            });
        },
        getUserById(userId) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: userId }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username: username }, (err, user) => {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getByEmail(email) {
            return new Promise((resolve, reject) => {
                User.findOne({ email }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        createUser(username, passHash, email, salt) {
            let user = new User({
                username: username,
                passHash: passHash,
                email: email,
                salt: salt,
                roles: ['regular']
            });

            return new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getImagePostsByUsername(username) {
            return new Promise((resolve, reject) => {
                this.filterUsers({ username })
                    .then((users) => {
                        let user = users[0];
                        resolve(user.imagePosts);
                    }, (error) => {
                        reject(error);
                    });
            });
        }
    };
};