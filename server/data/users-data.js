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
        },
        updateSettings(id, settings) {
            return new Promise((resolve, reject) => {
                this.getUserById(id)
                    .then(user => {
                        user.passHash = settings.passHash || user.passHash;
                        user.name = settings.name || user.name;

                        user.save();
                        resolve({ 'message': 'Settings updated succefully!' });
                    });
            });
        },
        addUserPost(username, post) {
            return new Promise((resolve, reject) => {
                this.getByUsername(username)
                    .then((user) => {
                        user.imagePosts.push(post);
                        user.save();

                        return resolve(user);
                    }, (error) => {
                        return reject(error);
                    });
            });
        },
        updateAvatar(id, filename) {
            return new Promise((resolve, reject) => {
                this.getUserById(id)
                    .then(user => {
                        user.avatar = filename || user.avatar;

                        user.save();
                        resolve({ 'message': 'Settings updated succefully!' });
                    });
            });

        },
        subscribe(subscribedId, subscriberId) {
            return new Promise((resolve, reject) => {
                Promise.all([this.getUserById(subscribedId), this.getUserById(subscriberId)])
                    .then(([subscribed, subscriber]) => {
                        subscribed.subscribers.push({ id: subscriber._id, username: subscriber.username });
                        subscriber.subscribed.push({ id: subscribed._id, username: subscribed.username });

                        subscribed.save();
                        subscriber.save();

                        resolve({ 'message': 'Subscribed!' });

                    });

            })
        }
    };
};