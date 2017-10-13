import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import Web3 from 'web3';
import ethers from 'ethers';
import secureRandom from 'secure-random';
//import * as fs from 'fs';
import solc from 'solc';
import Tx from 'ethereumjs-tx';
import _ from 'lodash';
import Buffer from 'buffer';

import { SqliteProvider } from '../sqlite/sqlite';

/*
  Generated class for the Web3serviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Web3service {

  web3:any;

  fileres:any;

  constructor(
    public http: Http,
    public sq:SqliteProvider
  ) {
    console.log('Hello Web3serviceProvider Provider');

    if(typeof Web3 !== 'undefined'){
      //this.web3 = new Web3(Web3.currentProvider);
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://138.197.111.208:7007"));//https://freegeoip.net/json/
    }else{
      //this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8100"));
      this.web3 = new Web3(new Web3.currentProvider);
      
    }
  }

  get(){
    return this.web3;
  }

  makesha(){
    // let sha = this.web3.sha("This is string written in angular+ionic.");
    // return sha;
    var version = this.web3.version.whisper;
    return version; // 20
  }


  msha(){
    return new Promise((resolve,reject)=>{
      try{
        var privatekey = Web3.utils.sha3("Toholampi is the best town on the worlsdd123");
        //var version = Web3.version.api;
        //console.log(privatekey);
        resolve(privatekey);
      }
      catch(Exception){
        //console.error("failed to load");
        reject();
      }
    })
  }

  makeetherwallet(msha){ 
    return new Promise((resolve,reject)=>{
      try{
        var privatekey = Web3.utils.sha3(msha);
        var wallet = new ethers.Wallet(privatekey);
        
        console.info(wallet);
        
        resolve(wallet);
      }
      catch(Exception){
        //console.error("failed to load");
        reject();
      }
    })
  }

  makesecure(){
    var priv_key_arr = secureRandom(10);
    var priv_key_str = '';
    for(var i=0;i<priv_key_arr.length;i++){
     priv_key_str += Math.pow(priv_key_arr[i],2).toString();
    }
    return priv_key_str;
  }


  /*
  main
  */
  makeetherwalletandStoreinDb(msg){
    return new Promise((resolve,reject)=>{
      try{
        var pkey = Web3.utils.sha3(msg);
        console.log(pkey);

        var wallet = new ethers.Wallet(pkey);
        console.info(wallet);

        let address = wallet.address;
        console.info(address);

        let privatekey = wallet.privateKey;
        console.info(privatekey);

        let defaultgas = wallet.defaultGasLimit;
        console.info(defaultgas);

        let provider = wallet.provider;
        console.info(provider);

        let secure = this.makesecure();
        console.log(secure);
        //let a = this.sq.addItem("testFrom");
        let a = this.sq.insertInStoreSecret(msg,address,privatekey,defaultgas,provider,secure)
        // .then(s=>{
        //   console.warn(s);
        // },e=>{
        //   console.error(e);
        // });
        console.log(a);
        
        resolve({status:"done"});
      }
      catch(Exception){
        //console.error("failed to load");
        reject({status:"fail"});
      }
    });
  }
  

  //contract
  /*contractcreatefunction(sol_file, creating_address, priv){
    
        var input = this.readfilefromapp();//fs.readFileSync(sol_file);
        var output = solc.compile(input, 1);
     
        var keys = [];
        let json_temp = [];
        // for (key in output.contracts) {
        //    json_temp.bytecode = output.contracts[key].bytecode
        //    json_temp.interface = output.contracts[key].interface
        //    json_temp.gasEstimates = output.contracts[key].gasEstimates
        //    break;
        // }

        var array = output.contracts;

        array.forEach(element => {
          json_temp.push({
            bytecode: output.contracts[element].bytecode,
            interface: output.contracts[element].interface,
            gasEstimates: output.contracts[element].gasEstimates
          });
        });
       
        // console.log("required data", json_temp.gasEstimates);
    
         const bytecode = json_temp[0].bytecode;
         const abi = JSON.parse(json_temp[0].interface);
         var contract = this.web3.eth.contract(abi);
        // Get contract data
        
        console.log("\n\n", abi, "\n\n");
    
        
         const contractData = contract.new.getData({
         data: '0x' + bytecode
         });
         // console.log("ciont", contractData);
         var gasLimit =this.web3.eth.estimateGas({
            to: creating_address,
            // data: '0x' + bytecode,
            data: contractData,
            // from: wallet.address,
    
        })
        gasLimit = 230000;
        // console.log("bytecode:", bytecode,"\nabi:", abi, "\ncontract:", contract, "\ncontractdata:", contractData) 
        // gasLimit = json_temp.gasEstimates.creation[1];
        const gasPrice = this.web3.eth.gasPrice;
        const gasPriceHex = this.web3.toHex(gasPrice);
        const gasLimitHex = this.web3.toHex(gasLimit);
        const nonce = this.web3.eth.getTransactionCount(creating_address);
        const nonceHex = this.web3.toHex(nonce);
    
        console.log("gl", gasLimit, "gp", gasPrice);
        // console.log("gp:", gasPrice, gasPriceHex, "n:", nonce, nonceHex);
    
    
        const rawTx = {
            nonce: nonceHex,
            gasPrice: gasPriceHex,
            gasLimit: gasLimitHex,
            data: contractData,
            from: creating_address
        };
    
        const tx = new Tx(rawTx);
        console.log("sadasdsad", tx.serialize().toString('hex'));
        tx.sign(priv);
        const serializedTx = tx.serialize();
        // console.log(serializedTx.toString('hex'))
        console.log("total cost", gasPrice*gasLimit);
        console.log("ini bal", this.web3.eth.getBalance(creating_address).toString())
    
        // gasLimit =web3.eth.estimateGas({
        //     data: '0x' + serializedTx.toString('hex'),
        //     // from: wallet.address,
        //     to: creating_address,
    
        // })
        // console.log(gasLimit)

        this.web3.eth.sendRawTransaction("0x" + serializedTx.toString('hex'), function(err, hash){
          if (err) { console.log(err); return; }
      
          // Log the tx, you can explore status manually with eth.getTransaction()
          console.log('contract creation tx: ' + hash);
      
          // Wait for the transaction to be mined
          this.test.waitForTransactionReceipt(hash);
        });
  }
  */

  contractcreate(solfile,creatingaddress,priv){
    let asolfile;
    //console.log(solfile+"\n"+creatingaddress+"\n"+priv);

    // this.readfilefromapp(solfile).then(
    //   (d)=>{
        // let res = JSON.parse(JSON.stringify(d));
        // let body = res._body;
        //console.log(body);//print contract file 
 
        //solc code
        //const a =solc;
        //let outputt = a.compile(body, 1);
        //console.log(outputt);

        var keys = [];
        let json_temp = []; 

        //put solc dat all in array
        var output = 
        {
          "contracts": {
            "contract.sol:SimpleStorage": {
              "abi": "[{\"constant\":false,\"inputs\":[{\"name\":\"x\",\"type\":\"uint256\"}],\"name\":\"set\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"lastAddress\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"fallback\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"x\",\"type\":\"uint256\"}],\"name\":\"Setting\",\"type\":\"event\"}]",
              "bin": "6060604052341561000f57600080fd5b6101f28061001e6000396000f3006060604052361561005f5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166360fe47b181146100ac5780636d4ce63c146100d457806370a08231146100e7578063cd68100c14610113575b73ffffffffffffffffffffffffffffffffffffffff331660008181526002602052604090208054340190556001805473ffffffffffffffffffffffffffffffffffffffff19169091179055005b34156100b757600080fd5b6100c260043561014f565b60405190815260200160405180910390f35b34156100df57600080fd5b6100c2610193565b34156100f257600080fd5b6100c273ffffffffffffffffffffffffffffffffffffffff60043516610198565b341561011e57600080fd5b6101266101aa565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6000600782046000557f1f699cf30a85165a1f161e64b4b428f54e60dd974a70166b0816674c70d4f17b8260405190815260200160405180910390a1505060005490565b600390565b60026020526000908152604090205481565b60015473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a7230582047f4608f5eec217414692703c5f6dccd1486dc9ad7c6dd7cbf9824240d1fbcad0029"
            }
          },
          "version": "0.4.17+commit.bdeb9e52.Linux.g++"
        };
        var array = output.contracts;  
        for (let key in array) {
          json_temp.push({
            bytecode: array[key].bin,
            interface: array[key].abi,
            gasEstimates: 230000//output.contracts[key].gasEstimates
          });
        }  
        console.log(json_temp[0].gasEstimates);//print gasestimate

        // Get contract data
        const bytecode = json_temp[0].bytecode;
        const abi = JSON.parse(json_temp[0].interface);//parsed jsonInterface to contract
        var contract = this.web3.eth.contract(abi);
        console.log("\n\njsonInterface(abi):", abi, "\n\n");

        //in contractData var
        const contractData = contract.new.getData({
          data: '0x' + bytecode
        });
        // let contractjson = JSON.parse(JSON.stringify(contract));
        // const contractData = contractjson.push({
        //     data: '0x' + bytecode
        // });
        console.log("contractData\n", contractData);

        // var gasLimit = this.web3.eth.estimateGas({
        //     to: creatingaddress,
        //     // data: '0x' + bytecode,
        //     data: contractData,
        //     // from: wallet.address,
    
        // });
        let gasLimit = 230000; 

        const gasPrice = this.web3.eth.gasPrice;//.getGasPrice();
        //console.log(gasPrice);
        let gasPriceHex = this.web3.toHex(gasPrice);
        //gasPriceHex = gasPriceHex.toString().substr(0,gasPriceHex.toString().length-18);
        console.log("gasPriceHex:"+gasPriceHex);
        const gasLimitHex = this.web3.toHex(gasLimit);
        console.log("gasLimitHex:"+gasLimitHex);
        const nonce = this.web3.eth.getTransactionCount(creatingaddress);
        let nonceHex = this.web3.toHex(nonce);
        //nonceHex = nonceHex.toString().substr(0,nonceHex.toString().length-18);
        console.log("nonceHex:"+nonceHex);

        
        const rawTx = {
          nonce: nonceHex,
          gasPrice: gasPriceHex,
          gasLimit: gasLimitHex,
          data: contractData,
          from: creatingaddress
        };

        const tx = new Tx(rawTx);
        console.log("rawTX:", tx.serialize().toString('hex'));
        
        console.log("PrivateKey:"+priv);
        priv = priv.toString();
        priv = priv.substr(2,priv.length);
        //console.log(Buffer.Buffer.isBuffer(priv));
        let privv = Buffer.Buffer.from(priv,'hex');
        //console.log(privv);
        tx.sign(privv);//private should be pass 0x
        
        const serializedTx = tx.serialize();
        // console.log(serializedTx.toString('hex'))
        console.log("total cost:", gasPrice*gasLimit);
        console.log("creatingaddress:\n"+creatingaddress);
        console.log("ini bal:", this.web3.eth.getBalance(creatingaddress).toString());//exceed block gas limit comes when eth bal is 0
     

        var funtocall = function(hash,ethOb,address,privatekey,publickey,sqOb){
          //console.log(ethOb);
          const receipt = ethOb.eth.getTransactionReceipt(hash);
          //console.log("receipt:"+receipt.contractAddress);
          // If no receipt, try again in 1s
          if (receipt == null) {
              setTimeout(funtocall(hash,ethOb,address,privatekey,publickey,sqOb), 10000);
          } else {
              // The transaction was mined, we can retrieve the contract address
              console.log('contract address: ' + receipt.contractAddress);
              let contractaddress = receipt.contractAddress;
              let contracttx = hash;
              sqOb.insertInAfterContractAddress(address,privatekey,publickey,contractaddress,contracttx)
              .then( 
                (d)=>{
                  console.log(d);
                },
                (e)=>{
                  console.log(e);
                }
              );             
          }
        };
        let ethO = this.web3;
        let sqOb = this.sq;
        this.web3.eth.sendRawTransaction("0x" + serializedTx.toString('hex'), function(err, hash){
          //console.log('contract creation tx1: ' + hash);
          if (err) { 
            console.log(err); return; 
          }     
          // Log the tx, you can explore status manually with eth.getTransaction()
          console.log('contract creation tx2: ' + hash);
          // Wait for the transaction to be mined
          //this.waitForTransactionReceipt(hash); 
          funtocall(hash,ethO,creatingaddress,priv,"",sqOb); 
        });
         
    //   },
    //   (e)=>{
    //     console.log(e);
    //   }
    // );

  }

  call12(hash){
      const receipt = this.web3.eth.getTransactionReceipt(hash);
      return receipt;
  }

  waitForTransactionReceipt(hash){
      // console.log('waiting for contract to be mined\n');
      const receipt = this.web3.eth.getTransactionReceipt(hash);
      console.log("receipt:"+receipt.contractAddress);
      // If no receipt, try again in 1s
      if (receipt == null) {
          //setTimeout(self.waitForTransactionReceipt(hash), 10000);
      } else {
          // The transaction was mined, we can retrieve the contract address
          console.log('contract address: ' + receipt.contractAddress);
          //testContract(receipt.contractAddress);
      }
  }
 
  readfilefromapp(solfile){//'read.txt'
    return new Promise((resolve,reject)=>{
      this.http.get('assets/files/'+solfile)
      .map(res => res)
      .subscribe(data => {
        resolve(data);
      });
    });
  }

  readfilefromapp2(solfile){//'read.txt'
    return this.http.get('assets/files/'+solfile).map(res=>{
       return res;
    });
  }
}
