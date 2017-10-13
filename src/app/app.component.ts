import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Information } from '../pages/information/information';
import { TestPage } from '../pages/test/test';
import { SettingPage } from '../pages/setting/setting';
import { SharedlistsPage } from '../pages/sharedlists/sharedlists';
import  { ProfilePage } from '../pages/profile/profile';

import { Dbservice } from '../providers/dbservice/dbservice';
import { SqliteProvider } from '../providers/sqlite/sqlite';

@Component({
  templateUrl: 'app.html',
  providers:[Dbservice]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string,icon:any, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public dbserv:Dbservice,
    public sqlite:SqliteProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home',icon:'home', component: HomePage },
      //{ title: 'Shared Details',icon:'infinite', component: HomePage },
      { title: 'Shared Lists',icon:'information-circle', component: SharedlistsPage },
      { title: 'Profile',icon:'ios-person', component: ProfilePage },
      { title: 'Settings',icon:'ios-settings', component: SettingPage }
    ];


    var isin = localStorage.getItem("isInTestapp");
    if(!isin || isin == "" || isin == null || isin == "N"){
      this.rootPage = Information;
      this.menuCtrl.swipeEnable(false);
    }else{
      this.rootPage = HomePage;
      this.menuCtrl.swipeEnable(true);
    }

    //this.rootPage = TestPage;
    this.dbserv.dbInit();
  }

  ionViewDidLoad(){
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.sqlite.openDb();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
