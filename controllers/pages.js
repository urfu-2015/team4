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
    return quest.places[randInt(quest.places.length)].photo;
}

exports.index = (req, res) => {
    debug('index');
    const quests = questsModel(req.db);
    let questNum = req.body.hasOwnProperty('skip') ? req.body.skip : 0;
    quests.getLimitQuests(questNum, 10).then(chosenQuests => {
        chosenQuests = chosenQuests.forEach(filterFields(['url', 'title', 'photo']));
        if (questNum === 0) {
            chosenQuests = [
                {title:'Harold 1', photo:'http://i.imgur.com/LbDUJDk.jpg',url:'/'},
                {title:'Harold 2', photo:'http://www.netlore.ru/upload/files/68338/large_p19d7nh1hm1i37tnuim11ebqo5c1.jpg',url:'/'},
                {title:'Harold 3', photo:'http://i.imgur.com/WE8DG5F.jpg',url:'/'},
                {title:'Harold 4', photo:'http://cs631327.vk.me/v631327103/19a66/VNzIvlvv2Ss.jpg',url:'/'},
                {title:'Harold 5', photo:'http://ci.memecdn.com/108/5904108.jpg',url:'/'}
            ];
            res.renderLayout('./pages/index/index.hbs',
                {quests: chosenQuests});
        } else {
            res.json({quests: chosenQuests});
        }
    });
};

exports.userPage = (req, res) => {
    debug('userPage');
    let users = userModel(req.db);
    users.isNameExist(req.params.name)
        .then(() => { // no such name
            res.renderLayout('./pages/userPage/userPage.hbs', {error: 'no such user'})
        })
        .catch(() => { //name exists
            res.renderLayout('./pages/userPage/userPage.hbs', {username: req.params.name});
        })
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
