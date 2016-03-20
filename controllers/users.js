'use strict';

const validator = require('validator');
const usersModel = require('../models/users.js');
const hash = require('../lib/hash.js');
const salt = require('config').get("hash").cookieSalt;

module.exports.logout = (req, res) => {
    res.clearCookie('id');
    res.status(200).send('Successfully logged out');
};

module.exports.register = (req, res) => {
    const users = usersModel(req.db);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    users.addUser({name, email, password}).then(
        () => {
            res.status(200).send('Registration was successfull');
        },
        error => {
            res.status(error.code).send(error.message);
        }
    );
};

module.exports.login = (req, res) => {
    const users = usersModel(req.db);
    const email = req.body.email;
    const password = req.body.password;
    users.login({email, password}).then(
        result => {
            const userId = hash.create(result.name, salt);
            res.cookie('id', userId, {maxAge: 1000000});
            res.status(200).send('Successfully logged in');
        },
        error => {
            res.status(error.code).send(error.message);
        }
    );
};

module.exports.validateName = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({message: 'Name is required', status: 'Error'});
        return;
    }
    req.body.name = req.body.name.trim();
    if (
        !req.body.name.match(/^[А-яA-z\-0-9]{2,30}$/) ||
        !req.body.name.match(/[А-яA-z]+/)
    ) {
        res.status(400).send({message: 'Name is not valid', status: 'Error'});
        return;
    }
    next();
};

module.exports.validateEmail = (req, res, next) => {
    if (!req.body.email) {
        res.status(400).send({message: 'Email is required', status: 'Error'});
        return;
    }
    req.body.email = req.body.email.trim();
    if (!validator.isEmail(req.body.email)) {
        res.status(400).send({message: 'Email is not valid', status: 'Error'});
        return;
    }
    next();
};

module.exports.validatePassword = (req, res, next) => {
    if (!req.body.password) {
        res.status(400).send({message: 'Password is required', status: 'Error'});
        return;
    }
    if (req.body.password.length > 30) {
        res.status(400).send({message: 'Password is not valid', status: 'Error'});
        return;
    }
    next();
};
