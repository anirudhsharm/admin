require('dotenv').config();
const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_KEY;
let partnerKey= defaultClient.authentications['partner-key'];
partnerKey.apiKey=process.env.SIB_KEY;
SendinBlue = SibApiV3Sdk;

const apiInstance = new SendinBlue.ResellerApi();
const axios = require('axios');

Reseller =  class Reseller {
    static Create(email, firstName, lastName, companyName, password) {
        let opts = {
            'resellerChild': new SendinBlue.CreateChild(email, firstName, lastName, companyName, password)
        };
        return  apiInstance.createResellerChild(opts);
    }

    static AddEmailCredits(authkey, emailCredits = 100) {
        let addCredits = new SendinBlue.AddCredits();
        addCredits.email = emailCredits;
        return apiInstance.addCredits(authkey, addCredits);

    }

    static Update(childAuthKey, email, firstName, lastName, companyName, password) {

        console.log("RESELLER API INSTANCE IN UPDATE-CHILD WRAPPER: ", JSON.stringify(apiInstance));
        let resellerChild = new SendinBlue.UpdateChild();
        resellerChild.email = email;
        resellerChild.firstName = firstName;
        resellerChild.lastName = lastName;
        resellerChild.companyName = companyName;
        resellerChild.password = password;
        console.info("Reseller Child", resellerChild);

        return apiInstance.updateResellerChild(childAuthKey, resellerChild);
    }

    static AssociateIpToChild(authKey, dedicatedIp = '77.32.175.31') {
        let ip = new SendinBlue.ManageIp();
        ip.ip = dedicatedIp;
        return apiInstance.associateIpToChild(authKey, ip);
    }

    static CreateChildDomain(authKey, domain) {
        console.log("RESELLER API INSTANCE IN CREATE-CHILD-DOMAIN WRAPPER: ", JSON.stringify(apiInstance));
        /*let addChildDomain= new SendinBlue.AddChildDomain();
        addChildDomain.domain=domain;*/
        //return Reseller.ResellerApiInstance.createChildDomain(authKey,addChildDomain);
        return axios({
            method: 'POST',
            url: `https://api.sendinblue.com/v3/reseller/children/${authKey}/domains`,
            data: JSON.stringify({
                domain: domain
            }),
            responseType: 'json',
            headers: {
                'Content-Type':'application/json',
                'api-key': process.env.SIB_KEY
            }
        });
    }

    static GetChildDomains(childAuthKey){
        return axios({
            method:'GET',
            url:`https://api.sendinblue.com/v3/reseller/children/${childAuthKey}/domains`,
            responseType:'json',
            headers:{
                'Content-Type': 'application/json',
                'api-key':process.env.SIB_KEY
            }
        })
    }

    static EnableMarketingAutomation(authKey, callback) {
        let updateChildAccountStatus = new SendinBlue.UpdateChildAccountStatus();
        updateChildAccountStatus.marketingAutomation = true;
        if (!callback) {
            return apiInstance.updateChildAccountStatus(authKey, updateChildAccountStatus);
        }
        callback();
    }

    static Delete(authKey) {
        return apiInstance.deleteResellerChild(authKey)
    }
}


module.exports = Reseller;