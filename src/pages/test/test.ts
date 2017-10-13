import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Web3service }        from '../../providers/web3service/web3service';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import moment from 'moment';
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
  providers:[SqliteProvider,Web3service]
})
export class TestPage {

  web3data:any;
  showValues:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sq:SqliteProvider,
    public web3:Web3service
  ) {
    this.callw3();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  callw3(){
    this.web3data = this.web3.get();
    
    let res = this.web3.makeetherwalletandStoreinDb("Hi this is angularjs and ionic");
    //console.warn(res);

    // let a = this.sq.addItem("XYZ");
    // console.log(a);
    let created = moment().format("YYYY-MM-DD H:mm:ss");
    console.log(created);
  }

}
