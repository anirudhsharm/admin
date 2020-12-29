const bcrypt = require('bcryptjs'),
    Reseller = require('./SendinBlue/Reseller/Reseller');


module.exports.hashPassword = function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
};

module.exports.createSendinBlueSubAccount = async function (req, res, next) {
    let user = req.body;
    user.numberOfEmail = (typeof user.numberOfEmail !== 'undefined') ? parseInt(user.numberOfEmail) : 100;
    console.log("createSendinBlueSubAccount = ", user);
    generateSendinBluePass(user.emailID, user.password, async (err, pass) => {
        console.log("generateSendinBluePass");
        if (err) {
            req.flash('error', 'Sendinblue:: Unable to create sendinblue sub-account account.');
            res.redirect(`/customer`);
        } else {
            try {
                const data = await Reseller.Create(user.emailID, user.name.split(" ")[0], user.name.split(" ")[1] || "", user.companyName, pass);
                console.log("DATA", data);
                req.body.sendinBlue = {
                    pass: pass,
                    authKey: data.authKey
                };

                Reseller.Update(data.authKey, user.emailID, user.name.split(" ")[0], user.name.split(" ")[1] || "", user.companyName, pass)
                    .then(() => {
                        console.info("Child updated after creation");
                    }, (err) => {
                        console.error("Updating Child creation failed: ", err);
                    });

                try {
                    await Reseller.AssociateIpToChild(data.authKey,'77.32.175.31');
                    await Reseller.AddEmailCredits(data.authKey, user.numberOfEmail);
                    await Reseller.EnableMarketingAutomation(data.authKey);
                    next();
                } catch (e) {
                    console.error("Failed to add on-boarding credits or enable marketing automation: ", e);
                    console.info("deleting account");
                    try {
                        await Reseller.Delete(data.authKey);
                        req.flash('error', 'Sendinblue:: Failed to add on-boarding credits or enable marketing automation.');
                        res.redirect(`/customer`);
                    } catch (e) {
                        console.error("Failed to delete sub-account from sendinBlue: ", e);
                        console.info(`Manual deletion will be required from sendinBlue of ${user.emailID}`);
                        req.flash('error', 'Sendinblue:: Failed to delete sub-account from sendinBlue.');
                        res.redirect(`/customer`);
                    }
                }

            } catch (e) {
                console.error(e);
                req.flash('error', 'Sendinblue:: Unable to create sendinblue sub-account account.');
                res.redirect(`/customer`);
            }
        }
    });
};

module.exports.deleteSendInBlueAccount = async function (authKey, callback) {
    try {
        await Reseller.Delete(authKey);
        callback(1);
    } catch (e) {
        console.error("Failed to delete sub-account from sendinBlue: ", e);
        callback(2);
    }
};

function generateSendinBluePass(email, password, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.error("generateSendinBluePass(genSalt): ", err);
            callback(err, null)
        } else {
            bcrypt.hash(email + "||" + password + "||" + Date.now(), salt, (err, hash) => {
                if (err) {
                    console.error("generateSendinBluePass(hash): ", err);
                    callback(err, null);
                } else {
                    callback(null, hash);
                }
            })
        }
    })
}