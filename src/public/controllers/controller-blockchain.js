import { setInterval, setTimeout } from "timers";

import * as config from '../../../config.json';

let prev = {hash:0, number:0};

const CONTRACT_ADDRESS = config.contractAddress;
const CONTRACT_ABI = config.contractABI;

let CONTRACT;

export default class Blockchain {

    connect(){

        if (typeof web3 !== 'undefined') {

            web3 = new Web3(web3.currentProvider);

            CONTRACT = web3.eth.contract(CONTRACT_ABI).at(CONTRACT_ADDRESS);



        } else {

            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

    }


    getOwnerOfBlock(blockNumber, cb){

        const data = {
            from: web3.eth.coinbase,
            to: CONTRACT_ADDRESS
        };

        CONTRACT.getOwnerOfBlock(blockNumber, data, (err, res)=>{

            //console.log(blockNumber+'-'+(res));

            cb(res)
        });

    }

    buyBlock(blockNumber, cb){

        const data = {
            from: web3.eth.coinbase,
            to: CONTRACT_ADDRESS,
            value: web3.toWei(0.001,'ether'),
        };

        CONTRACT.buyBlock.sendTransaction(blockNumber, data, (err, res) =>{
            cb(res);
        });
    }

    sellBlock(blockNumber, cb){

        const data = {
            from: web3.eth.coinbase,
            to: CONTRACT_ADDRESS
        };

        CONTRACT.sellBlock(blockNumber, data, (err, res)=>{

            //console.log(blockNumber+'-'+(res));

            cb(res)
        });

    }

    getCoinbase(cb){

        web3.eth.getBalance(web3.eth.coinbase, (error, result) => {

            cb({
                coinbase: web3.eth.coinbase,
                balance: new Number(web3.fromWei(result.toNumber(), "ether" )).toFixed(3)
            });

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
                //console.log('OLD')
            }

        })

    }

    getSingleBlock(blockNumber, cb){

        web3.eth.getBlock(blockNumber, (error, block) => {

            cb(block);

        })

    }


    getContractWelcome(cb){
        CONTRACT.getWelcome((err, msg)=>{
            cb(msg)
        });
    }
    
    getContractBalance(cb){

        web3.eth.getBalance(config.contractAddress, (err, res) => {

            let balance = new Number(web3.fromWei(res.toNumber(), "ether" )).toFixed(3)

            cb(balance);

        })

    }

    getContractAmountOfBlocks(cb){

        CONTRACT.getAmountOfBlocks((err, res)=>{

            cb(res.toNumber());

        });
    }

 
}