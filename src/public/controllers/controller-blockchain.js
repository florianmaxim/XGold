import { setInterval, setTimeout } from "timers";

import * as config from '../../../config.json';

let prev = {hash:0, number:0};

const CONTRACT_ADDRESS = 

"0xdaadc29edb10a2d8b66cac5dd539e47f855913a1";

const CONTRACT_ABI = 

[{"constant":true,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"getOwnerOfBlock","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWelcome","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAmountOfBlocks","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"buyBlock","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"sellBlock","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"isSenderOwnerOfBlock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"amount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"welcome","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"isBlockForSale","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
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

    buyBlock(blockNumber, cb){

        const data = {
            from: web3.eth.coinbase,
            to: CONTRACT_ADDRESS,
            value: web3.toWei(config.priceFixed,'ether'),
            gasPrice: web3.toWei(0.00000001,'ether')
        };

        CONTRACT.buyBlock.sendTransaction(blockNumber, data, (err, res) => {

            const transactionHash = res;

            console.log(`transactionHash: ${transactionHash}`);

            let sec = 0;

            let stop = 0;

            var myInterval = setInterval(function(){

                web3.eth.getTransactionReceipt(transactionHash, (err, res) => {

                    if(res){

                        //Send back the new owners address (which is the coinbase)
                        cb(web3.eth.coinbase);

                        console.log('Mined!')
                        console.log(clearInterval(myInterval));
                    }else{
                        sec++;
                        console.log(sec+'s');
                    }

                });

            },1000);

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


/*
 Account
*/

    getCoinbase(cb){

        web3.eth.getBalance(web3.eth.coinbase, (error, result) => {

            cb({
                coinbase: web3.eth.coinbase,
                balance: new Number(web3.fromWei(result.toNumber(), "ether" )).toFixed(3)
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