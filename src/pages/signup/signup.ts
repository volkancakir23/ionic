import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from "../../providers/auth-service/auth-service";

import { TabsPage } from "../tabs/tabs";
import { LoginPage } from "../login/login";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  resposeData : any;
  userData= {"username":"","password":"","email":"","name":""};

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    //Api connections
    //this.navCtrl.push(TabsPage);
    this.authServiceProvider.postData(this.userData,"signup");
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

}
