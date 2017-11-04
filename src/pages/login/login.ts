import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {TabsPage} from "../tabs/tabs";
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  providers: [AuthServiceProvider],
  templateUrl: 'login.html'
})
export class LoginPage {

  resposeData : any;
  userData= {"username":"","password":"","rememberMe":"true"};

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider,
              public alertCtrl:AlertController,
              public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });

    loading.present();

    //this.authServiceProvider.postData(this.userData,"login");
    this.authServiceProvider.postData(this.userData,"login").subscribe(token => {
      loading.dismiss();

      // If the user credentials are valid, the current user is redirected to the home page.
      if (token && token != 'undefined' && token != 'No user found') {
        localStorage.setItem('id_token', token.id_token);
        //localStorage.setItem('user_login', user_login);
        //this.goToHomePage();
        //this.navCtrl.push(HomePage);
        this.navCtrl.push(TabsPage);
      } else {
        //this.alertConnexionError();
      }
    });


  }

  alertConnexionError() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Connection refused. Check your login/password.',
      buttons: ['OK']
    });
    alert.present();
  }
}
