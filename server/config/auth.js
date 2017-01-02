module.exports = function (encryption) {
    return {
        isAuthenticated: (req, res, next) => {
            const token = req.headers.authorization;
            const user = encryption.deciferToken(token);
            if (user.username) {
                next();
            } else {
                res.status(401).json({
                    succes: false,
                    message: 'Please log in '
                });
            }
        }

    };
};