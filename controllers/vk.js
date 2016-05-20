'use strict';

const debug = require('debug')('team4:controllers:vk');

const request = require('request-promise');

const usersModel = require('../models/users.js');


module.exports.auth = (req, res, next) => {
    debug('auth');
    if (req.query.code) {

        let userInfo = {};
        let users = usersModel(req.db);

        request({
            uri: uriAccessToken(req.commonData.isDev, req.query.code),
            transform: JSON.parse
        })
            .then(body => {
                debug('auth 1');
                console.log(body);
                Object.assign(userInfo, body);
                request({
                    uri: uriUserInfo(body.user_id, userInfo.access_token),
                    transform: JSON.parse
                })
                .then(body => {
                    debug('auth 2');
                    console.log(body);
                    Object.assign(userInfo, {name:body.response[0].domain});
                    return userInfo;})
                .then(users.login_vk)
                .then((result) => {
                    debug('auth 3');
                    console.log(result);
                    req.userId = result.domain;
                    next();
                })
                .catch((err) => {
                    debug('auth 4', err);
                    res.renderLayout('./pages/notFound/notFound.hbs');
                })
            })
    } else {
        debug('auth 5');
        res.renderLayout('./pages/notFound/notFound.hbs');
    }
};


function uriUserInfo(user_id, access_token) {
    return 'https://api.vk.com/method/users.get' +
        '?fields=domain&user_id=' + user_id + '&v=5.52&access_token=' + access_token
}

function uriAccessToken(isDev, code) {
    let redirect_uri = 'http://' + (isDev ?
            'localhost:3000' : 'dream-team-4.herokuapp.com') + '/auth-vk';
    return 'https://oauth.vk.com/access_token?client_id=5471140&client_secret=ydvR6wzaC6IHyMMJYawU&' +
        'redirect_uri=' + redirect_uri + '&code=' + code;
}

