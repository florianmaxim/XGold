import * as config from '../../config.json';

const log = function(msg, params){

    if(!config.log) return;

    const color = params!==undefined&&params.color!==undefined?params.color:config.color;
    const background = params!==undefined&&params.background!==undefined?params.background:config.background;

    console.log(`'%c ${msg}`, `color: ${color};background-color: ${background}`);

}

export {log}