require('dotenv').config();
const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_KEY;

let partnerKey= defaultClient.authentications['partner-key'];
partnerKey.apiKey=process.env.SIB_KEY;
module.exports.SibApiV3Sdk = SibApiV3Sdk;
