import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

//Import details page
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Properties
  todos: FirebaseListObservable<any>;
  //Constructor
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, af:AngularFire) {
    this.todos = af.database.list('/todos');
  }

  //Methods
  // addToDo(){
  //   this.navCtrl.push(DetailsPage);
  // }

  addToDo(todo){    
    this.navCtrl.push(DetailsPage, {
      
    });
  }

  editToDo($key, name, details, complete) {
    this.navCtrl.push(DetailsPage, {
      $key: $key,
      name: name,
      details: details,
      complete: complete
    });
  }

  updateComplete(id, complete){
    console.log('Update completion');
    if(complete == true){
      this.todos.update(id, {
        complete: false
      });
    }
    else{
      this.todos.update(id, {
        complete: true
      });
    }
    this.navCtrl.push(HomePage);
  }

}
