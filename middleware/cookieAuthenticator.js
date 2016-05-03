'use strict';

const debug = require('debug')('team4:middleware:cookieAuthenticator');
const salt = require('config').get("hash").cookieSalt;

const hash = require('../lib/hash.js');

module.exports = () => {
    return (req, res, next) => {
        debug('check cookie');
<<<<<<< HEAD
=======
        if (req.commonData) {
            req.commonData.user = {};
        } else {
            req.commonData = {user: {}};
        }
        if (res.commonData) {
            res.commonData.user = {};
        } else {
            res.commonData = {user: {}};
        }
>>>>>>> 6798274dc80ee943779fbaefb6e1e8d6be407cad
        var userId = req.cookies.id;
        if (userId) {
            var isLoggedIn = hash.validate(userId, salt);
            var userName = userId.split('.')[0];
            if (isLoggedIn) {
                req.commonData.user = userName;
            }
        }
        next();
    };
};
