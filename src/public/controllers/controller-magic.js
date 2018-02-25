import * as config from '../../../config.json';

export default class Magic {

    constructor(){

    }

    calculatePrice(block){
        if(config.priceFixed){
            return config.priceFixed.toFixed(config.priceToFixed);
        }else{
            return ((new Number((block.size/block.transactions.length)/block.transactions.length))/10).toFixed(config.priceToFixed)
        }
    }

}