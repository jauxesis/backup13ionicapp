import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Information } from '../pages/information/information';
import { TestPage } from '../pages/test/test';
import { SettingPage } from '../pages/setting/setting';
import  { ShareddetailmodalPage } from '../pages/shareddetailmodal/shareddetailmodal';
import  { ViewaddressmodalPage } from '../pages/viewaddressmodal/viewaddressmodal';
import  { SharedlistsPage } from '../pages/sharedlists/sharedlists';
import  { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Web3service } from '../providers/web3service/web3service';
import { Dbservice } from '../providers/dbservice/dbservice';

import { SQLite } from '@ionic-native/sqlite';
import { SqliteProvider } from '../providers/sqlite/sqlite';

import solc from 'solc';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Information,
    TestPage,
    SettingPage,
    ShareddetailmodalPage,
    SharedlistsPage,
    ViewaddressmodalPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Information,
    TestPage,
    SettingPage,
    ShareddetailmodalPage,
    SharedlistsPage,
    ViewaddressmodalPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Web3service,
    Dbservice,
    SqliteProvider
  ]
})
export class AppModule {}
