(function (){
    'use strict';

    const sqsClient = require('./apis/sqs/client.js');
    
    sqsClient.watchForCommand();
    
})();