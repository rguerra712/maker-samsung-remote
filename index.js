(function (){
    'use strict';

    const webtask = require('maker-webtask');
    const finder = require('local-device-finder');
    const samsungClient = require('./apis/samsung-client.js');
    const settings = require('./config/settings.js');
    
    function logMessage(msg){
        console.log(msg);
    }

    let scanForIpAndRunCommand = message => {
        let runCommand = ip => samsungClient
            .runCommand(ip, message.command)
            .then(logMessage)
            .catch(logMessage);
        let checkCorrectIpAndRunCommand = ip =>
            samsungClient.findRespondingIp(ip)
                .then(runCommand)
                .catch(ip => {
                    logMessage(`no tv for ${ip}`);
                });
        finder.scan(checkCorrectIpAndRunCommand, settings.samsungSettings.ipRange);
    };
    
    webtask.run('tv', 5)
        .then(scanForIpAndRunCommand)
        .catch(logMessage);
})();