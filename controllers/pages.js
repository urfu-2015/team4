'use strict';

const debug = require('debug')('team4:controllers:pages');

const questsModel = require('../models/quests');
const randInt = require('../lib/random').randInt;

function filterFields(fields) {
    return obj => {
        let resObj = {};
        fields.forEach(field => {
            if (field === 'photo') {
                resObj[field] = getRandomPhoto(obj);
            } else if (obj.hasOwnProperty(field)) {
                resObj[field] = obj[field];
            }
        });
        return resObj;
    };
}

function getRandomPhoto(quest) {
    return quest.places[randInt(quest.places.length)].photo;
}

exports.index = (req, res) => {
    debug('index');
    let chosenQuests = [
        {url: 'url1', photo:'photo1', title:'title1'},
        {url: 'url1', photo:'photo1', title:'title1'},
        {url: 'url1', photo:'photo1', title:'title1'},
        {url: 'url1', photo:'photo1', title:'title1'},
        {url: 'url1', photo:'photo1', title:'title1'},
        {url: 'url1', photo:'photo1', title:'title1'}
    ];
    console.log(chosenQuests);
    res.renderLayout('./pages/index/index.hbs', {quests: chosenQuests});
    const quests = questsModel(req.db);
    let questNum = req.body.hasOwnProperty('skip') ? req.body.skip : 0;
    quests.getLimitQuests(questNum, 10).then(chosenQuests => {
        chosenQuests = chosenQuests.forEach(filterFields(['url', 'title', 'photo']));
        if (questNum === 0) {
            res.renderLayout('./pages/index/index.hbs', {quests: chosenQuests});
        } else {
            res.json({quests: chosenQuests});
        }
    });
};

exports.userPage = (req, res) => {
    debug('userPage');
    if (req.commonData.user === req.params.name) {
        res.render('userPage/userPage', {});
    } else {
        res.message('no access').sendStatus(403);
    }
};

exports.auth = (req, res) => {
    debug('auth');
    res.renderLayout('./pages/authorization/authorization.hbs');
};

exports.reg = (req, res) => {
    debug('reg');
    res.renderLayout('./pages/registration/registration.hbs');
};

exports.error404 = (req, res) => {
    debug('error404');
    res.status(404).renderLayout('./pages/notFound/notFound.hbs');
};
