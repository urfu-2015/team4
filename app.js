var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongo = require('./middleware/mongoConnect');
var app = express();

const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const cookieAuthenticator = require('./middleware/cookieAuthenticator');

// view engine setup
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongo());
app.use(cookieParser());
app.use(cookieAuthenticator());

require('./routes')(app);

hbs.registerPartials(path.join(__dirname, 'blocks'));

module.exports = app;
