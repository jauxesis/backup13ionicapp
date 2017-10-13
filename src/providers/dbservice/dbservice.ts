import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DbserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Dbservice {

  constructor(
    public http: Http,
    public sqlite:SQLite
  ) {
    console.log('Hello DbserviceProvider Provider');

  }

  dbInit(){ 
    console.log("donestart");
    this.sqlite.create({
      name:'auxesis.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      
      db.executeSql('CREATE TABLE IF NOT EXISTS dummy(id primary key autoincrement number(11),name varchar(50))',{})
      .then(()=>console.log('Table created'))
      .catch((e)=>console.log(e+' failed'));

      db.executeSql('INSERT INTO dummy values("ABCD")',{})
      .then(()=>console.log('Record inserted'))
      .catch((e)=>console.log(e+' record failed'));

    }).catch((e)=>console.log(e+' record failed in db'));
    console.log("done");
  }

}
