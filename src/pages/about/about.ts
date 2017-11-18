import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {OkuYolcuServiceProvider} from "../../providers/other-services/okuYolcu-service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public items:any;
  public plakas:any;
  public servisBoxSelect:"SABAH";

  constructor(public navCtrl: NavController, public app: App,
              private okuYolcuServiceProvider : OkuYolcuServiceProvider) {
    //this.getOkuYolcuPersonel(4752);
  }

  abrirLocal(gender) {
    this.servisBoxSelect=gender;
    //this.getOkuYolcuPersonel(gender);
    this.getSeferPlaka(gender);
  }

  seferSec(result) {
    this.getOkuYolcuPersonel(result);
  }

  getOkuYolcuPersonel(seferSelected){
    this.okuYolcuServiceProvider.getOkuYolcuPersonel(seferSelected).subscribe(data =>this.items=data,
      error => alert(error),
      () =>console.log("Finish"));
  }

  getSeferPlaka(servisBoxSelected){
    this.okuYolcuServiceProvider.getOkuSeferPlaka(servisBoxSelected).subscribe(data =>this.plakas=data,
      error => alert(error),
      () =>console.log("Finish"));
  }

  onUpdateToggle(item) {
    this.okuYolcuServiceProvider.putOkuYolcu(item);
  }

}
