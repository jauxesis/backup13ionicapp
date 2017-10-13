import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
/**
 * Generated class for the ShareddetailmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shareddetailmodal',
  templateUrl: 'shareddetailmodal.html',
})
export class ShareddetailmodalPage {

  address:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.address = this.navParams.get("address");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareddetailmodalPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
