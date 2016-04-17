'use strict';

const debug = require('debug')('team4:controllers:pages');
const questsModel = require('../models/quests.js');

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

function randInt(range) {
    return Math.floor(Math.random() * range);
}

function getRandomPhoto(quest) {
    return quest.places[randInt(quest.places.length)].photo;
}

exports.index = (req, res) => {
    debug('index');
    const quests = questsModel(req.db);
    let questNum = req.cookies.questNum;
    res.cookie('questNum', questNum + 10 , {maxAge: 1000000});
    let choosenQuests = quests.getLimitQuests(questNum, 10);
    choosenQuests = choosenQuests.forEach(filterFields(['url', 'title', 'photo']));
    res.render('authorization/authorization', {commonData: req.commonData, quests: choosenQuests});
};

exports.reg = (req, res) => {
    debug('reg');
    res.render('registration/registration', {});
};

exports.error404 = (req, res) => {
    debug('error404');
    res.status(404).render('notFound/notFound', {});
};
