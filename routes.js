'use strict';

const users = require('./controllers/users');
const pages = require('./controllers/pages');

module.exports = function (app) {
    app.post('/user/login', users.validate, users.login);
    app.post('/user/reg', users.validate, users.register);
    app.post('/user/logout', users.logout);
    app.post('/getmorequests', pages.index);
    app.get('/user/:name', pages.userPage);
    app.get('/', pages.index);
    app.get('/auto', pages.auto);
    app.get('/reg', pages.reg);
    app.all('*', pages.error404);

    app.use((err, req, res) => {
        console.error(err);
        res.sendStatus(500);
    });
};
