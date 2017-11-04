import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userDetails : any;

  constructor(public navCtrl: NavController, public app: App) {
    //const data = JSON.parse(localStorage.getItem('userData'));
    //this.userDetails=data.userData;
  }

  logout() {
    const root = this.app.getRootNav();
    root.popToRoot();
    //this.navCtrl.push(WelcomePage);
  }
}
