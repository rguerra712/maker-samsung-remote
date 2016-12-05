(function () {
    'use strict';
    
    let exports = module.exports = {};

    const AWS = require('aws-sdk');
    const config = require('../../config/config.js');
    const crypto = require("crypto-js");

    function getSignatureKey(Crypto, key, dateStamp, regionName, serviceName) {
        let awsRegion = config.apiSettings.awsRegion;
        
        var kDate = Crypto.HmacSHA256(dateStamp, "AWS4" + key);
        var kRegion = Crypto.HmacSHA256(awsRegion, kDate);
        var kService = Crypto.HmacSHA256(serviceName, awsRegion);
        var kSigning = Crypto.HmacSHA256("aws4_request", kService);
        return kSigning;
    }

    function getQueueUrl(){
        let awsUserId = config.apiSettings.awsUserId;
        let awsRegion = config.apiSettings.awsRegion;
        let awsQueueName = config.apiSettings.awsQueueName;
        return `https://sqs.${awsRegion}.amazonaws.com/${awsUserId}/${awsQueueName}`;
    }

    exports.watchForCommand = () => {
        var sqs = new AWS.SQS({apiVersion: '2012-11-05', params: {QueueUrl: getQueueUrl()}}); // using url to queue
        sqs.receiveMessage(function(err,data){
        if(err) {
            console.log('error:',"Fail Send Message" + err);
            context.done('error', "ERROR Put SQS");  // ERROR with message
        } else {
            console.log('data:',data.MessageId);
            context.done(null,'');  // SUCCESS 
        }
    });
    };
})();