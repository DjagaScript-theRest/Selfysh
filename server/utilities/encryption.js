const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
    generateSalt: () =>
        crypto.randomBytes(128).toString('base64'),
    generateHashedPassword: (salt, pwd) => crypto.createHmac('sha256', salt).update(pwd).digest('hex'),
    deciferToken: (token) => {

        let decoded = jwt.decode(token.split(' ')[1], 'sheit');
        const userInfo = decoded._doc;
        console.log(userInfo);
        let user = {
            username: userInfo.username,
            avatar: userInfo.avatar,
            imagePosts: userInfo.imagePosts,
            subscribers: userInfo.subscribers,
            subscribed: userInfo.subscribed,
            salt: userInfo.salt,
            cover: userInfo.cover,
            fullname: userInfo.name,
            id: userInfo._id
        };

        return user;

    }
};