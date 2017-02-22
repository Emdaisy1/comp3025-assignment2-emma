// File: details.ts
// Author: Emma Hilborn - 200282755
// Description: The typescript file to handle the functionality for the to-do details page

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

//Import home page
import { HomePage } from '../home/home';

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

  /**
   *  Saves the to-do item, adding it as a new one if no $key, or updating existing if there's a $key
   *  @function saveToDo
   *  @param $key, name, details, complete
   */
  saveToDo($key, name, details, complete){
    //If missing name, don't save/update
    if(name == "") {
          return;
    }
    //If there's a key, the to-do exists - update it
    if($key){
      this.todos.update($key, {
        name: name,
        details: details,
        complete: complete
      });
    }
    //Else, it's a new to-do - create it
    else{
      this.todos.push({
            name: name,
            details: details,
            complete: false
      });
    }
    //Go back to home page
    this.navCtrl.push(HomePage);
  }

  /**
   *  Cancels adding/editing a to-do and returns to home page, with to-do list
   *  @function cancel
   */
  cancel(){
    this.navCtrl.push(HomePage);
  }

  /**
   *  If the to-do exists (editing, not adding), delete it, then go back to the home page
   *  @function delete
   *  @param $key
   */
  delete($key){
    if($key){
      this.todos.remove($key);
    }
    this.navCtrl.push(HomePage);
  }

}
