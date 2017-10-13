import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  exit(){
    const alert = this.alertCtrl.create({
      title: 'Confirm exit!',
      message: 'Are you sure want to exit from app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sure',
          handler: () => {
            console.log('clicked');
            localStorage.setItem("isInTestapp","N");
            this.navCtrl.setRoot(MyApp);
          }
        }
      ]
    });
    alert.present();
  }
}
