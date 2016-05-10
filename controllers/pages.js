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
    let questNum = req.body.hasOwnProperty('skip') ? req.body.skip : 0;
    quests.getLimitQuests(questNum, 10).then(chosenQuests => {
        chosenQuests = chosenQuests.map(filterFields(['url', 'title', 'photo']));
        if (questNum === 0) {
            res.renderLayout('./pages/index/index.hbs',
                {quests: chosenQuests, commonData: req.commonData});
        } else {
            res.json({quests: chosenQuests});
        }
    });
};

exports.userPage = (req, res) => {
    debug('userPage');
    let users = userModel(req.db);
    users.isUserExist(req.params.name)
        .then(() => { // no such name
            var chosenQuests = [
                {title:'Harold 1', photo:'http://i.imgur.com/LbDUJDk.jpg',url:'/'},
                {title:'Harold 2', photo:'http://www.netlore.ru/upload/files/68338/large_p19d7nh1hm1i37tnuim11ebqo5c1.jpg',url:'/'},
                {title:'Harold 3', photo:'http://i.imgur.com/WE8DG5F.jpg',url:'/'},
                {title:'Harold 4', photo:'http://cs631327.vk.me/v631327103/19a66/VNzIvlvv2Ss.jpg',url:'/'},
                {title:'Harold 5', photo:'http://ci.memecdn.com/108/5904108.jpg',url:'/'}
            ];

            res.renderLayout('./pages/userPage/userPage.hbs', 
                {
                    username: req.params.name,
                    commonData: req.commonData,
                    finished: chosenQuests
                });
        })
        .catch(() => { //name exists
            res.renderLayout('./pages/userPage/userPage.hbs',
                {error: 'no such user', commonData: req.commonData})
        })
};


exports.auth = (req, res) => {
    debug('auth');
    res.renderLayout('./pages/authorization/authorization.hbs', {commonData: req.commonData});
};

exports.createQuest = (req, res) => {
    debug('createQuest');
    res.renderLayout('./pages/createQuest/createQuest.hbs', {commonData: req.commonData});
};

exports.reg = (req, res) => {
    debug('reg');
    res.renderLayout('./pages/registration/registration.hbs', {commonData: req.commonData});
};

exports.error404 = (req, res) => {
    debug('error404');
    res.status(404).renderLayout('./pages/notFound/notFound.hbs', {commonData: req.commonData});
};
