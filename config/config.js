(function(){
    'use strict';

    const commandLineArgs = require('command-line-args');
    const AWS = require('aws-sdk');
    const optionDefinitions = [
        { name: 'awsUserId', alias: 'u', type: String },
        { name: 'awsRegion', alias: 'r', type: String },
        { name: 'awsQueueName', alias: 'q', type: String },
        { name: 'apiKey', alias: 'k', type: String }
    ];
    const options = commandLineArgs(optionDefinitions);

    let settings = {};

    settings.apiKey = options.apiKey;

    if (!settings.username && process.env.MAKER_SAMSUNG_REMOTE_API_KEY){
        settings.username = process.env.MAKER_SAMSUNG_REMOTE_API_KEY; 
    }

    if (!settings.awsUserId && process.env.AWS_USER_ID){
        settings.awsUserId = process.env.AWS_USER_ID; 
    }

    if (!settings.awsRegion && process.env.AWS_REGION){
        settings.awsRegion = process.env.AWS_REGION; 
    }

    if (!settings.awsQueueName && process.env.AWS_MAKER_SQS_QUEUE_NAME){
        settings.awsQueueName = process.env.AWS_MAKER_SQS_QUEUE_NAME; 
    }

    let awsConfig = new AWS.Config();
    awsConfig.update({region: settings.awsRegion});
    

    exports.apiSettings = {
        apiKey: settings.apiKey,
        awsUserId: settings.awsUserId,
        awsRegion: settings.awsRegion,
        awsQueueName: settings.awsQueueName
    };

})();