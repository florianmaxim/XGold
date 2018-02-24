import { setInterval, setTimeout } from "timers";

import * as config from '../../../config.json';

let prev = {hash:0, number:0};

export default class Blockchain {

    connect(){

        if (typeof web3 !== 'undefined') {

            web3 = new Web3(web3.currentProvider);

        } else {

            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

    }

    getCoinbase(cb){

        web3.eth.getBalance(web3.eth.coinbase, (balance) => {

            const account = {
                coinbase: web3.eth.coinbase,
                balance: web3.fromWei(balance)
            }

            cb(account);
        });
        
    }


    getBalance(cb){

        web3.eth.getBalance(web3.eth.coinbase, (balance) => {
            cb(web3.fromWei(balance));
        });

    }

    getBlock(cb){

        web3.eth.getBlock('latest', (error, block) => {

            if(prev.hash!==block.hash&&prev.number!==block.number){

                cb(block);

                prev = block;

            }else{
                console.log('OLD')
            }

        })

    }
    
}