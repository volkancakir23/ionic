import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from "../login/login";
import { SignupPage } from "../signup/signup";
import {TabsPage} from "../tabs/tabs";
import {HomePage} from "../home/home";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (localStorage.getItem('id_token')) {
      this.navCtrl.setRoot(HomePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  signup(){
    this.navCtrl.push(SignupPage, {}, {animate:false});
  }

}
