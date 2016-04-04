'use strict';

const hash = require('../lib/hash.js');
const salt = require('config').get("hash").cookieSalt;

module.exports = () => {
    return (req, res, next) => {
        if (req.commonData) {
            req.commonData.user = {};
        } else {
            req.commonData = {user: {}};
        }
        const userId = req.cookies.id;
        if (userId) {
            const isLoggedIn = hash.validate(userId, salt);
            const userName = userId.split('.')[0];
            if (isLoggedIn) {
                req.commonData.user.name = userName;
            }
        }
        next();
    };
};
