import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Web3service }        from '../../providers/web3service/web3service';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import moment from 'moment';

import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import  { ViewaddressmodalPage } from '../viewaddressmodal/viewaddressmodal';
import { SharedlistsPage } from '../sharedlists/sharedlists';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[SqliteProvider,Web3service]
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public sq:SqliteProvider,
    public web3:Web3service,
    public alertCtrl:AlertController,
    public modalCtrl: ModalController
  ) {

    console.warn(this.web3.get());

    //to create contract for user address this.web3.contractcreate('contract.sol','0x65De584139871151d17Ec6A70619eBd6cD50E3e7','0xe7eef1e341f69c5120a89a4df3ba1c3f66360a4eeeb99c228ab80b460e75505a');//"Hello Console!"//4326456255760057600642401462415876547643681 secure
    //this.web3.contractcreate('contract.sol','0x65De584139871151d17Ec6A70619eBd6cD50E3e7','0xe7eef1e341f69c5120a89a4df3ba1c3f66360a4eeeb99c228ab80b460e75505a');//"Hello Console!"//4326456255760057600642401462415876547643681 secure
    
  }

  ionViewDidLoad(){
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

  myaddress(){
    const pModal = this.modalCtrl.create(ViewaddressmodalPage,{
      user:'u1',
      address:'ah'
    });
    pModal.present();
  }

  sharedetails(){
    this.alertCtrl.create({
      title:'Enter Address',
      inputs:[
        {
          name:'address',
          placeholder:'type address'
        },
      ],
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            console.log(data.address);
          }
        }
      ]
    }).present();
  }

  sharedlists(){
    this.navCtrl.push(SharedlistsPage,{
      user:'u11',
      address:'asdf'
    });
  }
}
