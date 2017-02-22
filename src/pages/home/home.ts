// File: home.ts
// Author: Emma Hilborn - 200282755
// Description: The typescript file to handle the functionality for the home page

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
  totalTodos: number = 0;

  //Constructor
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, af:AngularFire) {
    //Load todos
    this.todos = af.database.list('/todos');
    //Use snapshots of each todo to count them for a total
    this.todos.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.totalTodos += 1;
      });
    })
  }

  /**
   *  Send user to DetailsPage to add a todo, include empty name param for missing name warning
   *  @function addToDo
   */
  addToDo(){    
    this.navCtrl.push(DetailsPage, {
      name: ''
    });
  }

  /**
   *  Send user to DetailsPage to edit a todo, pass in todo variables
   *  @function editToDo
   *  @param $key, name, details, complete
   */
  editToDo($key, name, details, complete) {
    this.navCtrl.push(DetailsPage, {
      $key: $key,
      name: name,
      details: details,
      complete: complete
    });
  }

  /**
   *  Update whether the to-do is complete or not as it is checked/unchecked
   *  @function updateComplete
   *  @param $key, complete
   */
  updateComplete($key, complete){
    //If the to-do is currently marked as complete, set that to false
    if(complete == true){
      this.todos.update($key, {
        complete: false
      });
    }
    //Else, make it true (now complete)
    else{
      this.todos.update($key, {
        complete: true
      });
    }
    //Reload the view
    this.navCtrl.push(HomePage);
  }

}
