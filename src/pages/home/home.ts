import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[AngularFireDatabase]
})
export class HomePage {
  testitem:string;
  items=[];

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    private alertCtrl: AlertController) {

    db.list('/testitems/').subscribe(data=>{
      this.items=data;
      console.log(this.items);
    },err=>{
      console.log("Err:"+err);
    });

  }

  addItem(){
    this.db.list('/testitems/').push({
      itemname:this.testitem
    });
    this.testitem="";
  }

  removeItem(key){
    this.db.list('/testitems/').remove(key);
  }

  editItem(key,value){
    let alert = this.alertCtrl.create({
    title: 'Edit Item',
    inputs: [
      {
        name: 'editeditem',
        value: value
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
        }
      },
      {
        text: 'Update List',
        handler: data => {
          this.db.list('/testitems/').update(key,{itemname:data.editeditem});
        }
      }
    ]
  });
  alert.present();
  }

}
