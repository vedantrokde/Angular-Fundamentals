import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  storeServers(servers: any[]) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    // .set('Authorization', `Bearer ${token}`)

    // return this.http.post('https://ng-http-dummy-589d7-default-rtdb.asia-southeast1.firebasedatabase.app/data.json', servers, {headers: headers});
    return this.http.put('https://ng-http-dummy-589d7-default-rtdb.asia-southeast1.firebasedatabase.app/data.json', servers, {
      headers: headers,
      observe: 'body',
      // params: new HttpParams().set('id', id)
    });
  }

  getServers() {
    return this.http.get('https://ng-http-dummy-589d7-default-rtdb.asia-southeast1.firebasedatabase.app/data.json').pipe(catchError(
      (error) => {
        throw new Error('Something went wrong');
      }
    ));
  }

  getAppName() {
    return this.http.get('https://ng-http-dummy-589d7-default-rtdb.asia-southeast1.firebasedatabase.app/appName.json');
  }
}