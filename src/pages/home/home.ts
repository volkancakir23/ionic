import {Component, Input, Output} from '@angular/core';
import { NavController, App } from 'ionic-angular';
import {OkuYolcuServiceProvider} from "../../providers/other-services/okuYolcu-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  getData:string;
  public items:any;
  public headers:any;
  userPostData = {"user_id":"","token":""};

  @Output('firstName') firstName : string =localStorage.getItem('firstName');
  @Output('lastName') lastName : string = localStorage.getItem('lastName');

  public servisBoxSelect:"SABAH";
  messageList = [];
  messages: string[]=  [];

  constructor(public navCtrl: NavController, public app: App,
              private okuYolcuServiceProvider : OkuYolcuServiceProvider) {
    console.log("->>>",localStorage);
    //const data = JSON.parse(localStorage.getItem('userData'));
    //this.userDetails=data.userData;
    this.getOkuYolcu("SABAH");
  }

  getOkuYolcu(servisBoxSelected){
    this.okuYolcuServiceProvider.getOkuYolcu(servisBoxSelected).subscribe(data =>this.items=data,
      error => alert(error),
      () =>console.log("Finish"));
  }

  onUpdateToggle(item) {
    this.okuYolcuServiceProvider.putOkuYolcu(item);
  }

  abrirLocal(gender) {
    this.servisBoxSelect=gender;
    this.getOkuYolcu(gender);
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
