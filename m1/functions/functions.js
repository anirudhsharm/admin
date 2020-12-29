// Import Models
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
const EmailTemplate = require('email-templates');
const { Notification } = require('../models/Notification.js');
const { SubAdminRole } = require('../models/SubAdminRole');
const { Log } = require('../models/Log.js');
const AWS = require('aws-sdk');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION,
    apiVersion: '2006-03-01',
    signatureVersion: 'v4',
    ACL: 'public-read'
});
const s3 = new AWS.S3();
module.exports = {
    validate: function (rulesObj) {
        return function (req, res, next) {
            // Validating Input 
            var validation = new Validator(req.body, rulesObj);
            if (validation.fails()) {
                //Validating fails 
                var errorObj = validation.errors.all();
                return res.status(HttpStatus.BAD_REQUEST).send({
                    error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
                    reply: errorObj[Object.keys(errorObj)[0]][0]
                });
            } else {
                return next();
            }
        }
    },
    getSignedUrl: function (type, params) {
        return new Promise((resolve, reject) => {
            s3.getSignedUrl(type, params, (err, data) => {
                if (err) console.log("err=========>", err);

                const returnData = {
                    signedRequest: data,
                    url: `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`
                };
                console.log("params=====>", params);
                console.log("data==============>", data);
                return resolve(returnData);
            });
        });
    },
    fileUpload: function (fileName, file) {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: process.env.USER_IMG_BUCKET,
                Key: fileName,
                ContentType: file.mimetype,
                Body: file.data,
                ACL: 'public-read'
            };

            s3.upload(params, (err, response) => {
                console.log("response------------", err, response);
                return resolve({ name: fileName })
            });
        });
    },
    multipleFileUpload: function (file) {
        // console.log("inside multipleFileUpload ====>",file);
        return new Promise((resolve, reject) => {
            var params = {
                Bucket: process.env.USER_IMG_BUCKET,
                Key: file.name,
                ContentType: file.mimetype,
                Body: file.data,
                ACL: 'public-read'
            };

            s3.upload(params, (err, response) => {
                console.log("response", response);
                return resolve({ name: file.name })
            });
        });
    },
    deleteObject: function (file) {
        return new Promise((resolve, reject) => {

            var params = {
                Bucket: process.env.USER_IMG_BUCKET,
                Key: file,
            };

            s3.deleteObject(params, (err, data) => {
                if (err) console.log("err=========>", err);
                return resolve(data);
            });
        });
    },
    validateExpress: function (rulesObj) {
        return function (req, res, next) {
            // Validating Input 
            console.log(req.body)
            var validation = new Validator(req.body, rulesObj);
            if (validation.fails()) {
                //Validating fails 
                var errorObj = validation.errors.all();

                req.flash("error", errorObj[Object.keys(errorObj)[0]][0])
                return res.redirect('back');
            } else {
                return next();
            }
        }
    },
    randomString: function (len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        if (process.env.serverenv == "development") {
            randomString = "12345678";
        }
        return randomString;
    },
    otpString: function () {
        if (process.env.serverenv == "development" || process.env.serverenv == "uat") {
            return "1234";
        } else {
            return Math.floor(Math.random() * 900000) + 100000;
        }
    },
    Auth: async function (req, res, next) {
        const publicAccess = [
            '/login',
            '/forgot_password',
            '/privacy',
            '/terms',
            '/activation',
            '/password_reset'
        ];
        const restrictedAccess = [
            '/',
            '/profile',
            '/change_password',
            '/logout',
            '/utils/countries',
        ];
        const superAdminCanAccessExcept = [
            'wallet/add',
            'wallet/link-stripe',
            'wallet/payout-request'
        ];
        const route = req.originalUrl.indexOf('?') !== -1 ? req.originalUrl.slice(0, req.originalUrl.indexOf('?')) : req.originalUrl;
        const routeArr = route.split('/');
        const controller = routeArr[1];
        const action = routeArr[2];
        const cbpSuperAccess = [
            ...restrictedAccess,
            '/users/cbp',
            '/users/list/cbp',
            '/users/add/cbp',
            'users/view',
            'users/edit',
            'users/update-status',
            'users/delete',
            '/upperlimit',
            'upperlimit/upperlimitajax',
            'upperlimit/updateCbpAdminStatus',
            'upperlimit/edit',
            '/deactive',
            '/feed',
            '/feed/feedajax',
            '/feed/rateFeed',
            'feed/view',
            'feed/remove',
            '/upperlimit',
            'upperlimit/upperlimitajax',
            'upperlimit/add',
            '/deactive',
            '/payment/cm-ack',
            '/payment/cso-ack',
            '/payment/cmAckAjax',
            '/payment/csoAckAjax',
            '/payment/send_ack_receipt_mail',
            '/wallet',
            '/wallet/transaction-list',
            '/wallet/add'
        ];
        const cbpAccess = [
            ...restrictedAccess,
            '/feed',
            '/feed/feedajax',
            '/feed/rateFeed',
            'feed/view',
            'feed/remove',
            '/upperlimit',
            'upperlimit/upperlimitajax',
            'upperlimit/add',
            '/deactive',
            '/payment/cm-ack',
            '/payment/cso-ack',
            '/payment/cmAckAjax',
            '/payment/csoAckAjax',
            '/payment/send_ack_receipt_mail',
            '/wallet',
            '/wallet/transaction-list',
            '/wallet/add'
        ];
        const csoAccess = [
            ...restrictedAccess,
            '/users/cso',
            '/users/list/cso',
            '/users/add/cso',
            'users/view',
            'users/edit',
            'users/update-status',
            'users/delete',
            '/wallet',
            '/wallet/transaction-list',
            '/wallet/link-stripe',
            '/wallet/payout-request',
            '/payment/cbp-ack',
            '/payment/cbpAckAjax',
            '/payment/cm-ackn',
            '/payment/cmAcknAjax',
            '/payment/send_ack_receipt_mail',
        ];
        const subcsoAccess = [
            ...restrictedAccess,
            '/deactive',
            '/payment/cbp-ack',
            '/payment/cbpAckAjax',
            '/payment/cm-ackn',
            '/payment/cmAcknAjax',
            '/payment/send_ack_receipt_mail',
        ];

        const subAdminCanAccessExcept = [
            'wallet/add',
            'wallet/link-stripe',
            'wallet/payout-request'
        ];

        const subCBPAccess = [
            ...restrictedAccess,
            '/feed',
            '/feed/feedajax',
            '/feed/rateFeed',
            'feed/view',
            
        ];

        if (publicAccess.indexOf(req.url) !== -1) {
            if (req.session.user) {
                return res.redirect('/');
            }
            return next();
        } else if (req.session.user) {
            if (req.session.user.role === "admin") {
                if (req.session.user.is_super_admin && superAdminCanAccessExcept.indexOf(route) === -1) {
                    return next();
                } else {
                    let accessibleManagers = await SubAdminRole.find({
                        _id: req.session.user.subAdminRole,
                        isDeleted: false
                    }).populate({
                        path: 'menu',
                        select: 'slug -_id'
                    });
                    let accessibleControllers = [];
                    let accessibleController = '';
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
                    if(route === '/users/verification-request') {
                        accessibleController = 'verification-request';
                    }
                    else if(route === '/feed/flagged') {
                        accessibleController = 'flagged-feed';
                    }
                    else{
                        const routeArr = route.split('/');
                        accessibleController = routeArr[1];
                    }
                    if (subAdminCanAccessExcept.indexOf(route) === -1 && (accessibleManagers.indexOf(route) !== -1 || accessibleControllers.indexOf(accessibleController) !== -1 || restrictedAccess.indexOf(route) !== -1)) {
                        return next();
                    }
                    return res.render('errors/404', { title: 'Props2' });
                }
            }
            else {
                return res.redirect("/login");
            }
        } else {
            return res.redirect("/login");
        }
    },
    apiAuth: function (req, res, next) {
        var login_token = req.headers.authorization;
        if (login_token == undefined || login_token == "") {
            return res.status(HttpStatus.BAD_REQUEST).send({
                error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
                reply: DM.tokenBlank
            });
        }
        // var userId = FUNC.decodeJWTToken(login_token);
        // console.log("user_id", userId)
        User.findOne({
            // _id: userId,
            loginToken: login_token
        }).exec(function (err, user) {
            if (err) {
                return res.status(HttpStatus.BAD_REQUEST).send({
                    error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
                    reply: DM.tokenBlank
                });
            } else {
                if (!user) {
                    return res.status(HttpStatus.UNAUTHORIZED).send({
                        error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
                        reply: DM.TokenResetOrExp
                    });
                } else {
                    c.log("user.verification", user.verification);
                    switch (user.verification) {
                        case 0:
                        case 2:
                        case 3:
                            return res.status(HttpStatus.UNAUTHORIZED).send({
                                error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
                                reply: DM.Unauthrized
                            });
                            break;
                        default:
                            req.userData = user;
                            User.findOneAndUpdate({
                                loginToken: login_token
                            }, {
                                    $set: {
                                        lastActivity: moment().format(),
                                    }
                                }, { new: true })
                                .exec(function (err, user) {
                                    c.log("NEW USER DATA------->>", user);
                                });
                            return next();
                            break;
                    }

                    // if (user.verification != 1) {
                    //     return res.status(HttpStatus.BAD_REQUEST).send({
                    //         error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
                    //         reply: DM.tokenBlank
                    //     });
                    // } else {
                    //     req.userData = user;
                    //     return next();
                    // }
                }
            }
        });
    },
    sendMail: async function (to, emailData, folder) {
        const email = new EmailTemplate({
            views: {
                root: "templates",
                options: {
                    extension: 'ejs'
                }
            }
        });
        emailData.email_logo = process.env.WEBSITE_URL + 'images/props2-logo.png';
        emailData.site_title = process.env.SITE_TITLE;
        emailData.site_url = process.env.WEBSITE_URL;
        var subject = await email.render(folder + '/subject', emailData);
        var mail = await email.render(folder + '/html', emailData);

        const msg = {
            to: to,
            from: process.env.FROMEMAIL,
            subject: subject,
            //text: results.text,
            html: mail
        };
        try {
            sgMail.send(msg, (err, success) => {
                if (err) {
                    console.log("err", err)
                }
            });
        } catch (err) {
            console.log("err", err)
        }
        return true;
        //return callback(null); 
    },
    sendEmailAckReceipt: async function (data, callback) {
        let to = data.email;
        let emailData = {
            "message": `Your Payment has been release ${data.amount}`
        }
        FUNC.sendMail(to, emailData, 'ack_receipt');
        callback(null)
    },
    forgotPasswordMail: async function (data, callback) {
        let to = data.email;
        let emailData = {
            "message": `<p>On your request we have created a reset password link. Please click the below link and follow the instructions to reset your password :</p>
            <a href="${data.verification_link}">Click here to reset your password</a>`
        }
        FUNC.sendMail(to, emailData, 'admin_forgot_password');
        callback(null)
    },
    ChangePasswordMail: async function (data, callback) {
        let to = data.email;
        let emailData = {
            "message": `<p>This email is to notify you that your password for the Props2 account ${data.fullName} has been changed.</p>`,
            "name": data.fullName
        }
        FUNC.sendMail(to, emailData, 'change_password');
        callback(null)
    },
    newAccountDetailsMail: async function (data, callback) {
        let to = data.email;
        let emailData = {
            "message": `<p>we have created a new account for you, account details are given below :</p>
                        <b>Username:</b> <span>${data.emailData.username}</span>
                        <b>Email:</b>  <span>${data.emailData.email}</span>
                        <b>Password:</b> <span>${data.emailData.password}</span>
                        ${(data.emailData.subAdmin !== undefined && data.emailData.subAdmin == true) ? '' : '<p>Please login in app & complete your profile. </p>'}`,
            "name": `${data.emailData.fullName}`
        }
        FUNC.sendMail(to, emailData, 'new_account_create');
        callback(null)
    },
    welcomeMail: async function (data, callback) {
        let to = data.email;
        let emailData = {
            "message": `<p>The App That Gives Back!</p>
                        <p>Hey ${data.fullname}</p>
                        <p>Welcome to Props2! We’re excited for you to start giving Props.</p>
                        <p>Props2 Video</p>
                        <p>Find out how you can give PROPS. Head to our FAQs page if you have any questions. Have concerns or suggestions on how to use Props2 in your city? Contact us, we’re here to help! </p>
                        <a href="mailto:info@props2.com" target="_top">info@props2.com</a>
                        <a href="${process.env.WEBSITE_URL}">www.props2.com</a>`,
            "name": data.fullName
        }
        FUNC.sendMail(to, emailData, 'welcome_mail');
        callback(null)
    },
    accountUpdate: async function (data, callback) {
        let to = data.email;
        let emailData = {
            "message": `<p>Your Account has been ${data.emailData.status === 'true' ? 'Activated Now' : 'Deactivated due to Suspicious Activity'}</p>
                        <p>Please Contact Admin if You Have Any Query</p>`,
            "name": `${data.emailData.fullname}`
        }
        FUNC.sendMail(to, emailData, 'account_update');
        callback(null)
    },
    cashbackReceivedMail: async function (data, callback) {
        console.log("cashbackReceived-------------------->")
        let to = data.email;
        let emailData = {
            "message": `<p>You has been received ${data.emailData.amount} cashback from Props2 Admin</p>
                        <p>Please Contact Admin if You Have Any Query</p>`,
            "name": `${data.emailData.fullname}`
        }
        FUNC.sendMail(to, emailData, 'account_recharge');
        callback(null)
    },
    broadCastEmail: async function (data) {
        let to = data.email;
        let emailData = {
            "message": `${data.description}`,
            "name": `${data.fullname}`
        }
        FUNC.sendMail(to, emailData, 'broadcast_email');
        //callback(null)
    },
    generateJWTToken: function (userId, callback) {
        var jwt = require('./jwtToken.js');
        jwt.generateKey(userId, function (err, token) {
            callback(token);
        });
    },
    decodeJWTToken: function (token, callback) {
        var jwt = require('./jwtToken.js');
        jwt.decodeToken(token, function (err, data) {
            callback(data);
        });
    },
    getExtension: function (file_name, callback) {
        var file_ext = file_name.split('.');
        callback(null, file_ext[1]);
    },

    textTruncate: function (str, length, ending) {
        if (length == null) {
            length = 100;
        }
        if (ending == null) {
            ending = '...';
        }
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } else {
            return str;
        }
    },
    logManage: async function (data, callback) {
        const log = new Log(data);
        await log.save();
        callback(null);
    },
    diifManage: async function (newData, oldData, callback) {
        console.log(newData);
        console.log(oldData);
        let diffObj = {};
        Object.keys(newData).forEach(function(key) {
            if (Array.isArray(newData[key])) {
                if (JSON.stringify(newData[key]) != JSON.stringify(oldData[key])) {
                    diffObj[key] = 'updated';
                }
            }
            else if (newData[key] != oldData[key]) {
                if (key == 'status') {
                    let statusObj = {0 : 'InActive', 1 : 'Active',  false : 'InActive', true : 'Active'};
                    diffObj[key] = statusObj[oldData[key]]+' to '+statusObj[newData[key]];
                }
                else {
                    diffObj[key] = oldData[key]+' to '+newData[key];
                }
            }
        });
        callback(JSON.stringify(diffObj));
    }
};
