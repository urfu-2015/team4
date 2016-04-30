'use strict';

const debug = require('debug')('team4:controllers:quests');

const questsModel = require('../models/quests.js');

exports.addQuest = (req, res) => {
    debug('add quest');
    questsModel.createQuest(req.body.quest).then(
        () => {
            res.status(200).send('Place added successfully');
        },
        error => {
            res.status(400).send(error.message);
        }
    );
};

exports.quest = (req, res) => {
    debug('get quest');
    let questName = req.params.name;
    let user ='testUser';// req.commonData.user;
    req.commonData.user = user;
    let commonData = {commonData: req.commonData};
    let data = {
        title: 'test',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis aliquam hendrerit. Curabitur vehicula, nunc sed sodales cursus, felis ligula placerat sem, id tincidunt risus urna vitae eros. Nullam tristique id lorem in condimentum. Vestibulum dictum velit quis dolor tincidunt rutrum. Sed et fringilla eros. Fusce non auctor leo. Nullam tristique facilisis tellus, non congue ante sodales ut. Duis efficitur mauris porttitor pharetra tincidunt. Aliquam laoreet id diam eget viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam luctus blandit interdum. Phasellus quis auctor lorem.',
        likes: 10, //num
        liked: false, //boolean
        inProgress: false, //boolean
        finished: false, //boolean
        comments: [{
        author: 'author',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis aliquam hendrerit. Curabitur vehicula, nunc sed sodales cursus, felis ligula placerat sem, id tincidunt risus urna vitae eros. Nullam tristique id lorem in condimentum. Vestibulum dictum velit quis dolor tincidunt rutrum. Sed et fringilla eros. Fusce non auctor leo. Nullam tristique facilisis tellus, non congue ante sodales ut. Duis efficitur mauris porttitor pharetra tincidunt. Aliquam laoreet id diam eget viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam luctus blandit interdum.'
    }],
        places:[{
            title: 'placeTest',
            photo: 'http://img1.gtsstatic.com/v%E9hicule/phot-8_1623_w620.jpg',
            checkIn: false, //boolean
            likes: 10 , //num
            liked: false, //boolean
            comments:[{
                author: 'author',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis aliquam hendrerit. Curabitur vehicula, nunc sed sodales cursus, felis ligula placerat sem, id tincidunt risus urna vitae eros. Nullam tristique id lorem in condimentum. Vestibulum dictum velit quis dolor tincidunt rutrum. Sed et fringilla eros. Fusce non auctor leo. Nullam tristique facilisis tellus, non congue ante sodales ut. Duis efficitur mauris porttitor pharetra tincidunt. Aliquam laoreet id diam eget viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam luctus blandit interdum.'
            }], //в том же формате , что выше
        }]

    };
    if (user) {
        //data = getInfo(req.commonData.user, req.params.name)
    } else {
        //data = questsModel.getQuest(questName);
    }
    res.status(200).renderLayout('./pages/quest/quest.hbs', Object.assign(data, commonData));
};
