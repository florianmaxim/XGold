export default class Magic {

    constructor(){

    }

    calculatePrice(block){
        return ((block.size/block.transactions.length)/block.transactions.length).toFixed(2)*.1
    }

}