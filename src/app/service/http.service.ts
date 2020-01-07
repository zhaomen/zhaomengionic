import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Banner } from './data-types/common.types';
import { Appconfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  IP;
  constructor(public http:HttpClient ) { 
    this.IP = Appconfig.webapi;
  }

  getrandom() : number{
    return Math.random();
  }

  geturlrandom() : string {
    return '&r=' + Math.random();
  }

  getbanner() : Observable<Banner[]>{
    return this.post("banner?",null)
    .pipe(map((res: {banners : Banner[]}) => res.banners))
  }

  get(api){
    return this.http.get(this.IP + api + this.geturlrandom())
  }

  post(api,data){
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      "Cache-Control":'no-cache',
      "Access-Control-Allow-Origin": "*"
    });
    const options = ({
      headers: header,
      withCredentials: true,
    });

    return this.http.post(this.IP + api + this.geturlrandom(), data , options)

  }


}
