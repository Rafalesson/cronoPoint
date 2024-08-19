const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || '123';
const db = require('./DB.cjs');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Sem token, não autorizado

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Token inválido, proibido
        req.user = user;
        next();
    });
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user?.cargo !== role) {
            return res.sendStatus(403); // Sem permissão, proibido
        }
        next();
    };
}

module.exports = { authenticateToken, authorizeRole };
