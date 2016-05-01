'use strict';

const debug = require('debug')('team4:controllers:quests');

const questsModel = require('../models/quests.js');

exports.addQuest = (req, res) => {
    debug('add quest');
    let model = questsModel(req.db);
    model.createQuest(req.body.quest).then(
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
    // let questName = req.params.name;
    let user = req.commonData.user;
    let commonData = {commonData: req.commonData};
    // let model = questsModel(req.db);
    let data = {
        title: 'test',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        ' Nunc lobortis aliquam hendrerit. Curabitur vehicula, nunc sed sodales cursus,' +
        ' felis ligula placerat sem, id tincidunt risus urna vitae eros.' +
        ' Nullam tristique id lorem in condimentum. Vestibulum dictum velit' +
        ' quis dolor tincidunt rutrum. Sed et fringilla eros. Fusce non auctor leo.' +
        ' Nullam tristique facilisis tellus, non congue ante sodales ut.' +
        ' Duis efficitur mauris porttitor pharetra tincidunt.' +
        ' Aliquam laoreet id diam eget viverra.' +
        'Pellentesque habitant morbi tristique senectus' +
        ' et netus et malesuada fames ac turpis egestas. Etiam luctus blandit interdum.' +
        ' Phasellus quis auctor lorem.',
        likes: 10, // num
        liked: false, // boolean
        inProgress: false, // boolean
        finished: false, // boolean
        comments: [{
            author: 'author',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
            ' Nunc lobortis aliquam hendrerit. Curabitur vehicula,' +
            ' nunc sed sodales cursus, felis ligula placerat sem,' +
            ' id tincidunt risus urna vitae eros.' +
            ' Nullam tristique id lorem in condimentum.' +
            ' Vestibulum dictum velit quis dolor tincidunt rutrum.' +
            ' Sed et fringilla eros. Fusce non auctor leo.' +
            ' Nullam tristique facilisis tellus, non congue ante sodales ut.'
        }],
        places: [{
            title: 'placeTest',
            photo: 'http://img1.gtsstatic.com/v%E9hicule/phot-8_1623_w620.jpg',
            checkIn: false, // boolean
            comments: [{
                author: 'authorPlace',
                text: 'Lorem ipsum dolor sit amet,' +
                ' consectetur adipiscing elit.' +
                ' Nunc lobortis aliquam hendrerit.' +
                ' Curabitur vehicula, nunc sed sodales' +
                ' cursus, felis ligula placerat sem, id tincidunt risus urna vitae eros.' +
                ' Nullam tristique id lorem in condimentum.' +
                ' Vestibulum dictum velit quis dolor tincidunt rutrum.' +
                ' Sed et fringilla eros. Fusce non auctor leo.' +
                ' Nullam tristique facilisis tellus, non congue ante sodales ut.' +
                ' Duis efficitur mauris porttitor pharetra tincidunt.' +
                ' Aliquam laoreet id diam eget viverra.' +
                ' Pellentesque habitant morbi tristique senectus et netus ' +
                'et malesuada fames ac turpis egestas. Etiam luctus blandit interdum.'
            }]
        }]
    };
    if (user) {
        // data = getInfo(req.commonData.user, req.params.name)
    } else {
        // data = questsModel.getQuest(questName);
    }
    res.status(200).renderLayout('./pages/quest/quest.hbs', Object.assign(data, commonData));
};

exports.likeQuest = (req, res) => {
    let questName = req.params.name;
    debug(`like quest ${questName}`);
    let model = questsModel(req.db);
    let user = req.commonData.user;
    if (!user) {
        res.status(401);
        return;
    }
    model
        .likeQuest(questName, user)
        .then(count => {
            res.status(200).send({count});
        });
};

exports.addCommentToPlace = (req, res) => {
    let questName = req.params.quest;
    let placeName = req.params.place;
    debug(`add comment to ${questName} ${placeName}`);
    let author = req.commonData.user;
    let text = req.body.text;
    let model = questsModel(req.db);
    if (!author) {
        res.status(401);
        return;
    }
    let comment = {author, text};
    model
        .addCommentToPlace(questName, placeName, comment)
        .then(() => res.status(200));
};

exports.addCommentToQuest = (req, res) => {
    let questName = req.params.name;
    debug(`add comment to ${questName}`);
    let author = req.commonData.user;
    let text = req.body.text;
    let model = questsModel(req.db);
    if (!author) {
        res.status(401);
        return;
    }
    let comment = {author, text};
    model
        .addCommentToQuest(questName, comment)
        .then(() => res.status(200));
};
