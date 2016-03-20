const users = require('./controllers/users.js');
const pages = require('./controllers/pages');

module.exports = function (app) {
    app.post(
        '/user/login',
        users.validateEmail,
        users.validatePassword,
        users.login
    );
    app.post(
        '/user/reg',
        users.validateName,
        users.validateEmail,
        users.validatePassword,
        users.register
    );
    app.post('/user/logout', users.logout);
    app.get('/', pages.index);
    app.get('/reg', pages.reg);
    app.all('*', pages.error404);

    app.use((err, req, res) => {
        console.error(err);
        res.sendStatus(500);
    });
};
