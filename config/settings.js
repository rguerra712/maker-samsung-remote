(function(){
    'use strict';

    let settings = {};

    if (process.env.SAMSUNG_IP_RANGE){
        settings.samsungIpRange = process.env.SAMSUNG_IP_RANGE; 
    } else {
        settings.samsungIpRange = "1-254";
    }
    exports.samsungSettings = {
        ipRange: settings.samsungIpRange
    };
})();