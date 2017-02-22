import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

//Import home page
import { HomePage } from '../home/home';

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
  $key: string;
  name: string;
  details: string;
  complete: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, af:AngularFire) {
    this.todos = af.database.list('/todos');
    this.$key = navParams.get('$key');
    this.name = navParams.get('name');
    this.details = navParams.get('details');
    this.complete = navParams.get('complete');
  }

    saveToDo($key, name, details, complete){
      if(name == "") {
            return;
      }
      if($key){
        this.todos.update($key, {
          name: name,
          details: details,
          complete: complete
        });
      }
      else{
        this.todos.push({
              name: name,
              details: details,
              complete: false
        });
      }
      this.navCtrl.push(HomePage);
    }

    cancel(){
      this.navCtrl.push(HomePage);
    }

    delete($key){
      if($key){
        this.todos.remove($key);
      }
      this.navCtrl.push(HomePage);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
