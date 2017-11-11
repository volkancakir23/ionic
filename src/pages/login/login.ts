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
  userData= {"username":"admin","password":"admin","rememberMe":"true"};

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
    this.authServiceProvider.postData(this.userData,"authenticate").subscribe(resp => {
      loading.dismiss();

      // If the user credentials are valid, the current user is redirected to the home page.
      if (resp && resp != 'undefined' && resp != 'No user found') {
        localStorage.setItem('id_token', resp.token.id_token);
        localStorage.setItem('firstName', resp.user.firstName);
        localStorage.setItem('lastName', resp.user.lastName);
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
