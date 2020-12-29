
export default (authKey)=>{
    let SibApiV3Sdk= require('sib-api-v3-sdk');
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = authKey;

    let partnerKey= defaultClient.authentications['partner-key'];
    partnerKey.apiKey=authKey;

    return SibApiV3Sdk;
};
