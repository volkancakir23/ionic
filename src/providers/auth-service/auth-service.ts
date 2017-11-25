import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Response, Http, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'

let apiUrl = "http://127.0.0.1:8080/api/";
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  private baseUrl = 'http://127.0.0.1:8080/api/';

  constructor(public http: Http,
              public authHttp:AuthHttp) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type) :Observable<any> {
    let body = JSON.stringify(credentials);

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    const headerObj = {
      headers: new Headers(headerDict),
    };

    return this.http.post(apiUrl+type, body, headerObj).map(this.extractData).catch(this.handleError);
  }

  getSecuredData():any {
    let jwt = localStorage.getItem('id_token');
    let authHeader = new Headers();

    if (jwt) {
      authHeader.append('Authorization', jwt);
    }

    let options = new RequestOptions({headers: authHeader});

    return this.http.get('http://127.0.0.1:8080/api/restricted', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res:Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error:any) {
    let errMsg = (error.message) ? error.message :
      error.status ? '${error.status} - ${error.statusText}' : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
