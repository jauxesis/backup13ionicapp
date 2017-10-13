import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Web3service }        from '../../providers/web3service/web3service';
import _ from 'lodash';

import Web3 from 'web3';
import ethers from 'ethers';

import { SqliteProvider } from '../../providers/sqlite/sqlite';
import moment from 'moment';

/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
  providers:[SqliteProvider,Web3service]
})
export class Information {

  name:string="";
  securityno:number;
  dlno:number;

  web3data:any;
  showValues:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public alertCtrl:AlertController,
    public loadCtrl:LoadingController,
    public toastCtrl:ToastController,
    public sq:SqliteProvider,
    public web3:Web3service
  ) {
      this.menuCtrl.enable(false, 'myMenu');
      this.menuCtrl.swipeEnable(false, 'myMenu');
      this.menuCtrl.swipeEnable(false);

      //this.callw3();

      // this.sq.getRows()
      // .then((dt)=>{
      //   console.log(dt);
      // },(err)=>{
      //   console.log(err);
      // });
  }

  callw3(){
    this.web3data = this.web3.get();
    //console.info(this.web3data);

    let msha = this.web3.msha();
    //console.warn(msha);

    let wallet = this.web3.makeetherwallet("Hi this is angularjs and ionic");
    console.warn(wallet);

    let secure = this.web3.makesecure();
    console.warn(secure);

    this.showValues = [
      'version.network',
      'version.ethereum',
      'version.node',
      'version.whisper',
      'isConnected',
      'net.listening',
      'net.peerCount',
      'eth.syncing',
      'eth.coinbase',
      'eth.gasPrice',
    ];
  }

  getValue(v) {
    try {
      let ret = _.get(this.web3, v);
      if (_.isFunction(ret)) {
        ret = _.invoke(this.web3, v);
      }

      return ret;
    }
    catch (e) {
      return e;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationPage');
    this.menuCtrl.enable(false, 'myMenu');
    this.menuCtrl.swipeEnable(false, 'myMenu');
    this.menuCtrl.swipeEnable(false);

    // this.sq.getTodoListTable().then(
    //   (res)=>{
    //     res = JSON.stringify(res);
    //     alert(res);
    //   },
    //   (err)=>{
    //     alert("err:"+JSON.stringify(err));
    //   }
    // );
  }

  submit(){
    if(this.name == "" || this.name == null){
			this.toastCtrl.create({
        message:'Name is required',
        duration:2000,
        position:'top'
      }).present();
		}else if(this.securityno == undefined || this.securityno == null){
      this.toastCtrl.create({
				message:'Security number is required',
        duration:2000,
        position:'top'
      }).present();
		}else if((this.securityno).toString().length != 10){
			this.toastCtrl.create({
				message:'Security number should not less than or greater than 10 digits',
        duration:2000,
        position:'top'
      }).present();
		}else if(this.dlno == undefined || this.dlno == null){
			this.toastCtrl.create({
				message:'DL number is required',
        duration:2000,
        position:'top'
      }).present();
		}else if((this.dlno).toString().length != 10){
			this.toastCtrl.create({
				message:'DL number should not less than or greater than 10 digits',
        duration:2000,
        position:'top'
      }).present();
		}else {
      this.callapi();
		}
  }

  callapi(){
    const loading = this.loadCtrl.create({
      spinner: 'dots',
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
      this.donecall();
    }, 2500);
  }

  donecall(){
    this.sq.insertIninfo(this.name,this.dlno,this.securityno)
    .then((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    });
    this.navCtrl.setRoot(MyApp);
    localStorage.setItem("isInTestapp","Y");
  }
}
