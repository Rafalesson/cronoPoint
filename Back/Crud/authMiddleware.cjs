const jwt = require('jsonwebtoken');
const SECRET_KEY = '123';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};

const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.cargo)) {
            return res.sendStatus(403);
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRole
};
