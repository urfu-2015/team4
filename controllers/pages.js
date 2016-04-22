'use strict';

const debug = require('debug')('team4:controllers:pages');
const questsModel = require('../models/quests');
const randInt = require('../lib/random').randInt;
// const userModel = require('../models/users');

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
    const quests = questsModel(req.db);
    let questNum = req.body.hasOwnProperty('skip') ? req.body.skip : 0;
    quests.getLimitQuests(questNum, 10).then(chosenQuests => {
        chosenQuests = chosenQuests.forEach(filterFields(['url', 'title', 'photo']));
        if (questNum === 0) {
            res.render('index/index',
                {commonData: req.commonData, quests: chosenQuests});
        } else {
            res.json({quests: chosenQuests});
        }
    });
};

exports.userPage = (req, res) => {
    debug('userPage');
    // const users = userModel(req.db);
    if (req.commonData.user === req.params.name) {
        res.render('userPage/userPage', {});
    } else {
        res.message('no access').sendStatus(403);
    }
};

exports.auto = (req, res) => {
    debug('auto');
    res.render('authorization/authorization');
};

exports.reg = (req, res) => {
    debug('reg');
    res.render('registration/registration');
};

exports.error404 = (req, res) => {
    debug('error404');
    res.status(404).render('notFound/notFound');
};
