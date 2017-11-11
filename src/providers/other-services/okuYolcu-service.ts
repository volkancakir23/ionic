import {Injectable} from "@angular/core";
import {Response, Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import {AuthServiceProvider} from "../auth-service/auth-service";

@Injectable()
export class OkuYolcuServiceProvider {

  constructor(private http: Http, private authServiceProvider: AuthServiceProvider) {
    console.log('Hello OkuYolcuServiceProvider Provider');

  }

  headers: Headers;
  options: RequestOptions;

  getOkuYolcu(servisParam) {

    let jwt = localStorage.getItem('id_token');

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': 'Bearer ' + jwt,
    });
    const servis = {
      servis: servisParam
    }
    this.options = new RequestOptions({headers: this.headers, search: servis});

    return this.http.get("http://localhost:8080/api/findBySefer_TarihAndSefer_Servis", this.options)
      .map(this.extractData);

  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  putOkuYolcu(item) {
    let jwt = localStorage.getItem('id_token');
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': 'Bearer ' + jwt
    }

    const headerObj = {
      headers: new Headers(headerDict),
    };
    let data = JSON.stringify(item);
    this.http.put('http://localhost:8080/api/oku-yolcus', data, headerObj)
      .map(res => res.json())
      .subscribe(res => {
        //alert("success "+res);
      }, (err) => {
        alert("failed");
      });


  }

}
