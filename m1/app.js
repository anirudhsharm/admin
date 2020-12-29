const express = require('express');
const HttpStatus = require('http-status-codes');
global.path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const tunnel = require('tunnel-ssh');
global._ = require('lodash');
global.moment = require('moment');
global.expressFileupload = require('express-fileupload');
global.async = require('async');
global.fs = require('fs');
global.validator = require('validator');
global.urljoin = require('url-join');
require('dotenv').config()
// Security Encryption 
global.bcrypt = require('bcryptjs');

// Common Functions file
global.FUNC = require(process.cwd() + '/functions/functions.js');

global.vrules = require('./validation_rules.js').rules;
global.mongoose = require('mongoose');
global.request = require('request');
global.ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;

var config = {
    agent : 'ubuntu',
    host: '13.233.80.177',
    privateKey:fs.readFileSync('./mlc-live.pem'),
    port:22,
    dstPort:27010,
    keepAlive: true
};
    
var server = tunnel(config, function (error, server) {
    if(error){
        console.log("SSH connection error: " + error);
    }
    
    mongoose.connect('mongodb://127.0.0.1:27017/mlc');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error:'));
    db.once('open', function() {
        console.log("DB connection successful");
    });
});

//const promise = mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useFindAndModify : true, useCreateIndex : true, useUnifiedTopology: true});

const { SubAdminRole } = require('./models/SubAdminRole');

const index = require('./routes/index');
const pages = require('./routes/pages');
const user = require('./routes/user');
const category = require('./routes/category');
const community = require('./routes/community');
const businesstype = require('./routes/businessType');
const feed = require('./routes/feed');
const broadcast = require('./routes/broadcast');
const report = require('./routes/report');
const baseRate = require('./routes/baseRate');
const utils = require('./routes/utils');
const upperlimit = require('./routes/upperLimitRequest');
const subadmin = require('./routes/subadmin');
const paymentRequest = require('./routes/paymentRequest');
const wallet = require('./routes/wallet');
const menu = require('./routes/menu');
const subAdminRole = require('./routes/subAdminRole');
const dataset = require('./routes/dataset');
const subscriptionPackage = require('./routes/subscriptionPackage');
const visitingLog = require('./routes/visitingLog');
const customer = require('./routes/customer');
const offer = require('./routes/offer');
const log = require('./routes/log');

const app = express();
const engine = require('ejs-mate');
// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser(process.env.SITE_TITLE));
global.admin_url = process.env.WEBSITE_URL;
global.session = require('express-session');
const MongoStore = require('connect-mongo')(session);
global.cookieParser = require('cookie-parser');
global.flash = require('connect-flash');
global.c = console;

app.use(session({
    cookie: {
        maxAge: 60000000
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(flash());

app.use(async function(req, res, next) {
    const current_url = req.originalUrl;
    const url_actions = current_url.split("/");
    const currentUser = req.session.user || {};
    res.locals.admin_url = admin_url;
    res.locals.laundry_url = process.env.LAUNDRY_WEBSITE_URL;
    res.locals.site_title = process.env.SITE_TITLE;
    res.locals.error_flash = req.flash('error')[0];
    res.locals.success_flash = req.flash('success')[0];
    res.locals.controller = url_actions[1];
    res.locals.action = (typeof url_actions[2] !== "undefined") ? url_actions[2] : '';
    res.locals.urlParams = (typeof url_actions[3] !== "undefined") ? url_actions[3] : '';
    res.locals.currentUser = currentUser;
    res.locals.currentYear = moment().format('YYYY');
    let accessibleManagers = [];
    let accessibleControllers = [];
    let isSubAdmin = false;
    let isSuperAdmin = false;
    if (currentUser.is_super_admin === false) {
        isSubAdmin = (currentUser.role === 'admin') ? true : false; 
        accessibleManagers = await SubAdminRole.find({
            _id: currentUser.subAdminRole,
            isDeleted: false
        }).populate({
            path: 'menu',
            select: 'slug -_id'
        });
        accessibleManagers = accessibleManagers[0].menu.map(menu => {
            const slugArr = menu.slug.split('/');
            if(menu.slug === '/users/verification-request') {
                accessibleControllers.push('verification-request');
            }
            else if(menu.slug === '/feed/flagged') {
                accessibleControllers.push('flagged-feed');
            }
            else{
                accessibleControllers.push(slugArr[1]);
            }
            return menu.slug;
        });
        accessibleControllers = accessibleControllers.filter((controller, index) => accessibleControllers.indexOf(controller) === index);
    }
    else {
        isSubAdmin = false;
        isSuperAdmin = true;
    }
    issuperadmin = isSuperAdmin;
    res.locals.isSubAdmin = isSubAdmin;
    res.locals.isSuperAdmin = isSuperAdmin;
    res.locals.accessibleManagers = accessibleManagers;
    res.locals.accessibleControllers = accessibleControllers;
    switch (req.headers['language']) {
        case 'en':
            global.DM = require('./locale/en/message').Messages;
            break;
        default:
            global.DM = require('./locale/en/message').Messages;
            break;
    }
    return next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressFileupload());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/pages/', pages);
app.use('/users/', user);
app.use('/categories/', category);
app.use('/community/', community);
app.use('/business/', businesstype);
app.use('/feed/', feed);
app.use('/broadcast/', broadcast);
app.use('/utils/', utils);
app.use('/report/', report);
app.use('/upperlimit/', upperlimit);
app.use('/base-rate/', baseRate);
app.use('/subadmin/', subadmin);
app.use('/payment/', paymentRequest);
app.use('/wallet/', wallet);
app.use('/menu/', menu);
app.use('/subadmin-role/', subAdminRole);
app.use('/dataset/', dataset);
app.use('/subscription-package/', subscriptionPackage);
app.use('/visiting-log/', visitingLog);
app.use('/customer/', customer);
app.use('/offer/', offer);
app.use('/log/', log);

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log("app.js err ", err)
        if (req.headers.os != undefined) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                reply: err.message
            });
        } else {
            res.render('errors/404', { title: 'Props2' });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log("app err", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        reply: err.message
    });
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;