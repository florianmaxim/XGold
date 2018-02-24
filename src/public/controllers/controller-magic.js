export default class Magic {

    constructor(){

    }

    calculatePrice(block){
        return ((new Number((block.size/block.transactions.length)/block.transactions.length))/10).toFixed(3)
    }

}