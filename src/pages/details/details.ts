import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the Details page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  //Properties
  todos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, af:AngularFire) {
    this.todos = af.database.list('/todos');
  }

  // saveToDo(ngModel){
  //    this.todos.push({
  //           name: ngModel.name,
  //           details: ngModel.details
  //     });

    saveToDo(newToDo) {
      this.todos.push({
            name: newToDo.name,
            details: newToDo.details
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
