import {Injectable} from "@angular/core";
import {Response, Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import {AuthServiceProvider} from "../auth-service/auth-service";

@Injectable()
export class OkuYolcuServiceProvider {

  constructor(private http: Http, private authServiceProvider:AuthServiceProvider) {
    console.log('Hello OkuYolcuServiceProvider Provider');

  }

  getOkuYolcu(){

    let jwt = localStorage.getItem('id_token');
    /*    let authHeader = new Headers();
        authHeader.append('Authorization', jwt);
        let options = new RequestOptions({headers: authHeader});
    */
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': 'Bearer ' + jwt,
    }

    const headerObj = {
      headers: new Headers(headerDict),
    };
    return this.http.get("http://localhost:8080/api/oku-yolcus",headerObj).map(res=>res.json());
  }

}
