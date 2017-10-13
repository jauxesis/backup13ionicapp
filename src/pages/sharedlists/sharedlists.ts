import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

import { SqliteProvider } from '../../providers/sqlite/sqlite';
/**
 * Generated class for the SharedlistsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sharedlists',
  templateUrl: 'sharedlists.html',
  providers:[SqliteProvider]
})
export class SharedlistsPage {

  prevshared:any=[];
  showprev:boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sq:SqliteProvider,
    public actionSheetCtrl:ActionSheetController
  ) {
    
  }

  ionViewDidLoad() {
    this.loadSharedList();
    console.log('ionViewDidLoad SharedlistsPage');
  }

  loadSharedList(){
    this.sq.getContractAddFind().then(
      (res)=>{
        
        var getData = JSON.parse(JSON.stringify(res));
        console.log(res);
        //console.log(res['length'])
        if(res['length'] > 0){
          for (var key in getData) {
            this.prevshared.push({
              rowkey:key,
              id:getData[key].id,
              address:getData[key].address,
              message:getData[key].message,
              privatekey:getData[key].privatekey,
              publickey:getData[key].publickey,
              contractaddress:getData[key].contractaddress,
              contracttx:getData[key].contracttx,
              created:getData[key].created,
              updated:getData[key].updated,
              cl:this.getRandomColr()
            });
          }
          this.showprev = true;
          console.log(this.prevshared);
        }else{
          this.showprev = false;
          console.warn("No data found");
        }
      },
      (err)=>{
        this.showprev = false;
        console.error(err);
      }
    );
  }

  options(d){
    //console.log(d);
    const actionSheet = this.actionSheetCtrl.create({
      title:"Pick your options",
      buttons:[
        // {
        //   text:'Not this time',
        //   role:'destructive'
        // },
        {
          text:'Invoke Contract',
          handler:()=>{
            console.info("invoking...");
          }
        },
        {
          text:'Save Transaction',
          handler:()=>{
            console.info("Save Transaction");
          }
        },
        {
          text:'Dismiss',
          role:'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getRandomColr(){
    let str = "0123456789ABCDEF";
    let ans = "#";
    for(let a = 0;a<6;a++){
      ans += str[Math.floor(Math.random()*16)]; 
    }
    return ans;
  }

}
