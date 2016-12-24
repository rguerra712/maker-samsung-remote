(function () {
    'use strict';
    
    let exports = module.exports = {};

    const SamsungRemote = require('samsung-remote');
    
    function getRemote(ipAddr){
        return new SamsungRemote({
                ip: ipAddr // required: IP address of your Samsung Smart TV 
        });
    }

    exports.findRespondingIp = ip => {
        return new Promise((resolve, reject) => {
            let remote = getRemote(ip);
            remote.isAlive(err => {
                if (err) {
                    reject(ip);
                } else {
                    resolve(ip);
                }
            });
        });
    };

    exports.runCommand = (ip, command) => {
        return new Promise((resolve, reject) => {
            var remote = getRemote(ip);
            let cmd = getCommandDetails(command);
            if (cmd) {
                let count = cmd.numberOfTimes;
                if (!count) {
                    count = 1;
                }
                let sendCommand = () => remote.send(cmd.command, err => {
                    if (err) {
                        reject(`command failed for ${ip}: ${err}`);
                    } else {
                        resolve(`Command ${cmd.command} sent to ${ip}`); 
                    }
                });
                for (var i = 0; i < count; i++) {
                   sendCommand(); 
                }
            } else {
                reject(`could not find a command response for ${command}`);
            }
        });
    };

    let getCommandDetails = command => {
        switch (command.toLowerCase()){
            case "off":
                return {
                    command: "KEY_POWEROFF",
                };
            case "mute":
                return {
                    command: "KEY_MUTE",
                };
            case "volumeup":
                return {
                    command: "KEY_VOLUP",
                    numberOfTimes: 10
                };
            case "volumedown":
                return {
                    command: "KEY_VOLDOWN",
                    numberOfTimes: 10
                };
            case "guide":
                return {
                    command: "KEY_GUIDE",
                };
            case "tvinput":
                return {
                    command: "KEY_TV",
                };
            case "enter":
                return {
                    command: "KEY_PANNEL_ENTER",
                };
            default:
                throw new Error(`unhandled case ${command}`);
        }
    };

})();