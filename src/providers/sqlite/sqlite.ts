import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { NavController,Platform } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import moment from 'moment';
/*
  Generated class for the SqliteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var window : any;

@Injectable()
export class SqliteProvider {

  public text : string = "";
  public db = null;
  public arr = [];

  public database:SQLite;

  constructor(
    public sqlite:SQLite,
    public platform: Platform
  ) {
    console.log('Hello SqliteProvider Provider');
    this.db = window.openDatabase("todoauxesis.db","1.0","Demo",1);//{name: 'todoauxesis.db', location: 'default'}
  }

  openDb() {
    
    this.db.transaction((tx) => {
      //tx.executeSql('DROP TABLE storesecret'); 
        tx.executeSql('CREATE TABLE IF NOT EXISTS Todo (id integer primary key,todoItem text)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS info (id integer primary key autoincrement,name text,dlno text,securityno text,created text,updated text)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS storesecret (id integer primary key autoincrement,message text,address text,privatekey text,defaulgas text,provider text,secure text,publickey text,wallet text,created text,updated text)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS contractaddressfind (id integer primary key autoincrement,address text,privatekey text,publickey text,contractaddress text,contracttx text,created text,updated text)');
        //this.addItem("adf").then(d=>{console.warn(d)});
        //tx.executeSql("INSERT INTO Todo (todoItem) VALUES (?)",["ABCDEFGH"],(r)=>{console.warn(r)},(e)=>{console.error(e)});
      }, (e) => {
        console.log('Transtion Error', e);
      }, () => {
        console.log('Populated Datebase OK..');
      })

    
  }

  /**
   * 
   * @param addItem for adding: function
   */
  addItem(i) {
    return new Promise((resolve,reject) => {
      var InsertQuery = "INSERT INTO Todo (todoItem) VALUES (?)";
      
      this.db.transaction((tx) => {
         tx.executeSql(InsertQuery, [i], (r) => {
        //this.db.transaction(tx=>{ tx.executeSql(InsertQuery, [i], (r) => {
          //console.log('Inserted... Sucess..', i);
          // this
          //   .getRows()
          //   .then(s => {
          //     //resolve(true)
          //     //console.info(s);
          //   });
          resolve(true)
        }, e => {
          //console.log('Inserted Error', e);
         reject(false);
        });
      }, (e) => {
        reject(false)
      }, () => {
        console.log('status OK..');
        resolve(true)
      });
      // this.db.executeSql(InsertQuery, [i], (r) => {
      // //this.db.transaction(tx=>{ tx.executeSql(InsertQuery, [i], (r) => {
      //     console.log('Inserted... Sucess..', i);
      //     this
      //       .getRows()
      //       .then(s => {
      //         resolve(true)
      //       });
      //   }, e => {
      //     console.log('Inserted Error', e);
      //     resolve(false);
      //   })
      //})
    })
    
  }


  /**
   * 
   * Select Queries
   */
  refresh(){
    return new Promise((resolve,reject)=>{
      this.db.transaction(tx=>{
        let query = "SELECT * FROM Todo";
        //console.log(tx);
        tx.executeSql(query, [], (t,rs) => {
          //console.log(rs.rows);
          resolve(rs.rows);
        }, (e) => {
          //console.log('TrError', e);
          reject(e);
        });
      }, (e) => {
        //console.log('Transtion Error', e);
        reject(e);
      }, (data) => {
        console.log("transaction done!"+data);
      });
    });
  }
  getContractAddFind(){
    return new Promise((resolve,reject)=>{
      this.db.transaction(tx=>{
        let query = "SELECT * FROM contractaddressfind";
        tx.executeSql(query, [], (t,rs) => {
          console.log(rs.rows.length);
          if(rs.rows.length>0){
            resolve(rs.rows);
          }else{
            resolve({message:"No records",length:0});
          }
          
        }, (e) => {
          reject(e);
        });
      }, (e) => {
        reject(e);
      }, (data) => {
        console.log("transaction done!"+data);//if table is not always go to then err in ts view
      });
    });
  }

  getTodoListTable(){
    return new Promise((resolve,reject)=>{
      this.db.transaction(tx=>{
        tx.executeSql("INSERT INTO Todo (todoItem) VALUES (?)",["ABCDEFGHIJKLMNOP"],(r)=>{console.warn(r)},(e)=>{console.error(e)});
        let query = "SELECT * FROM Todo";
        tx.executeSql(query, [], (t,rs) => {
          console.log(rs.rows.length);
          if(rs.rows.length>0){
            resolve(rs.rows);
          }else{
            resolve({message:"No records",length:0});
          }
          
        }, (e) => {
          reject(e);
        });
      }, (e) => {
        reject(e);
      }, (data) => {
        console.log("transaction done!"+data);//if table is not always go to then err in ts view
      });
    });
  }
  
  getRows() {
    return new Promise((res,reject) => {

      this.db.transaction((tx) => {

      this.arr = [];
      let query = "SELECT * FROM Todo";
      tx.executeSql(query, [], (rs) => {
          //console.log(rs.rows);
          // if (rs.rows.length > 0) {
          //   for (var i = 0; i < rs.rows.length; i++) {
          //     var item = rs
          //       .rows
          //       .item(i);
          //     this
          //       .arr
          //       .push(item);
          //   }
          // }
          res(rs);
        }, (e) => {
          res(e);
        });
      }, (e) => {
        reject(false)
      }, (d) => {
       // console.log('status OK..');
        //console.log(d);
        res(d)
      });
      
    })

  }
  //to delete any Item
  del(id) {
    return new Promise(resolve => {
      var query = "DELETE FROM Todo WHERE id=?";
      this
        .db
        .executeSql(query, [id], (s) => {
          console.log('Delete Success...', s);
          this
            .getRows()
            .then(s => {
              resolve(true);
            });
        }, (err) => {
          console.log('Deleting Error', err);
        });
    })

  }
  //to Update any Item
  update(id, txt) {
    return new Promise(res => {
      var query = "UPDATE Todo SET todoItem=?  WHERE id=?";
      this
        .db
        .executeSql(query, [
          txt, id
        ], (s) => {
          console.log('Update Success...', s);
          this
            .getRows()
            .then(s => {
              res(true);
            });
        }, (err) => {
          console.log('Updating Error', err);
        });
    })

  }



  //main
  testaa(){
    return "adsf";
  }
  insertIninfo(name,dlno,securityno){
    //fields name text,dlno text,securityno text,created text,updated text
    let created = moment().format("YYYY-MM-DD H:mm:ss");
    
    return new Promise((resolve,reject) => {
      var InsertQuery = "INSERT INTO info (name,dlno,securityno,created,updated) VALUES (?,?,?,?,?)";
      this.db.transaction((tx) => {
        tx.executeSql(InsertQuery, [name,dlno,securityno,created,created], (r) => {
          resolve(true)
        }, e => {
         reject(false);
        });
      }, (e) => {
        reject(false)
      }, () => {
        console.log('status OK..');
        resolve(true)
      });
    });
  }
  insertInStoreSecret(message,address,privatekey,defaulgas,provider,secure){
      //fields (id integer primary key autoincrement,message text,address text,privatekey text,defaulgas text,provider text,secure text,publickey text,wallet text,created text,updated text)
      let created = moment().format("YYYY-MM-DD H:mm:ss");
      //console.log(message+"\n"+address+"\n"+privatekey+"\n"+defaulgas+"\n"+provider+"\n"+secure+"\n"+created);
      let a = message+"\n"+address+"\n"+privatekey+"\n"+defaulgas+"\n"+provider+"\n"+secure+"\n"+created;
      
      return new Promise((resolve,reject) => {
        var InsertQuery = "INSERT INTO storesecret (message,address,privatekey,defaulgas,provider,secure,created,updated) VALUES (?,?,?,?,?,?,?,?)";
        this.db.transaction((tx) => {
          tx.executeSql(InsertQuery, [message,address,privatekey,defaulgas,null,secure,created,created], (r) => {
            resolve(true)
          }, e => {
           reject(false);
          });
        }, (e) => {
          reject(false)
        }, () => {
          console.log('status OK..');
          resolve(true)
        });
      });
      // return new Promise((resolve,reject) => {
      //   var InsertQuery = "INSERT INTO storesecret (message,address,privatekey,defaulgas,provider,secure,created,updated) VALUES (?,?,?,?,?,?,?,?)";
      //   this.db
      //     .executeSql(InsertQuery, [message,address,privatekey,defaulgas,provider,secure,created,created], (r) => {
      //       console.log('Inserted... Sucess..');
      //       this
      //         .getRows()
      //         .then(s => {
      //           //return true;
      //           resolve()
      //           //console.log(s);
      //         });
      //     }, e => {
      //       console.log('Inserted Error', e);
      //       //return false;
      //       reject();
      //     })
      // });
  }

  insertInAfterContractAddress(address,privatekey,publickey,contractaddress,contracttx){
    //fields address text,privatekey text,publickey text,contractaddress text,contracttx text,created text,updated text
    let created = moment().format("YYYY-MM-DD H:mm:ss");
    
    return new Promise((resolve,reject) => {
      var InsertQuery = "INSERT INTO contractaddressfind (address,privatekey,publickey,contractaddress,contracttx,created,updated) VALUES (?,?,?,?,?,?,?)";
      this.db.transaction((tx) => {
        tx.executeSql(InsertQuery, [address,privatekey,publickey,contractaddress,contracttx,created,created], (r) => {
          resolve(true)
        }, e => {
         reject(false);
        });
      }, (e) => {
        reject(false)
      }, () => {
        console.log('status OK..');
        resolve(true)
      });
    });
  }
}
