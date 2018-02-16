import * as config from '../../config.json';

const log = function(msg, params){

    if(!config.log) return;

    const color = params!==undefined&&params.color!==undefined?params.color:config.color;
    const background = params!==undefined&&params.background!==undefined?params.background:config.background;

    console.log(`'%c ${msg}`, `color: ${color};background-color: ${background}`);

}

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

export {log, isMobile}