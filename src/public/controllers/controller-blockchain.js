import { setInterval, setTimeout } from "timers";

import * as config from '../../../config.json';

let prev = {hash:0, number:0};

const CONTRACT_ADDRESS = 

"0x589c9f7cc79570f335d26ddf268af29015fcfc12";

const CONTRACT_ABI = 

[{"constant":true,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"getOwnerOfBlock","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWelcome","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"getTypeOfBlock","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"buyGoldBlock","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"sellBlock","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"buyNebulaBlock","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getTotoalAmountOfBlocks","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

let CONTRACT;

/*
!NO INTERVALS OR TIMEOUTS IN HERE!
*/

export default class Blockchain {

    connect(){

        if (typeof web3 !== 'undefined') {

            web3 = new Web3(web3.currentProvider);

            CONTRACT = web3.eth.contract(CONTRACT_ABI).at(CONTRACT_ADDRESS);

            //console.log(CONTRACT)

        } else {

            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

    }


/*
 Block
*/

    getBlock(blockNumber = "latest" , cb){

        web3.eth.getBlock(blockNumber, (error, res) => {

            const block = res;

            //console.log(block)

            let _block = {

                number: block.number,
                hash: block.hash,
                timestamp: block.timestamp,  
            
                nonce: block.nonce,
                size: block.size,
                transactions: block.transactions
            
            }

            //console.log(_block)

            const data = {
                from: web3.eth.coinbase,
                to: CONTRACT_ADDRESS
            };

            CONTRACT.getOwnerOfBlock(block.number, data, (err, res) => {

                _block.ownersAddress = res;

                //Define the init state (TODO: Can't this happen somewhere else?!)
                switch(_block.ownersAddress)
                 {
                    case web3.eth.coinbase:
                        _block.state = 'owned'
                    break;

                    case "0x0000000000000000000000000000000000000000":
                        _block.state = 'available'
                    break;

                    default:
                        _block.state = 'sold'
                    break;
                    
                 } 

                //console.log(_block)

                cb(_block);

            }); 

         }) 


    }

    buyGoldBlock(blockNumber, cb){

        console.log('buy blockNumber:'+blockNumber)

        const data = {
            from: web3.eth.coinbase,
            to: CONTRACT_ADDRESS,
            value: web3.toWei(config.priceFixed,'ether'),
            gasPrice: web3.toWei(0.00000001,'ether')
        };

        CONTRACT.buyGoldBlock.sendTransaction(blockNumber, data, (err, res) => {

        console.log('transactionHash:'+res)

            const transactionHash = res;
            
            let filter = web3.eth.filter("latest");

            filter.watch((error, result) => {

                console.log('filter watching:'+result)

                web3.eth.getTransactionReceipt(transactionHash, (err, res) => {

                    console.log('getTransactionReceipt:'+res)

                    if(res){

                        console.log('transcation mined')
                        filter.stopWatching();
                        cb();
                        
                    }else{
                        console.log('transcation pending')
                    }

                });

            });
        });
    }

    buyNebulaBlock(blockNumber, cb){

        console.log('buy blockNumber:'+blockNumber)

        const data = {
            from: web3.eth.coinbase,
            to: CONTRACT_ADDRESS,
            value: web3.toWei(config.priceFixed,'ether'),
            gasPrice: web3.toWei(0.00000001,'ether')
        };

        CONTRACT.buyNebulaBlock.sendTransaction(blockNumber, data, (err, res) => {

        console.log('transactionHash:'+res)

            const transactionHash = res;
            
            let filter = web3.eth.filter("latest");

            filter.watch((error, result) => {

                console.log('filter watching:'+result)

                web3.eth.getTransactionReceipt(transactionHash, (err, res) => {

                    console.log('getTransactionReceipt:'+res)

                    if(res){

                        console.log('transcation mined')
                        filter.stopWatching();
                        cb();
                        
                    }else{
                        console.log('transcation pending')
                    }

                });

            });
        });
    }

    sellBlock(blockNumber, cb){

        const data = {
            from: web3.eth.coinbase,
            to: CONTRACT_ADDRESS,
            gasPrice: web3.toWei(0.00000001,'ether')
        };

        CONTRACT.sellBlock(blockNumber.toString(), data, (err, res) => {

            const transactionHash = res;
            
            let filter = web3.eth.filter("latest");
            filter.watch((error, result) => {

                web3.eth.getTransactionReceipt(transactionHash, (err, res) => {

                    if(res){

                        filter.stopWatching();
                        cb();
                        
                    }else{
                        
                    }

                });

            });

        });

    }


/*
 Account
*/

    getCoinbase(cb){

        web3.eth.getBalance(web3.eth.coinbase, (error, result) => {

            cb({
                coinbase: web3.eth.coinbase,
                balance: new Number(web3.fromWei(result.toNumber(), "ether" )).toFixed(config.priceToFixed)
            });

        });
        
    }


/*
 Contract
*/
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