'use strict';

const pages = require('./controllers/pages');
const users = require('./controllers/users');
const quests = require('./controllers/quests');
const upload = require('./controllers/upload');

module.exports = function (app) {
    app.get('/', pages.index);
    app.get('/get-more-quests', pages.index);
    app.post('/user/login', users.validate, users.login);
    app.post('/user/reg', users.validate, users.register);
    app.post('/user/logout', users.logout);
    app.get('/user/:name', pages.userPage);
    app.get('/auth', pages.auth);
    app.get('/reg', pages.reg);
    app.get('/get-more-quests', pages.index);
    app.get('/quest/:name', quests.quest);
    app.post('/like-quest/:name', quests.likeQuest);
    app.post('/place-comment/:quest/:place', quests.addCommentToPlace);
    app.post('/quest-comment/:name', quests.addCommentToQuest);
    app.get('/create-quest', pages.createQuest);
    app.post('/upload', upload.array, upload.cb);
    app.all('*', pages.error404);

    app.use((err, req, res) => {
        console.error(err);
        res.sendStatus(500);
    });
};
