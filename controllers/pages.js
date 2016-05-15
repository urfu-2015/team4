'use strict';

const debug = require('debug')('team4:controllers:pages');

const questsModel = require('../models/quests');
const userModel = require('../models/users');
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
    return quest.places[randInt(quest.places.length)].img;
}

exports.index = (req, res) => {
    debug('index');
    const quests = questsModel(req.db);
    let questNum = req.body.hasOwnProperty('skip') ? parseInt(req.body.skip, 10) : 0;
    let questLimit = req.body.hasOwnProperty('get') ? parseInt(req.body.get, 10) : 3;
    quests.getLimitQuests(questNum, questLimit).then(chosenQuests => {
        chosenQuests = chosenQuests.map(filterFields(['url', 'photo', 'title']));
        if (questNum === 0) {
            res.renderLayout('./pages/index/index.hbs',
                {quests: chosenQuests});
        } else {
            res.status(200).json({quests: chosenQuests});
        }
    });
};

exports.userPage = (req, res) => {
    debug('userPage');
    let users = userModel(req.db);
    var response = {
        username: req.params.name
    };
    users.isUserExist(req.params.name)
        .then(users => {
            if (users > 0) {
                return req.params.name;
            }
            res.renderLayout('./pages/notFound/notFound.hbs');
            throw new Error('это как return, только следующий then не будет работать');
        })
        .then(users.getFinishedQuests)
        .then(finished => {
            finished = finished.map(filterFields(['url', 'title']));
            if (finished.length !== 0) {
                Object.assign(response, {finished: finished});
            }
            return req.params.name;
        })
        .then(users.getQuestsInProgress)
        .then(inProcess => {
            inProcess = inProcess.map(filterFields(['url', 'title']));
            if (inProcess.length !== 0) {
                Object.assign(response, {inProcess: inProcess});
            }
            if (req.params.name === response.commonData.user) {
                Object.assign(response, {self: true});
            }
            console.log(response);
            res.renderLayout('./pages/userPage/userPage.hbs', response);
        });
};

exports.auth = (req, res) => {
    debug('auth');
    res.renderLayout('./pages/authorization/authorization.hbs');
};

exports.createQuest = (req, res) => {
    debug('createQuest');
    res.renderLayout('./pages/createQuest/createQuest.hbs');
};

exports.reg = (req, res) => {
    debug('reg');
    res.renderLayout('./pages/registration/registration.hbs');
};

exports.error404 = (req, res) => {
    debug('error404');
    res.status(404).renderLayout('./pages/notFound/notFound.hbs');
};
