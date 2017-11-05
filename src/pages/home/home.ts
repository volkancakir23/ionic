import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import {OkuYolcuServiceProvider} from "../../providers/other-services/okuYolcu-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  getData:string;
  public items:any;

  public dataDetails : any;
  userPostData = {"user_id":"","token":""};

  messageList = [];

  constructor(public navCtrl: NavController, public app: App,
              private okuYolcuServiceProvider : OkuYolcuServiceProvider) {
    console.log("->>>",localStorage);
    //const data = JSON.parse(localStorage.getItem('userData'));
    //this.userDetails=data.userData;
    this.getOkuYolcu();
  }

  getOkuYolcu(){
    this.okuYolcuServiceProvider.getOkuYolcu().subscribe(data =>this.items=data,
      error => alert(error),
      () =>console.log("Finish"));
    debugger;
  }

  logout() {
    localStorage.clear();
    setTimeout(()=>this.backToWelcome(),2000);
    //this.navCtrl.push(WelcomePage);
  }

  backToWelcome() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}
